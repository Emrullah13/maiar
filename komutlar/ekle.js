const Discord = require('discord.js');
const client = new Discord.Client();
const { stripIndents } = require('common-tags');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message) => {
  
  const db = require('quick.db');
  

  
  let args = message.content.split(' ').slice(1);
  const hata = args.slice(0).join(' ');
  

    var hataHook = new Discord.WebhookClient("756529787522252800", "CGAhYRswFazewVwSVjiDz1fh7pp-6WjbjhuasoH7kOjuPTK148LfYMFmFU9--1Ax2VOd")
          // https://discord.com/api/webhooks/756529787522252800/CGAhYRswFazewVwSVjiDz1fh7pp-6WjbjhuasoH7kOjuPTK148LfYMFmFU9--1Ax2VOd
    var embed = new Discord.RichEmbed()
    .setColor("0x36393F")
    .setTitle(`<a:alarm:714486253113966593> UPTİME LOG <a:alarm:714486253113966593>`)
    .addField(`<a:ok:712014850640838716> Kullanıcı`, message.author.tag)
    .addField(`<a:ok:712014850640838716> Eklenen Link`, hata)
    hataHook.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ekle'],
  permLevel: 0,
    kategori: "bot",

};

exports.help = {
  name: 'ekle',
  category: "iletisim",
  description: 'Bottaki bir hatayı bildirmenizi sağlar.',
  usage: 'hata-bildir <bulduğunuz hata>',
 
};
