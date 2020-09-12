const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('**Yetkili Log kanalını ayarlamak için `Yönetici` İznine sahip olmalısın!')
return message.channel.send(embed)
} 
db.get(`hgK2_${message.guild.id}`)
  db.delete(`hgK2_${message.guild.id}`);

const embed = new Discord.RichEmbed()
.setColor('GREEN')
.setDescription(`**Yetkili Log kanalı silindi!**`)   
message.channel.send(embed)                                                                                                                                      
}; // Astarius Code Share
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['yetkililogkanalkapat','yetkili-kapat'],
permLevel: 0
};
exports.help = {
name: 'yetkili-log-kapat',
description: 'Hoşgeldin kanalını ayarlamaya yarar.',
usage: 'giriş-kanal #kanal'
};