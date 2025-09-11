
const { ActivityType,EmbedBuilder } = require("discord.js");
const path = require('path');
const fs = require('fs');
module.exports=(client)=>{

const eventsPath = path.join(__dirname,'..','Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
console.log(`Found ${eventFiles.length} event files.`);
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
    console.log(`Loading event: ${event.name}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
            console.log(`Event ${event.name} loaded successfully.`);
	} else {
            if(event.name ==='guildMemberAdd'|| event.name ==='guildMemberRemove'){
                  client.on(event.name, (client,interaction) => {

                     event.execute(client,interaction);               

                  });
            }else{
            if(event.name ==='interactionCreate'){
      client.on(event.name, (interaction) => {
        event.execute(client,interaction)
      });
      
            console.log(`Event ${event.name} loaded successfully.`);
     
    }else{
		client.on(event.name, (...args) => event.execute(...args));
            console.log(`Event ${event.name} loaded successfully.`);}


	}}
}





}