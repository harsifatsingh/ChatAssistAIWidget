(function(window, document) {
    // Configuration
    const CHATASSIST_API = window.CHATASSIST_API_URL || 'https://your-domain.com/api/chat';
    const WIDGET_ID = 'chatassist-widget';
  
    // Create chat container
    const container = document.createElement('div');
    container.id = WIDGET_ID;
    container.innerHTML = `
      <div class="chat-bar">Chat with us!</div>
      <div class="chat-window hidden">
        <div class="messages"></div>
        <form class="input-form">
          <input type="text" placeholder="Ask me anything..." required />
          <button type="submit">Send</button>
        </form>
      </div>
    `;
    document.body.appendChild(container);
  
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = window.CHATASSIST_CSS_URL || 'https://your-domain.com/client/widget.css';
    document.head.appendChild(link);
  
    // Toggle chat window
    const bar = container.querySelector('.chat-bar');
    const windowEl = container.querySelector('.chat-window');
    bar.addEventListener('click', () => {
      windowEl.classList.toggle('hidden');
      sendAnalytics('widget_toggle');
    });
  
    // Handle form submission
    const form = container.querySelector('.input-form');
    const input = form.querySelector('input');
    const messages = container.querySelector('.messages');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      appendMessage('user', question);
      input.value = '';
      sendAnalytics('question_submitted');
  
      try {
        const res = await fetch(CHATASSIST_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        });
        const data = await res.json();
        appendMessage('bot', data.answer);
        sendAnalytics('answer_received');
      } catch (err) {
        appendMessage('bot', 'Sorry, something went wrong.');
        console.error(err);
        sendAnalytics('error_occurred');
      }
    });
  
    function appendMessage(role, text) {
      const msgEl = document.createElement('div');
      msgEl.className = `message ${role}`;
      msgEl.textContent = text;
      messages.appendChild(msgEl);
      messages.scrollTop = messages.scrollHeight;
    }
  
    // Analytics integration (Google Analytics + custom events)
    function sendAnalytics(event) {
      if (window.ga) window.ga('send', 'event', 'ChatAssist', event);
      if (window.dataLayer) window.dataLayer.push({ event: 'ChatAssist', action: event });
    }
  
    // A/B test fallback: basic static response if API unreachable
    setTimeout(() => {
      if (!window.fetch) {
        appendMessage('bot', 'AI chat is currently unavailable.');
        sendAnalytics('fallback_triggered');
      }
    }, 3000);
  
  })(window, document);