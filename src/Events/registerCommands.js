
const { Events } = require('discord.js');
const  {serverId} = require('../../config.json');
const fs = require('fs');
const path = require('path');
const getLocalCommands = require('../utils/getLocalCommands');
const getApplicationCommands = require('../utils/getApplicationCommands');
const areCommandsdiffrent = require('../utils/areCommandsdiffrent');
module.exports = {
    name: Events.ClientReady,
    once: false,
    async execute(client) {
	
try {
  	const localCommands = getLocalCommands()
  	const applicationCommands = await getApplicationCommands(client, serverId);

 
  	if (!applicationCommands) {
  		console.error('No application commands found.');
  		return;
  	} 
    localCommands.forEach(async command => {
        const {name, description, options} = command;
        const existingCommand = await applicationCommands.cache.find(cmd => cmd.name === name);
    
        if(existingCommand){
            if(localCommands.deleted){
                await applicationCommands.delete(existingCommand.id);
                console.log(`Deleted command: ${name}`);
                return;
            }
            if(areCommandsdiffrent(existingCommand, command)){
                await applicationCommands.edit(existingCommand.id, {
                    name,
                    description,
                    options
                });
                console.log(`Updated command: ${name}`);}
            }else{
                if(localCommands.deleted){
                    console.log(`Deleted command: ${name} skipping registering it`);
                    return;
            }
            await applicationCommands.create({name, description, options});
            console.log(`Registered command: ${name}`);

            }

        }

     );

} catch (error) {
   console.error('Error reading commands directory:', error); 
}
  
}
}

