// server/server.js
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet    = require('helmet');
const { Configuration, OpenAIApi } = require('openai');
const sanitizeHtml = require('sanitize-html');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiter
app.use('/api/chat', rateLimit({ windowMs:60000, max:30 }));

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post('/api/chat', async (req, res) => {
  const raw = req.body.question || '';
  const question = sanitizeHtml(raw, { allowedTags: [], allowedAttributes: {} });
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      stream: true,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question }
      ]
    }, { responseType: 'stream' });

    res.setHeader('Content-Type','text/event-stream');
    response.data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI error' });
  }
});

app.post('/api/analytics', (req, res) => {
  // TODO: store or forward analytics
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));