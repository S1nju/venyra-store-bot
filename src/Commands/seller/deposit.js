const { EmbedBuilder, ApplicationCommandOptionType, MessageFlags, PermissionFlagsBits } = require("discord.js");
const getRow = require('../../utils/getRow');
const { permissionsRequired } = require("../moderation/ban");
module.exports={
    name:'deposit',
    description:'Set the deposit instructions for the server',
    options:[
        {
            name:"channel",
            description:"The channel to send the deposit instructions to",
            type: ApplicationCommandOptionType.Channel,
            required:true,
            channelTypes: [0] // 0 = GUILD_TEXT, restricts to text channels
        }
    
    ],
    permissionsRequired:[PermissionFlagsBits.Administrator],
    botPermission:[PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
    callBack: async (client, interaction) => {
      const depositpage0 = new EmbedBuilder()
        .setTitle('💵How to deposit to your card 💵')
        .setDescription('Follow these steps to deposit funds to your card:')
        .addFields({
            name:'**1. Choose a Payment Method**',
            value:'Select your preferred payment method from the options available.'
        },
        {
            name:"**2. Create a ticket**",
            value:'To create a ticket, please click on the button below'

        },{name:"**3.wait for the support to give you all deposit details**",
            value:'Please wait for the support team to provide you with all the necessary deposit details.'

        })
        const depositpage1 = new EmbedBuilder()
        .setTitle('💵How to deposit to your card 💵')
        .setDescription('اتبع هذه الخطوات لإيداع الأموال في بطاقتك:')
        .setFields({
            name:'**1. اختر طريقة الدفع**',
            value:'حدد طريقة الدفع المفضلة لديك من الخيارات المتاحة.'
        },
        {
            name:"**2. إنشاء تذكرة**",
            value:'لإنشاء تذكرة، يرجى النقر على الزر أدناه'
        },{name:"**3. انتظر حتى يقدم لك الدعم جميع تفاصيل الإيداع**",
            value:'يرجى الانتظار حتى يقدم لك فريق الدعم جميع تفاصيل الإيداع اللازمة.'

        })

       embeds = [depositpage0, depositpage1];
       await getRow(interaction, embeds,interaction.options.getChannel('channel'),'depositarabic', 'depositenglish');

    }
}