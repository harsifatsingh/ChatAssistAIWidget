// client/analyticsWorker.js
let events = [];
self.addEventListener('message', ({ data }) => {
  events.push(data);
  if (events.length >= 5) {
    fetch(window.CHATASSIST_API_URL.replace('/chat','/analytics'), {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(events)
    });
    events = [];
  }
});