const {Clientm,Interaction, PermissionFlagsBits, ApplicationCommandOptionType, MessageFlags } = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
   // devOnly:Boolean,
   // testOnly:Boolean
      options:[
       {
           name: 'target',
           description: 'The user to kick',
           type: ApplicationCommandOptionType.User,
           required: true
       },
       {
           name: 'reason',
           description: 'The reason for the kick',
           type: ApplicationCommandOptionType.String,
           required: true
           
       }
      ],
    permissionsRequired:[PermissionFlagsBits.KickMembers],
    botPermission:[PermissionFlagsBits.KickMembers],
     /**
      * 
      * @param {Client} client 
      * @param {Interaction} interaction 
      */
     callBack:async (client,interaction)=>{
          const targetUser = interaction.options.getUser('target');
          const reason = interaction.options.getString('reason');
          await interaction.deferReply();
          const user = await interaction.guild.members.fetch(targetUser.id).catch(err => {
              console.error(err);
              return null;
          });
          if (!user) {
              return interaction.followUp({ content: 'User not found in this server.', flags: MessageFlags.Ephemeral });
          }
          if( user.id === interaction.user.id) {
              return interaction.followUp({ content: 'You cannot kick yourself.😂', flags: MessageFlags.Ephemeral });
          }
          if( user.id === interaction.guild.ownerId) {
              return interaction.followUp({ content: 'You cannot kick the server owner.😂', flags: MessageFlags.Ephemeral });
          }
          if( user.id === client.user.id) {
              return interaction.followUp({ content: 'You cannot kick the bot.😂', flags: MessageFlags.Ephemeral });
          }
          const targetuserRolePosition = user.roles.highest.position;
          const botRolePosition = interaction.guild.members.me.roles.highest.position;
          if (botRolePosition <= targetuserRolePosition) {
              return interaction.followUp({ content: 'I cannot kick a user with a higher or equal role than me.', flags: MessageFlags.Ephemeral });
          }
          if (targetuserRolePosition >= interaction.member.roles.highest.position) {
              return interaction.followUp({ content: 'You cannot kick a user with a higher or equal role.', flags: MessageFlags.Ephemeral });
          }
          interaction.guild.members.kick(user.id, { reason })
              .then(async () => {
                  await interaction.followUp(`**Kicked**: <@${user.id}> for **reason: ${reason}**`);
              })
              .catch(async err => {
                  console.error(err);
                  await interaction.followUp({ content: 'An error occurred while trying to kick the user.', flags: MessageFlags.Ephemeral });
              });
      }
};