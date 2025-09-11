require('dotenv').config(); // Load environment variables first

const { REST, Routes,ApplicationCommandOptionType } = require('discord.js');



const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        const channels = await rest.get(
            Routes.guildChannels(process.env.GUILD_ID)
        );

        const commands = [
    {
        name: 'embed',
        description: 'Send an embed message',
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
                choices: channels
            },
             {
                name: 'inline',
                type: ApplicationCommandOptionType.Boolean,
                description: 'Whether the field should be inline',
                default: false,
                required: false,
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
          
        ]
    }
];
   
    console.log('channels', channels.length);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
