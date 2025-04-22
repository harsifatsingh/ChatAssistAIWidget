// client/widget.js
;(function(window, document) {
    const API_URL = window.CHATASSIST_API_URL;
    const CSS_URL = window.CHATASSIST_CSS_URL;
  
    // Insert CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_URL;
    document.head.appendChild(link);
  
    // Build widget
    const root = document.createElement('div');
    root.id = 'chatassist-widget';
    root.innerHTML = `
      <button class="chat-toggle" aria-expanded="false" aria-label="Open chat">
        💬 Chat
      </button>
      <div class="chat-window hidden" role="dialog" aria-modal="true" aria-label="Customer support chat">
        <div class="messages" role="log" aria-live="polite"></div>
        <form class="input-form" aria-label="Send a message">
          <input type="text" aria-label="Type your question" required />
          <button type="submit" aria-label="Send message">➤</button>
        </form>
      </div>
    `;
    document.body.appendChild(root);
  
    const toggle = root.querySelector('.chat-toggle');
    const windowEl = root.querySelector('.chat-window');
    const messagesEl = root.querySelector('.messages');
    const form = root.querySelector('form');
    const input = form.querySelector('input');
  
    // Toggle
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      windowEl.classList.toggle('hidden');
      sendAnalytics('widget_toggled');
      if (!expanded) input.focus();
    });
  
    // Handle submit & streaming
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const text = input.value.trim(); if (!text) return;
      appendMessage('user', text);
      input.value = '';
      sendAnalytics('message_submitted');
  
      try {
        const res = await fetch(API_URL, {
          method: 'POST', headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ question: text, stream: true })
        });
        const reader = res.body.getReader();
        const decoder = new TextDecoder(); let buffer = '';
        appendMessage('bot', ''); // placeholder
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n');
          buffer = parts.pop();
          for (const chunk of parts) {
            if (!chunk) continue;
            const data = JSON.parse(chunk);
            updateLastBot(data.choices[0].delta.content);
          }
        }
        sendAnalytics('message_received');
      } catch (err) {
        appendMessage('bot', '⚠️ Error loading answer');
        console.error(err);
        sendAnalytics('error');
      }
    });
  
    function appendMessage(role, text) {
      const el = document.createElement('div');
      el.className = `message ${role}`;
      el.textContent = text;
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  
    function updateLastBot(text) {
      const msgs = messagesEl.querySelectorAll('.message.bot');
      const last = msgs[msgs.length - 1];
      last.textContent += text;
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  
    // Analytics via Web Worker
    const worker = new Worker(window.CHATASSIST_CSS_URL.replace('widget.css','analyticsWorker.js'));
    function sendAnalytics(action) {
      worker.postMessage({ action, ts: Date.now() });
    }
  
  })(window, document);