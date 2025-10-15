import 'dotenv/config';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import cron from 'node-cron';
import express from 'express'

const app = express()
const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const AFFIRM_TIME = process.env.AFFIRM_TIME || '08:00';
const TZ = process.env.TZ || 'Asia/Jakarta';

const AFFIRMATIONS = [
  "Aku cukup dan aku berharga 🌿",
  "Hari ini aku memilih bahagia ☀️",
  "Aku punya kekuatan untuk berkembang 🌱",
  "Aku pantas untuk dicintai ❤️",
  "Aku percaya pada proses hidupku 🌊",
  "Aku mampu melewati segala tantangan 💪",
  "Setiap hari aku menjadi lebih kuat ✨",
  "Aku mencintai diriku apa adanya 💖",
  "Aku fokus pada hal-hal baik dalam hidupku 🌼",
  "Aku pantas untuk sukses 🌟",
  "Hidupku penuh dengan kesempatan baru 🚀",
  "Aku bersyukur atas setiap langkah kecil 🙏",
  "Aku berani mencoba hal-hal baru 🌱",
  "Aku tidak harus sempurna untuk dicintai 💛",
  "Aku mengendalikan reaksiku terhadap segala hal ⚡",
  "Aku berkembang setiap hari, sekecil apa pun langkahku 🌿",
  "Aku memberi ruang bagi diriku untuk tumbuh 🌸",
  "Aku layak mendapatkan kebahagiaan 😊",
  "Aku mengizinkan diriku istirahat saat perlu 🌙",
  "Aku berharga tanpa harus membuktikan apa pun 💎",
  "Aku percaya masa depan akan cerah 🌤️",
  "Aku punya hak untuk bahagia 🌻",
  "Aku menerima diriku dengan penuh kasih 💕",
  "Aku tidak sendirian dalam perjalanan ini 🤝",
  "Aku mampu mencapai mimpiku satu langkah demi satu 🛤️",
  "Aku pantas didengar dan dihargai 🫶",
  "Aku bersinar dengan caraku sendiri 🌟",
  "Aku lebih dari cukup 💫",
  "Aku selalu punya kesempatan untuk mulai lagi 🌱",
  "Aku bersyukur atas diriku hari ini 🌈"
];

function randomAffirmation() {
  const i = Math.floor(Math.random() * AFFIRMATIONS.length);
  return AFFIRMATIONS[i];
}

function timeToCron(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${m} ${h} * * *`;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async () => {
  console.log(`🤖 Login sebagai ${client.user.tag}`);
  const cronExpr = timeToCron(AFFIRM_TIME);

  cron.schedule(cronExpr, async () => {
    const channel = await client.channels.fetch(CHANNEL_ID);
    const msg = randomAffirmation();
    await channel.send(`🌸 **Affirmasi Harian:**\n> ${msg}`);
    console.log(`✅ Affirmasi terkirim: ${msg}`);
  }, { timezone: TZ });

  client.user.setPresence({ activities: [{ name: `affirmasi jam ${AFFIRM_TIME}` }], status: 'online' });
});

client.login(TOKEN);
