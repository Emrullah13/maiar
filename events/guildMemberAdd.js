const Discord = require('discord.js');
const client = new Discord.Client();
client.on("guildMemberAdd", member => {
  member.send("Sunucumuza Hoşgeldin Dostum iyi günler geçirmeni dileriz!")  
})
