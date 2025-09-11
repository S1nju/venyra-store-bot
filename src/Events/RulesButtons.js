const chalk = require('chalk');

const { Client,Events,EmbedBuilder, MessageFlags } = require('discord.js');
module.exports = {
    name: Events.InteractionCreate,
    once: false,
      /**
      * 
      * @param {Client} client 
      * @param {Interaction} interaction 
      */
   async execute(client, interaction) {
     let index = 0;
    if (!interaction.isButton()) return;
     const english = new EmbedBuilder()
        .setTitle('🛡️ Venyra Store Rules 🛡️')
        .setDescription('Follow these to keep the dungeon safe and the market fair!')
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


     const depositpage1 = new EmbedBuilder()
        .setTitle('💵 How to deposit to your card 💵')
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
        const depositpage0 = new EmbedBuilder()
        .setTitle('💵 How to deposit to your card 💵')
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
       
         
          const pages = [arabic,english,depositpage0,depositpage1];
          await interaction.deferUpdate();
            if(interaction.customId === 'عربي') {
                index = 0;
       

            } else if(interaction.customId === 'english') {
                index = 1;

            }
            if(interaction.customId === 'depositarabic') {
                index = 2;
       

            } else if(interaction.customId === 'depositenglish') {
                index = 3;

            }

            await interaction.followUp({
                embeds:[pages[index]],
                flags: MessageFlags.Ephemeral ,
            });
   }

};