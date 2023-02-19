/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 */



module.exports = async (msg, client, player) => {
  if (!msg.member.voice.channel) {
    return msg.channel.send("傻逼你沒進語音頻道")
  }

  try {

    try {
      const res = await player.play(msg.member.voice.channel, msg.content.slice(2), {
        nodeOptions: {
          metadata: {
            channel: msg.member.voice.channel
          },
          volumeSmoothness: true,
          ytdlOptions: {
            quality: "highest",
            filter: "audioonly",
          },
        }
      });

      return await msg.reply({ content: `⏱️ | 載入中嘟嘟嘟 **${res.track.title}**!` });
    } catch (e) {
      return await msg.reply({ content: `出錯了！！: ${e.message}`, ephemeral: true });
    }

  } catch (m) {
    queue.destroy();
    console.log(m)
    return await msg.reply("幹嘛？");
  }



}