const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Bot Hostlandı! | youtube.com/linlords");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 2800000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//--------------------------------- KOMUTLAR---------------------------------\\

///// EKLENDIM ATILDIM
client.on("guildCreate", guild => {
  let add = client.channels.get("KANAL Id");
  const eklendim = new Discord.RichEmbed()

    .setTitle(`Sunucuya Eklendim`)
    .setTimestamp()
    .setColor("GREEN")
    .setThumbnail(guild.iconURL)
    .addField(`Sunucu İsmi`, guild.name)
    .addField(`Sunucu ID`, guild.id)
    .addField(`Kurucu`, guild.owner.user.tag)
    .addField(`Kurucu ID`, guild.owner.user.id)
    .addField(`Üye Sayısı`, guild.memberCount);

  add.send(eklendim);
});
client.on("userUpdate", async (old, nev) => {

  if (old.avatarURL != nev.avatarURL) {
    let av = nev.avatarURL
    if(av.includes('png')){
      let asd = await Jimp.read(nev.avatarURL)
    await asd.resize(200, 200).write('./resimler/a.png')
   client.channels.get("756624363117346926").send(new Discord.Attachment('./resimler/a.png'));
    }
if(av.includes('jpg')){
let asd = await Jimp.read(nev.avatarURL) 
await asd.resize(200, 200).write('./resimler/aj.jpg')
 client.channels.get("756624363117346926").send(new Discord.Attachment('./resimler/aj.jpg'));
}
if(av.includes('gif')){
      let asd = await Jimp.read(nev.avatarURL)
    await asd.resize(200, 200).write('./resimler/an.gif')
   client.channels.get("756624275015729183").send(new Discord.Attachment('./resimler/an.gif'));
    }
    
  }
});
client.on("guildDelete", guild => {
  let remove = client.channels.get("KANAL ID");
  const atildim = new Discord.RichEmbed()

    .setTitle(`Sunucudan Atıldım`)
    .setTimestamp()
    .setColor("RED")
    .setThumbnail(guild.iconURL)
    .addField(`Sunucu İsmi`, guild.name)
    .addField(`Sunucu ID`, guild.id)
    .addField(`Kurucu`, guild.owner.user.tag)
    .addField(`Kurucu ID`, guild.owner.user.id)
    .addField(`Üye Sayısı`, guild.memberCount);

  remove.send(atildim);
});
/// BOT ATILIRSA DATABASE SILME
client.on('guildDelete', async(guild, message) => {
await db.delete(`hgK_${message.guild.id}`)
await db.delete(`hgK2_${message.guild.id}`)
await db.delete(`mLog_${message.guild.id}`)
await db.delete(`bmLog_${message.guild.id}`)
await db.delete(`gc_${message.guild.id}`)
await db.delete(`boost_${message.guild.id}`)
await db.delete(`bottest_${message.guild.id}`)
await db.delete(`psl_${message.guild.id}`)
await db.delete(`ps_${message.guild.id}`)
await db.delete(`pst_${message.guild.id}`)
})

 //youtube.com/linlords
//teşekkürler AloneDesign

//linlordscode.com

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Pong! Requests sent")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == ".uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("zaten var")
    message.channel.send("eklendi");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("Hata: " + e)
  })
  }
})

client.on("message", async message => {

  if(!message.content.startsWith(".eval")) return;
  if(!["623932457401450496","677980604272476171"].includes(message.author.id)) return;
  var args = message.content.split(".eval")[1]
  if(!args) return message.channel.send(":warning: | Kod?")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

client.on('message', message => {
let prefix = '!'
let datarol = '756829500926328882'
if (message.content === prefix+'js') {
message.member.addRole(datarol)
message.channel.send(`${message.author} <a:tik1:714486236697329764> Başarıyla **js** rolünü aldınız.`)
  }
});
var kanal = "756624363117346926"  // RESİMLERİN ATILACAĞI KANAL

client.on("userUpdate", async(oldUser, newUser) => {

    newUser.guild.client.channels.get(kanal).send({file: newUser.avatarURL}).then(a => {

    })

})

client.on("guildUpdate", async(oldGuild, newGuild) => {

    if (oldGuild.iconURL === newGuild.iconURL) return;

    newGuild.client.channels.get(kanal).send({file: newGuild.iconURL}).then(a => {

    })

})

client.on("guildMemberAdd", async(member) => {

    member.guild.client.channels.get(kanal).send({file: member.user.avatarURL}).then(a => {

    })

})

client.on("guildMemberRemove", async(member) => {

    member.guild.client.channels.get(kanal).send({file: member.user.avatarURL}).then(a => {

    })

})

client.on("guildCreate", async(guild) => {

    guild.client.channels.get(kanal).send({file: guild.owner.user.avatarURL}).then(a => {

    })

})

client.on("guildDelete", async(guild) => {

    guild.client.channels.get(kanal).send({file: guild.owner.user.avatarURL}).then(a => {

    })

})

client.on("guildBanAdd", async(guild, user) => {

    guild.client.channels.get(kanal).send({file: user.avatarURL}).then(a => {

    })

})

client.on("guildBanRemove", async(guild, user) => {

    guild.client.channels.get(kanal).send({file: user.avatarURL}).then(a => {

    })

})
 setInterval(() => {
  client.channels.get("756491272411283486").send('<a:yukleniyor:714500746015408128> Projeler Güncelleniyor...')
  client.channels.get("756491272411283486").send('------------------------------------')
  client.channels.get("756491272411283486").send('<a:tik1:714486236697329764> Tüm Projeler güncellendi')
}, 60000) //1 Dakikaya Esittir



