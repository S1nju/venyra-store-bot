const {Clientm,Interaction, PermissionFlagsBits, ApplicationCommandOptionType, MessageFlags } = require("discord.js");

module.exports = {
    name: 'unban',
    description: 'Unban a user from the server',
   // devOnly:Boolean,
   // testOnly:Boolean
      options:[
       {
           name: 'target',
           description: 'The user to unban',
           type: ApplicationCommandOptionType.User,
           required: true
       }
      ],
    permissionsRequired:[PermissionFlagsBits.BanMembers],
    botPermission:[PermissionFlagsBits.BanMembers],
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
          if (user) {
              return interaction.followUp({ content: 'User is not banned in this server.', flags: MessageFlags.Ephemeral });
          }
            if( targetUser.id === interaction.user.id) {
                return interaction.followUp({ content: 'You cannot unban yourself.😂', flags: MessageFlags.Ephemeral });
            }
        const bannedUsers = await interaction.guild.bans.fetch();

    if (bannedUsers.has(targetUser.id)) {
    await interaction.guild.members.unban(targetUser.id);
    await interaction.followUp(`**Unbanned**: <@${targetUser.id}> `);
    } else {
      await interaction.followUp({ content: 'this user is not banned', flags: MessageFlags.Ephemeral });
    }
    
      }
};