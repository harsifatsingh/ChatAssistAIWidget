# ChatAssist AI Widget

An embeddable JavaScript widget providing on-page AI chat via GPT-4.

## Installation
1. Clone this repo.
2. In `/server`, fill in your API key.
3. `npm install && npm start`
4. Host `/client` folder on your site and include:
   ```html
   <script>
     window.CHATASSIST_API_URL = 'https://your-domain.com/api/chat';
     window.CHATASSIST_CSS_URL = 'https://your-domain.com/client/widget.css';
   </script>
   <script src="https://your-domain.com/client/widget.js"></script>
   ```

## Analytics & A/B Testing
- Uses Google Analytics `ga('send')` and `dataLayer.push` for events.
- Customize event hooks in `widget.js` for prompt or UI experiments.