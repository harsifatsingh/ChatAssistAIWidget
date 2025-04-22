# ChatAssist AI Widget

> An embeddable, production‑ready chat widget powered by OpenAI GPT‑4, offering streaming responses, offline support, advanced analytics, and enterprise‑grade security.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)

## 🚀 Features

- **🔄 Streaming Responses:** Incremental rendering of GPT‑4 tokens for instant feedback
- **🕒 Lazy Loading:** Defers initialization until user interaction to minimize page load impact
- **📊 Analytics Batching:** Offloads event tracking to a Web Worker for zero UI jank
- **📡 Offline Support:** Service Worker caches assets and recent conversations
- **♿ Accessibility:** ARIA‑compliant roles, keyboard navigation, and screen‑reader support
- **🔒 Security‑First:** OWASP‑hardened backend with rate limiting, input sanitization, and secure headers
- **📦 Containerized:** Multi‑stage Dockerfile for consistent deployments
- **🤖 CI/CD Ready:** GitHub Actions pipeline for linting, testing, and building on every push

## 📋 Table of Contents

- [Installation & Setup](#%EF%B8%8F-installation--setup)
- [Configuration](#%EF%B8%8F-configuration)
- [Development](#-development)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)

## 🛠️ Installation & Setup

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUserName/ChatAssistAIWidget.git
   cd ChatAssistAIWidget
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and set your OpenAI API key
   ```

3. **Install dependencies & build**
   ```bash
   npm ci
   npm run build
   ```

4. **Run the server**
   ```bash
   npm start
   ```

5. **Embed on your website**  
   Add the following snippet before the closing `</body>` tag:

   ```html
   <script>
     window.CHATASSIST_API_URL = 'https://your-domain.com/api/chat';
     window.CHATASSIST_CSS_URL = 'https://your-domain.com/client/widget.css';
   </script>
   <script>
     document.addEventListener('DOMContentLoaded', () => {
       const s = document.createElement('script');
       s.src = 'https://your-domain.com/client/widget.js';
       document.head.appendChild(s);
     });
   </script>
   ```

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- OpenAI API key

## ⚙️ Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `CHATASSIST_API_URL` | URL of the chat endpoint | `https://.../api/chat` |
| `CHATASSIST_CSS_URL` | URL of the widget CSS file | `https://.../client/widget.css` |
| `OPENAI_API_KEY` (server) | OpenAI API key for GPT‑4 access | *Required* |
| `NODE_ENV` | Node environment (`development/production`) | `production` |
| `PORT` | Server port | `3000` |
| `RATE_LIMIT_REQUESTS` | Number of requests allowed per window | `60` |
| `RATE_LIMIT_WINDOW_MS` | Rate limiting window in milliseconds | `60000` |
| `LOG_LEVEL` | Logging verbosity | `info` |

### Advanced Configuration

Create a `config.json` file in the project root to override default widget settings:

```json
{
  "theme": "light",
  "position": "bottom-right",
  "initialMessage": "How can I help you today?",
  "headerText": "Chat Support",
  "placeholder": "Type your message...",
  "apiRetries": 3
}
```

## 🔧 Development

### Local Development Server

```bash
npm run dev   # Starts development server with hot-reloading
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix auto-fixable issues
npm run format       # Format code with Prettier
```

### Testing

```bash
npm test             # Run all tests
npm run test:unit    # Run unit tests only
npm run test:e2e     # Run end-to-end tests
npm run test:coverage # Generate test coverage report
```

### Build for Production

```bash
npm run build        # Build optimized assets
npm run analyze      # Analyze bundle size
```

## 📚 API Reference

### Client API

```javascript
// Initialize with custom options
ChatAssistWidget.init({
  apiUrl: 'https://your-api.com/chat',
  theme: 'dark',
  position: 'bottom-left',
  initialMessages: ['How can I help?'],
  persistHistory: true
});

// Control programmatically
ChatAssistWidget.open();
ChatAssistWidget.close();
ChatAssistWidget.toggle();
ChatAssistWidget.sendMessage('Hello!');

// Event listeners
ChatAssistWidget.on('message', (msg) => console.log('New message:', msg));
ChatAssistWidget.on('open', () => console.log('Widget opened'));
```

### Server API

#### `POST /api/chat`

Send a message to the AI assistant.

**Request Body:**
```json
{
  "message": "What is ChatAssist?",
  "conversationId": "optional-conversation-id",
  "metadata": {
    "userId": "anonymous-123",
    "page": "/products"
  }
}
```

**Response:**
```json
{
  "id": "msg_123456",
  "text": "ChatAssist is a chat widget that...",
  "conversationId": "conv_789012",
  "timestamp": "2025-04-22T14:35:07Z"
}
```

## 📦 Deployment

### Docker

```bash
# Build the image
docker build -t chatassist-widget .

# Run the container
docker run -d -p 3000:3000 --env-file .env chatassist-widget
```

### Docker Compose

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f
```

### CI/CD

The repository includes GitHub Actions workflows:

- `.github/workflows/ci.yml`: Runs on every push and PR
- `.github/workflows/deploy.yml`: Deploys to production on releases

### Cloud Deployment

One-click deploy buttons:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fharsifatsingh%2FChatAssistAIWidget)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/harsifatsingh/ChatAssistAIWidget)

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔍 Troubleshooting

### Common Issues

- **Widget not loading**: Verify that the API URL is correct and accessible
- **API errors**: Check the browser console and server logs for detailed error messages
- **Missing styles**: Ensure the CSS URL is properly set and accessible

### Debugging

Enable debug mode to see detailed logs:

```html
<script>
  window.CHATASSIST_DEBUG = true;
</script>
```

---

Made with ❤️ by Harsifat Singh
