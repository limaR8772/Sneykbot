
const express = require('express');
const app = express();
app.use(express.json());

const TOKEN = '8604672862:AAEkDdMFaaK3i7lLo9sfM7_WhP4dsFNwvSo';
const CHAT_ID = '26721408';

app.post('/webhook', async (req, res) => {
  try {
    const data = req.body;
    const msg = `📊 Янги Сигнал!\n🪙 ${data.ticker || data.pair}\n${data.type === 'BUY' ? '📈 BUY' : '📉 SELL'}\n💰 Нарх: ${data.price}\n✅ TP: ${data.tp}\n❌ SL: ${data.sl}`;
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({chat_id: CHAT_ID, text: msg})
    });
    res.json({ok: true});
  } catch(e) {
    res.json({ok: false});
  }
});

app.get('/', (req, res) => res.send('Bot ishlayapti!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on port ' + PORT));
