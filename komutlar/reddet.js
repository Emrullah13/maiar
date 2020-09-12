const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('**Bot reddet etmek için `Yönetici` İznine sahip olmalısın!')
return message.channel.send(embed)
}
  message.delete(5000);
  const sahip = args[0];
  if (!sahip)
    return message
      .reply(`Bir kullanıcı idsi girmelisin.`)
      .then(msg => msg.delete(5000));
const sebep = args.slice(1).join(" ");
  if (!sebep)
    return message
      .reply(`Bir sebep belirtmelisin.`)
      .then(msg => msg.delete(5000));
  let kanal = await db.fetch(`hgK_${message.guild.id}`); 
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(`<@${sahip}> kullanıcının botu başarıyla reddedildi!`);
  message.channel.send(embed).then(msg => msg.delete(5000));
  const embed3 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`Botunuz ${sebep} sebebinden reddedildi!`)
  const embed2 = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(
    `:red_circle: | ${message.author} adlı yetkili tarafından <@${sahip}> adlı kullanıcının botu \`${sebep}\` sebebinden dolayı reddedldi!`
  );
  client.channels.get(kanal).send(embed2); // Kanal ID
  let yetkilikanal = await db.fetch(`hgK2_${message.guild.id}`); 
  if (!yetkilikanal) return;
  const yetkili = new Discord.RichEmbed()
  .setColor("RED")
  .setTitle("Reddedildi")
  .setDescription(`**Yetkili**\n${message.author}\n**Bot Sahibi**\n<@${sahip}>\n**Sebep**\n${sebep}`)
  client.channels.get(yetkilikanal).send(yetkili);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["red"],
  PermLevel: 0
};

 

exports.help = {
  name: "reddet",
  description: "Bot ekleme başvurusu",
  usage: "bot"
};
