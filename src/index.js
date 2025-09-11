
const {Client, IntentsBitField} = require('discord.js');
require('dotenv').config();
const eventHandler = require('./Handlers/eventHandler');
const app = require('express')();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageReactions,
  ]
});
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Bot is running');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
eventHandler(client);
client.login(process.env.BOT_TOKEN)



