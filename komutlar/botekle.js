const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')
var PREFİX = ayarlar.prefix
exports.run = async (client, message, args) => {
  message.delete(2500);
  const botid = args[0];
  if (!botid)
    return message
      .reply(
        (`Lütfen eksik kısımları doldurun.\n**Doğru Kullanım**; \`\`${PREFİX}botekle <bot-id> <bot-prefix>\`\``)
      )
      .then(msg => msg.delete(2500));
  const prefix = args.slice(1).join(" ");
  if (!prefix)
    return message
      .reply(
        (`Lütfen eksik kısımları doldurun.\n**Doğru Kullanım**; \`\`${PREFİX}botekle <bot-id> <bot-prefix>\`\``)
      )
      .then(msg => msg.delete(2500));
  let kanal = await db.fetch(`hgK_${message.guild.id}`); 
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`Botun başarıyla başvuruya alındı.Yapman gereken sabırla onaylanmasını/reddedilmesini beklemek.`);
     message.author.send(embed);
  const embed3 = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${message.author}, botun başvuruya eklendi.`);
     message.channel.send(embed3)
    .then(msg => msg.delete(2500));
  const embed2 = new Discord.RichEmbed()
  .setColor("BLUE")
  .setDescription(
    `:white_circle: | ${message.author} adlı kullanıcı prefixi **\`${prefix}\`** olan <@${botid}> adlı botu ile başvuru yaptı!`);
  client.channels.get(kanal).send(embed2); // Kanal ID
  let yetkilikanal = await db.fetch(`hgK2_${message.guild.id}`); 
  if (!yetkilikanal) return;
  const yetkili = new Discord.RichEmbed()
  .setColor("BLUE")
  .setTitle("Başvuru")
  .setDescription(`**Bot Sahibi**:\n${message.author}\n**Bot ID**:\n${botid}\n**Bot Prefix**:\n${prefix}\n**Davet Linkleri**:\n[Perm 0](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0) | [Perm 8](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8)`)
  client.channels.get(yetkilikanal).send(yetkili);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["botekle"],
  PermLevel: 0
};



exports.help = {
  name: "botekle",
  description: "Bot ekleme başvurusu",
  usage: "bot"
};
