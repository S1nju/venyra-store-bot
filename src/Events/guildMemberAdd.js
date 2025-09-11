const chalk = require('chalk');

const { Client,Events,EmbedBuilder } = require('discord.js');
module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
      /**
      * 
      * @param {Client} client 
      * @param {Interaction} interaction 
      */
   async execute(client) {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const welcomeChannel = await client.guild.channels.fetch(welcomeChannelId);

    if (!welcomeChannel) {
        console.error(`Welcome channel not found: ${welcomeChannelId}`);
        return;
    }

    console.log(chalk.green(`New member joined: ${client.user.discriminator} (${client.user.id})`));
    const welcomeEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Welcome to the Venyra Store!')
        .setImage('https://cdn.discordapp.com/attachments/1403761927003439104/1415708673308758139/WELCOME_1.gif?ex=68c430f2&is=68c2df72&hm=6dd31458f5795af20d3d08f7efc6017dd2f6091f1e11a9b028cd9c1323cfd571&')
        .setDescription(`Hello! **${client.user.username}** , welcome to the Venyra Store!`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor('#00FFFF')
        .setTimestamp();

    await welcomeChannel.send({ embeds: [welcomeEmbed] });
    },
};