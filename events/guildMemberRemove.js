const Discord = require('discord.js');
const client = new Discord.Client();
client.on("guildMemberAdd", member => {
  member.send("Sunucumuzdan Ayrıldıgını gördüm :( Umarım ilerde tekrardan gelirsin!")  
})