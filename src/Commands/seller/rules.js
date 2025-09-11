const { EmbedBuilder, ApplicationCommandOptionType, MessageFlags, PermissionFlagsBits } = require("discord.js");
const getRow = require('../../utils/getRow');
module.exports={
    name:'rules',
    description:'Set the rules for the server',
    options:[
        {
            name:"channel",
            description:"The channel to send the rules to",
            type: ApplicationCommandOptionType.Channel,
            required:true,
            channelTypes: [0] // 0 = GUILD_TEXT, restricts to text channels
        }
    
    ],
    permissionsRequired:[PermissionFlagsBits.Administrator],
    botPermission:[PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
    callBack: async (client, interaction) => {
        let embeds = []
        const english = new EmbedBuilder()
        .setTitle('🛡️ Venyra Store Rules 🛡️')
        .setDescription('Follow these to keep the dungeon safe and the market fair!')
        .setImage('https://cdn.discordapp.com/attachments/1403761927003439104/1415712556885999646/BANNER_1.gif?ex=68c43490&is=68c2e310&hm=dbf06dc4eb0290bd1ef2a590d060e109203fbc51ebf21fbbbb7028bd051c6936&')
        .addFields({
            name:'**1. Be Kind, Not a Troll**',
            value:'Treat others with respect. No trolling or harassment will be tolerated.'
        },
        {
            name:"**2. Keep It Clean**",
            value:'No inappropriate content. Let\'s keep the dungeon family-friendly!'

        },{name:"**3. Stay in Your Lane**",
            value:'Keep discussions relevant to the channel topic. Off-topic conversations should be taken to DMs.'

        },
        {
            name:"**4. No Spamming**",
            value:'Avoid spamming messages, emojis, or reactions. Keep the chat clean and enjoyable for everyone.'
        },
        {
            name:"**5. Respect the Mods (Dungeon Warden)**",
            value:'Listen to the moderators. They are here to help maintain order and fairness in the kingdom.'
        },
        {
            name:"**6. No Sneaky Links**",
            value:'No sharing of malicious links or content. Keep the dungeon safe from harm.'
        },
        {
            name:"**7. No Alts or Fake Accounts**",
            value:'Do not create alternate accounts to bypass rules or restrictions. One account per person.'
        },
        {
            name:"**8. Follow Discord’s Rules**",
            value:'Adhere to Discord’s Terms of Service and Community Guidelines. We follow the rules of the land!'
        }
    )
        const arabic = new EmbedBuilder()
        .setTitle('🛡️ قواعد ستور فينيرا 🛡️')
        .setDescription('اتبع هذه القواعد للحفاظ على سلامة الزنزانة وإنصاف السوق!')
        .setImage('https://cdn.discordapp.com/attachments/1403761927003439104/1415712556885999646/BANNER_1.gif?ex=68c43490&is=68c2e310&hm=dbf06dc4eb0290bd1ef2a590d060e109203fbc51ebf21fbbbb7028bd051c6936&')
        .setFields({
            name:'**1. كن لطيفًا، لا تكن مزعجًا**',
            value:'عامل الآخرين باحترام. لن يتم التسامح مع أي ترويج أو مضايقة.'
        },
        {
            name:"**2. حافظ على نظافة المحادثة**",
            value:'لا محتوى غير لائق. دعونا نبقي الزنزانة مناسبة للعائلة!'
        },{name:"**3. ابق في مجالك**",
            value:'احتفظ بالمناقشات ذات الصلة بموضوع القناة. يجب أخذ المحادثات خارج الموضوع إلى الرسائل الخاصة.'
        },
        {
            name:"**4. لا للرسائل المزعجة**",
            value:'تجنب إرسال رسائل مزعجة أو رموز تعبيرية أو ردود فعل. حافظ على نظافة الدردشة ومتعتها للجميع.'
        },
        {
            name:"**5. احترم المشرفين (حارس الزنزانة)**",
            value:'استمع إلى المشرفين. هم هنا للمساعدة في الحفاظ على النظام والعدالة في المملكة.'
        },
        {
            name:"**6. لا للروابط الخبيثة**",
            value:'لا تشارك روابط أو محتوى ضار. حافظ على سلامة الزنزانة من الأذى.'
        },
        {
            name:"**7. لا للحسابات البديلة أو المزيفة**",
            value:'لا تنشئ حسابات بديلة لتجاوز القواعد أو القيود. حساب واحد لكل شخص.'
        },
        {
            name:"**8. اتبع قواعد ديسكورد**",
            value:'التزم بشروط خدمة ديسكورد وإرشادات المجتمع. نحن نتبع قواعد الأرض!'
        })
       embeds = [arabic, english];
       await getRow(interaction, embeds,interaction.options.getChannel('channel'),'عربي', 'english');

    }
}