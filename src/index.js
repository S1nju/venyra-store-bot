const {Client, IntentsBitField,Partials, PermissionFlagsBits} = require('discord.js');
require('dotenv').config();
const eventHandler = require('./Handlers/eventHandler');
const  AntiSpam  = require('discord-anti-spam');
const app = require('express')();
const client = new Client({disableEveryone: false,
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
  partials: [Partials.Channel],
});
    const antiSpam = new AntiSpam({
          warnBuffer: 3, // Maximum messages allowed before a warning
    interval: 1000, // Time in ms for interval checks
    warnMessage: "https://cdn.discordapp.com/attachments/1010276591303139530/1406377460785872936/barkak.png?ex=68a23e93&is=68a0ed13&hm=4449c138283830295fa544736f83d009551f84384381f0192cf9e89a738bd40c&",
    maxDuplicatesWarning: 5, // Max duplicate messages before warning
    mute: false, // Enable muting
    // Ensure kickMessage, banMessage, maxBuffer, maxDuplicatesBan are not defined
    // or set to values that prevent kicking/banning if you want to completely disable them.
    // For example, to prevent kicking/banning based on message buffer:
    maxBuffer: Infinity, // Prevents kicking/banning based on message count
    maxDuplicatesBan: Infinity, 
    muteThreshold: 999999,
   ignoredPermissions: [PermissionFlagsBits.Administrator],

});
eventHandler(client);
client.on('messageCreate', (message) => {
   antiSpam.message(message);
});
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Bot is running');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

client.login(process.env.BOT_TOKEN)
