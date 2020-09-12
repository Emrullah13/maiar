const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('**Log kanalını ayarlamak için `Yönetici` İznine sahip olmalısın!')
return message.channel.send(embed)
} 
db.get(`hgK_${message.guild.id}`)
  db.delete(`hgK_${message.guild.id}`);

const embed = new Discord.RichEmbed()
.setColor('GREEN')
.setDescription(`**Log kanalı silindi!**`)   
message.channel.send(embed)                                                                                                                                      
}; // Astarius Code Share
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['logkanalkapat','logkapat'],
permLevel: 0
};
exports.help = {
name: 'log-kanal-kapat',
description: 'Hoşgeldin kanalını ayarlamaya yarar.',
usage: 'giriş-kanal #kanal'
};