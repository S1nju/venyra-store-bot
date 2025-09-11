const {ActionRowBuilder,ButtonBuilder, ComponentType, MessageFlags, time}=  require('discord.js');

module.exports =async (interaction,pages,channel,customIdArabic, customIdEnglish)=>{

    try {
        if(!interaction) throw new Error('Interaction is required');
        if(!pages) throw new Error('Pages are required');
        await interaction.deferReply();
        if(pages.length === 0) throw new Error('No pages to display');
        const ar = new ButtonBuilder()
            .setCustomId(customIdArabic)
            .setStyle('Secondary')
            .setEmoji('🇸🇦')
            .setLabel('عربي')

         const en = new ButtonBuilder()
            .setCustomId(customIdEnglish)
            .setStyle('Secondary')
            .setEmoji('🇺🇸')
            .setLabel('English')
           const buttton = new ActionRowBuilder()
            .addComponents(ar,en) 
        let index = 0;
          
        await channel.send({
            embeds:[pages[index]],
            components:[buttton],
            flags: MessageFlags.Ephemeral ,
            fetchReply:true
        });
    } catch (error) {
        console.error('Error in pagination:', error);   }


   return null;
}