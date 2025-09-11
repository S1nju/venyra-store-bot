const { Events, MessageFlags } = require('discord.js');
const {devs,serverId} = require('../../config.json');
const getLocalCommands = require('../utils/getLocalCommands');
const { execute } = require('./Log');
module.exports = {

	name: Events.InteractionCreate,
	once: false,
	async execute(client,interaction){

	if(!interaction.isChatInputCommand()) return;
	if(!interaction.guild) return interaction.reply({content: 'This command can only be used in a server.', flags: MessageFlags.Ephemeral});
	const localCommands =getLocalCommands();
	try {
		const commandobj = localCommands.find(cmd => cmd.name === interaction.commandName);
		if(!commandobj) return interaction.reply({content: 'This command does not exist.', flags: MessageFlags.Ephemeral});
		if(commandobj.devOnly && !devs.includes(interaction.member.id)) {
			return interaction.reply({content: 'This command is only available to developers.', flags: MessageFlags.Ephemeral});
		}
		if(commandobj.permissionsRequired && !interaction.member.permissions.has(commandobj.permissionsRequired)) {
			return interaction.reply({content: 'You do not have permission to use this command.', flags: MessageFlags.Ephemeral});
		}
		if(commandobj.botPermission && !interaction.guild.members.me.permissions.has(commandobj.botPermission)) {
			return interaction.reply({content: 'I do not have permission to use this command.', flags: MessageFlags.Ephemeral});
		}
		// Execute the command	
		await commandobj.callBack(client, interaction);
	} catch (error) {
		console.error('Error reading commands directory:', error);
		return interaction.reply({content: 'An error occurred while processing the command.', flags: MessageFlags.Ephemeral});
		
	}
	
}

	
}