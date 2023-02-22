/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 */



/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 */




module.exports = {
  name: "Stop The Musics",
  description: "Stop The Music",
  aliases: ["stop"],
  execute: async (msg,client,player) => {
    const queue = player.nodes.get(msg.guildId); 

    if (queue  && msg.client.voice ) {
    queue.node.stop(); 
    msg.reply("滾")
      }  else {
        msg.reply("沒有在播放")
      }

  }
}