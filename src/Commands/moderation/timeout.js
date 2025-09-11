const { ApplicationCommandOptionType, PermissionFlagsBits, MessageFlags } = require("discord.js");
const { callBack } = require("./ban");

module.exports={
    name: 'timeout',
    description: 'Timeout a user in the server',
    options:[
        {
            name: 'target',
            description: 'The user to timeout',
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name: 'duration',
            description: 'Duration of the timeout in seconds',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the timeout',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    permissionsRequired:[PermissionFlagsBits.MuteMembers],
    botPermission:[PermissionFlagsBits.MuteMembers],
    callBack: async (client, interaction) => {
        const targetUser = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        await interaction.deferReply();

        const member = await interaction.guild.members.fetch(targetUser.id).catch(err => {
            console.error(err);
            return null;
        });

        if (!member) {
            return interaction.followUp({ content: 'User is not a member of this server.', flags: MessageFlags.Ephemeral });
        }
        if (member.id === interaction.user.id) {
            return interaction.followUp({ content: 'You cannot timeout yourself.😂', flags: MessageFlags.Ephemeral });
        }
        if (member.id === interaction.guild.ownerId) {
            return interaction.followUp({ content: 'You cannot timeout the server owner.😂', flags: MessageFlags.Ephemeral });
        }
        if (member.user.bot) {
            return interaction.followUp({ content: 'You cannot timeout a bot.😂', flags: MessageFlags.Ephemeral });
        }
        const targetuserRolePosition = member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;
        if (botRolePosition <= targetuserRolePosition) {
            return interaction.followUp({ content: 'I cannot timeout a user with a higher or equal role than me.', flags: MessageFlags.Ephemeral });
        }
        if (targetuserRolePosition >= interaction.member.roles.highest.position) {
            return interaction.followUp({ content: 'You cannot timeout a user with a higher or equal role.', flags: MessageFlags.Ephemeral });
        }

        await member.timeout(duration * 1000, reason).catch(err => {
            console.error(err);
            return interaction.followUp({ content: 'An error occurred while trying to timeout the user.', flags: MessageFlags.Ephemeral });
        });

        await interaction.followUp(`**Timed out**: <@${targetUser.id}> for **${duration} seconds** with reason: **${reason}**`);
    }
}