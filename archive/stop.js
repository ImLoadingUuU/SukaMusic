/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 */



module.exports = {
    name: "Stop Music",
    description: "Stop Music",
    execute: async (msg,client,player) => {
      const queue = player.getQueue(msg.guildId); 
  
      if (queue  && msg.client.voice ) {
      queue.stop(); 
      msg.reply("已停止播放")
        }  else {
          msg.reply("沒有在播放")
        }
      }
}