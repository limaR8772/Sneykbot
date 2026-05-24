const express = require('express');
const app = express();
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post('/webhook', async (req, res) => {
  try {
    const data = req.body;
    const message = `📊 Янги Сигнал!\n\n${JSON.stringify(data, null, 2)}`;
    console.log('Webhook келди:', JSON.stringify(data));
    console.log('TOKEN:', TOKEN ? 'бор' : 'йўқ');
    console.log('CHAT_ID:', CHAT_ID);

    const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });
    const result = await r.json();
    console.log('Telegram жавоби:', JSON.stringify(result));
    res.json({ ok: true });
  } catch (e) {
    console.error('Хато:', e.message);
    res.json({ ok: false });
  }
});

app.get('/', (req, res) => res.send('Bot ishlayapti!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер ${PORT}-портда ишга тушди`));
