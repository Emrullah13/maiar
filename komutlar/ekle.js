const Discord = require('discord.js')
const client = new Discord.Client();
exports.run = async (bot, message, args) => {

  let user = client.users.get(args.slice(0).join(' '));
  let nesne = args[0]
   if (!nesne) return message.reply('Show link nerede?')
  

 message.client.channels.get('712068971922456696').send(` ${message.author} adlı kişi <a:biciku:714486266347126898> ${nesne} linki ile uptime etti`)
if (message.client.users.get('713678882011742230').send(` ${message.author} adlı kişi <a:alarm:714486253113966593> \`${nesne}\` linki ile uptime etti`))
if (message.client.users.get('640250146453454848').send(` ${message.author} adlı kişi<a:alarm:714486253113966593> \`${nesne}\` linki ile uptime etti `)){
 
} else return
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ekle'],
    kategori: 'yapımcı',
  permLevel: 0
};
exports.help = {
  name: 'ekle',
  description: 'Gold üye ekler',
  usage: 'gold-üye-ekle'
};
