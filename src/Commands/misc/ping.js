module.exports = {
    name: 'ping',
    description: 'Ping!',
   // devOnly:Boolean,
   // testOnly:Boolean
   //options:[]
   //deleted:Boolean
   callBack:async (client,interaction)=>{
       await interaction.deferReply();
       const reply = await interaction.fetchReply();
       const ping = reply.createdTimestamp - interaction.createdTimestamp;
       await interaction.followUp({content:`pong! client  ${ping}ms, bot ${client.ws.ping}ms`, ephemeral:true});
    }
 
};