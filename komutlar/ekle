const db = require('quick.db')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client();
exports.run = async (bot, message, args) => {

  let user = client.users.get(args.slice(0).join(' '));
  let nesne = args[0]
 message.client.channels.get('756451282390351883').send(`<a:biciku:714486266347126898> ${message.author} ${nesne} linki buluta kaydedildi`)
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
