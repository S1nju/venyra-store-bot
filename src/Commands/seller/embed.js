const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { permissionsRequired } = require("../moderation/ban");

module.exports = {
    name: 'embed',
    description: 'Create an embed message',
   // devOnly:Boolean,
// testOnly:Boolean
options: [
     {
          name: 'title',
          type: ApplicationCommandOptionType.String,
          description: 'The title of the embed',
          required: true,
     },
     {
          name: 'description',
          type: ApplicationCommandOptionType.String,
          description: 'The description of the embed',
          required: true,
     },
     {
          name: 'channel',
          type: ApplicationCommandOptionType.Channel,
          description: 'The channel to send the embed to',
          required: true,
          channelTypes: [0], // 0 = GUILD_TEXT, restricts to text channels
     },
     {
          name: 'image',
          type: ApplicationCommandOptionType.String,
          description: 'The image URL for the embed',
          required: false,
     },
     {
          name: 'thumbnail',
          type: ApplicationCommandOptionType.String,
          description: 'The thumbnail URL for the embed',
          required: false,
     },
     {
          name: 'footer',
          type: ApplicationCommandOptionType.String,
          description: 'The footer text for the embed',
          required: false,
     },
],

callBack: async (client, interaction) => {
         const embed = new EmbedBuilder()
            .setTitle(interaction.options.getString('title'))
            .setDescription(interaction.options.getString('description'))
            .setImage(interaction.options.getString('image'))
            .setThumbnail(interaction.options.getString('thumbnail'))
            .setFooter({ text: interaction.options.getString('footer') })

        const channel = interaction.options.getChannel('channel');
        channel.send({ embeds: [embed] });
        interaction.reply(`Embed sent successfully! to ${channel}`);
    }
    
 
};