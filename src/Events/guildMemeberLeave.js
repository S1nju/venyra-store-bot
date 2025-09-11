const chalk = require('chalk');

const { Client,Events,EmbedBuilder } = require('discord.js');
module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
      /**
      * 
      * @param {Client} client 
      * @param {Interaction} interaction 
      */
   async execute(client) {
    const leaveChannelId = process.env.LEAVE_CHANNEL_ID;
    const leaveChannel = await client.guild.channels.fetch(leaveChannelId);

    if (!leaveChannel) {
        console.error(`Leave channel not found: ${leaveChannelId}`);
        return;
    }

    console.log(chalk.green(`New member left: ${client.user.discriminator} (${client.user.id})`));
    const leaveEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Goodbye from the server!')
        .setDescription(`Goodbye! **${client.user.username}**, we hope to see you again!`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

    await leaveChannel.send({ embeds: [leaveEmbed] });
    },
};