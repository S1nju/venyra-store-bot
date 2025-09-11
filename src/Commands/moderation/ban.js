const {Client,Interaction,ApplicationCommandOptionType,PermissionFlagsBits, MessageFlags} = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
   // devOnly:Boolean,
   // testOnly:Boolean
   options:[
    {
        name: 'target',
        description: 'The user to ban',
        type: ApplicationCommandOptionType.Mentionable,
        required: true
    },
    {
        name: 'reason',
        description: 'The reason for the ban',
        type: ApplicationCommandOptionType.String,
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
        if (!user) {
            return interaction.followUp({ content: 'User not found in this server.', flags: MessageFlags.Ephemeral });
        }
        if( user.id === interaction.user.id) {
            return interaction.followUp({ content: 'You cannot ban yourself.😂', flags: MessageFlags.Ephemeral });
        }
        if( user.id === interaction.guild.ownerId) {
            return interaction.followUp({ content: 'You cannot ban the server owner.😂', flags: MessageFlags.Ephemeral });
        }
        if( user.id === client.user.id) {
            return interaction.followUp({ content: 'You cannot ban the bot.😂', flags: MessageFlags.Ephemeral });
        }
        const targetuserRolePosition = user.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;
        if (botRolePosition <= targetuserRolePosition) {
            return interaction.followUp({ content: 'I cannot ban a user with a higher or equal role than me.', flags: MessageFlags.Ephemeral });
        }
        if (targetuserRolePosition >= interaction.member.roles.highest.position) {
            return interaction.followUp({ content: 'You cannot ban a user with a higher or equal role.', flags: MessageFlags.Ephemeral });
        }
        interaction.guild.members.ban(user.id, { reason })
            .then(async () => {
                await interaction.followUp(`**Banned**: <@${user.id}> for **reason: ${reason}**`);
            })
            .catch(async err => {
                console.error(err);
                await interaction.followUp({ content: 'An error occurred while trying to ban the user.', flags: MessageFlags.Ephemeral });
            });
    }
 
};