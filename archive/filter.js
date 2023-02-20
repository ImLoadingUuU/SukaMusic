/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 * @param {import('discord-player').Queue} queue - Discord Player 播放器对象
 */
const { AudioFilters } = require("discord-player");




module.exports = async (msg,client,player) => {
    const queue = player.getQueue(msg.guildId); 
    const fields =  msg.content.split(" ")
    try {
      if (queue  && msg.client.voice ) {
        if (!fields[2]) msg.reply("請輸入數值")
        if ( fields[1] == "速度") {
        
          queue.speed = fields[2] || 0.5
          msg.reply(`設定速度了！ 目前速度為 ${fields[2] * 2}x` )
        }
        }  else {
          msg.reply("沒有在播放")
        }
    } catch (err) {
      msg.reply("出錯摟！")
    }
    }