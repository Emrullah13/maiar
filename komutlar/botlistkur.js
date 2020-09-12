const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");
const prefixes = ayarlar.prefix;
const {stripIndents} = require('common-tags');
exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('**Bot List kurmak için `Yönetici` iznine sahip olmalısın!**')
return message.channel.send(embed)
}
  try {
	const embed = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsinin silinip botun yeni bir sunucu kurmasını onaylıyor musunuz?')
	.setFooter('Komut kullanmadan kanala direk "evet" yazar iseniz onaylamış olursunuz. Hiç bir şey yazmaz iseniz onaylanmaz.')
	message.channel.send({embed: embed})
	 message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.guild.channels.forEach((kanal) => {
          	kanal.delete()
          })
           setTimeout(() => {
          message.guild.roles.forEach((rol) => {
          	rol.delete()
          })
      }, 5000)
     
     const embedd = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsinin silinip botun yeni bir sunucu kurmasını onayladınız! Sunucu kuruluyor bu işlem biraz zaman alabilir.\nyoutube.com/linlords')
	message.author.send({embed: embedd})
    let every = message.guild.roles.find(r => r.name === '@everyone')
    //Kategoriler
    message.guild.createChannel('Bilgilendirme', 'category').then(bilgi => {
    message.guild.createChannel('Genel', 'category').then(toplum => {
    message.guild.createChannel('Bot List','category').then(botlist => {
    message.guild.createChannel('Partner','category').then(partner => {                                                           
    message.guild.createChannel('Kayıtlar', 'category').then(kayitlar => {
    //Kanallar
    setTimeout(() => {
    	message.guild.createChannel('📚┇kurallar', 'text').then(kurallar => {
    	kurallar.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
    	kurallar.setParent(bilgi.id)
    	kurallar.send(stripIndents`
> Kurallar
1. Küfür etmek, hakaretlerde bulunmak yasaktır!
2. Reklam yapmak, link atmak sunucu içersin de de, sunucudaki bir üyeye özelden mesaj olarak ta kesinlikle yasaktır!
3. Komut kanalları dışında bir kanalda komut kullanmak yasaktır!
4. Sesli kanallarda bas açmak vb. hareketler yapmak yasaktır!
5. Din, dil, ırk ayrımı yapmak yasaktır!
6. Siyaset hakkında tartışmak, konuşmak yasaktır!
7. Spam ve flood yapmak yasaktır!
8. Uygunsuz davranışlarda bulunmak, uygunsuz paylaşımlar yapmak yasaktır!
- Kuralları okumamak kesinlikle yasaktır!
    	`)
    })
message.guild.createChannel('🤖📚┇bot-list-kuralları', 'text').then(bl => {
     bl.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
    bl.setParent(botlist.id)
    bl.send(stripIndents`
> Bot List Kurallar
1 • Botunuz __10__ sunucuya ve __15.000__ kişiye hizmet vermelidir.
2 • Botunuzda en az __10__ komut bulunmalıdır.
3 • Botunuzda en fazla __3__ hatalı komut bulunmalıdır.
4 • Renkli ve hızlı haraket eden emojiler bulunmamalıdır.
5 • Yasaklı kodlar bulunmamalıdır.
6 • \`sa-as , spam koruma\` tarzı tüm komutlar ayarlamalı olmalıdır

> __Yasaklı Komutlar__
1 • Disko Rol
2 • Ailemiz,Top10,Top5
3 • Herkese-Rol-Ver/Al
4 • Herkesi Banla/Kickle
> Kuralları okumamak kesinlikle yasaktır!
    `)
    })
      message.guild.createChannel('🌟┇yetkili-log', 'text').then(bl => {
     bl.overwritePermissions(every, {
    		SEND_MESSAGES: false,
        VIEW_CHANNEL: false
    	})})
    	message.guild.createChannel('📢┇duyurular', 'text').then(duyurular => {
    	duyurular.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
    	duyurular.setParent(bilgi.id)
    })
    	message.guild.createChannel('💭┇sohbet', 'text').then(sohbet => {
    	sohbet.setParent(toplum.id)
    })
    	message.guild.createChannel('⚒┇komut-kullanım', 'text').then(komutlar => {
    	komutlar.setParent(toplum.id)
    })
    	message.guild.createChannel('🤖┇bot-test', 'text').then(destek => {
    	destek.setParent(botlist.id)
    	db.set(`bottest_${message.guild.id}`, destek.id)
    })
    }, 5000)
    setTimeout(() => {
    	message.guild.createChannel('🔸️┇partner-şart', 'text').then(ps => {
        ps.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
    ps.setParent(partner.id)
    	db.set(`ps_${message.guild.id}`, ps.id) 
    })
 message.guild.createChannel('👑┇boost', 'text').then(boost => {
   boost.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
  boost.setParent(bilgi.id)
    	db.set(`boost_${message.guild.id}`, boost.id)
    })     
    message.guild.createChannel('🔹️┇partner-text', 'text').then(pst => {
    pst.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
      pst.setParent(partner.id)
    	db.set(`pst_${message.guild.id}`, pst.id)
    })
    message.guild.createChannel('⚜┇partnerler', 'text').then(psl => {
    psl.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
      psl.setParent(partner.id)
    	db.set(`psl_${message.guild.id}`, psl.id)
    })
    	message.guild.createChannel('📥📤┇gelen-giden', 'text').then(gc => {
    gc.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
        gc.setParent(kayitlar.id)
    	db.set(`gc_${message.guild.id}`, gc.id)
    })
      message.guild.createChannel('🤖┇bot-ekle', 'text').then(bekle => {
      bekle.setParent(botlist.id)
      bekle.send(`Bot eklemeden önce **bot list kurallarını** okumayı unutma!\nBot eklemek için \`${prefixes}botekle <botID> <prefix>\``)
    	db.set(`bmLog_${message.guild.id}`, bekle.id)
    })
    	message.guild.createChannel('🎈┇mod-log', 'text').then(modlogg => {
     modlogg.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
        modlogg.setParent(kayitlar.id)
    	db.set(`mLog_${message.guild.id}`, modlogg.id)
    })
    	message.guild.createChannel('🤖┇bot-log', 'text').then(log => {
    	log.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
        log.setParent(botlist.id)
    	db.set(`log_${message.guild.id}`, log.id)
    })
    }, 10000)
    })})})})})
      
    setTimeout(() => {
    	message.guild.createRole({
        name: '👑┇Kurucu',
        color: 'ff0000',
        permissions: [
            "ADMINISTRATOR",
    ]
      })
      message.guild.createRole({
        name: '🏵┇Yönetim',
        color: '00bdff',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })
      message.guild.createRole({
        name: '🌟┇Moderator',
        color: '00ff08',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })
      message.guild.createRole({
        name: '⚜┇Bot Tester',
        color: '00ff08',
        permissions: [
            "ADMINISTRATOR"
    ]
      })
      message.guild.createRole({
      	name: '👥┇Onaylı Bot Geliştiricisi',
      	color: 'GREEN',
      }).then(d => {
      db.set(`bottest_${message.guild.id}`, d.id)
    })
      message.guild.createRole({
      	name: '👥┇Bot Geliştiricisi',
      	color: 'BLUE',
      }).then(d => {
      db.set(`bottest_${message.guild.id}`, d.id)
    })
      message.guild.createRole({
        name: '🤖┇Onaylı Botlar',
        color: '00ffb6',
      })
      .then(d => {
      db.set(`bottest_${message.guild.id}`, d.id)
    })
      message.guild.createRole({
        name: '🤖┇Botlar',
        color: 'ff8100',
      })
      .then(d => {
      db.set(`bottest_${message.guild.id}`, d.id)
    })
      message.guild.createRole({
        name: '👤┇Üye',
        color: 'caf7fc',
      }).then(d => { db.set(`otoR_${message.guild.id}`, d.id)})
    const embed = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsi başarıyla silindi! Ve sunucu kurulumu tamamlandı!\nNot: Bazı kanallar ayarlanmamış olabilir.Kontrol ediniz.\nyoutube.com/linlords')
	message.author.send({embed: embed})
    }, 20000)
        })
        .catch(() => {
        	message.channel.send('`10 saniye` geçerek kanalları, kategorileri ve rolleri silme işlemi iptal edildi!')
        });
    
  } catch (err) {
    
  }
  
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['botlistkurulum', 'botlist-sunucu-kur', 'botlistsunucukur','blkur','botlistkur','bot-list-kur'],
	permLevel: 0
};
exports.help = {
	name: 'botlist-sunucu-kurulum',
	description: 'Sunucunuzu sıf��rlar ve tekrardan botun ayarlarını ayarlayarak gerekli rolleri, kanalları, kategorileri oluşturarak sunucu kurar.',
	usage: ''
};
