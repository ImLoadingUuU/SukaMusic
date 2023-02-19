/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 * @param {import('discord-player').Queue} queue - Discord Player 播放器对象
 */
const { AudioFilters } = require("discord-player");
const { EmbedBuilder } = require("discord.js")


module.exports = async (msg, client, player) => {
  const queue = player.nodes.get(msg.guildId);
  const fields = msg.content.split(" ")
  let prevMessage = null;
  try {
    if (queue && msg.client.voice) {
      const embed = new EmbedBuilder();
      embed.setAuthor({
        name: "坤坤音樂",
      });
      embed.setTitle("更換過濾器中... 這需要一段時間");
      embed.setColor("#006d8f");
      embed.setFooter({
        text: "坤坤音樂 2023  - 過濾器功能",
      });
      embed.setTimestamp();
      
       prevMessage = await msg.reply({ embeds: [embed] });
      try {
       
          switch (fields[1].toLowerCase()) {
            case "nightcore" || "nc":
               queue.filters.ffmpeg.toggle(["nightcore"]);
               
            case "bassboost" || "bb":
               queue.filters.ffmpeg.toggle(["bassboost"]);
               
            case "8d":
               queue.filters.filters.setFilters(['8D']);
            
            
            
          }
        
        const embed = new EmbedBuilder();
        embed.setAuthor({
          name: "坤坤音樂",
        });
        embed.setTitle("成功更換過濾器");
        embed.setColor("#006d8f");
        embed.setFooter({
          text: "坤坤音樂 2023  - 過濾器功能",
        });
        embed.setTimestamp();
       await prevMessage.edit({ embeds: [embed] })
       
      } catch (err) {
        const embed = new EmbedBuilder();
        embed.setAuthor({
          name: "坤坤音樂",
        });
        embed.setTitle("未知的過濾器");
        embed.setColor("#831100");
        embed.setDescription(err)
        embed.setFooter({
          text: "坤坤音樂 2023",
        });
        embed.setTimestamp();
        await prevMessage.edit({ embeds: [embed] })
      }
    } else {
      msg.reply("沒有在播放")
    }
  } catch (err) {
    console.log(err)
    msg.reply("出錯摟！")
  }
}