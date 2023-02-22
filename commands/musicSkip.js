/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 */




module.exports = {
  name: "Skip The Musics",
  description: "Skip The Music",
  aliases: ["skip","跳過","不想聽了"],
  execute: async (bot, msg, args) => {
    const queue = bot.player.nodes.get(msg.guildId); 

    if (queue  && msg.client.voice ) {
    queue.node.skip(); 
    msg.reply("跳過了傻逼")
      }  else {
        msg.reply("沒有在播放")
      }

  }
}