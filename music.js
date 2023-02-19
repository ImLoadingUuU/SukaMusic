/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 */



module.exports = async (msg,client,player) => {
    if(!msg.member.voice.channel) {
        return msg.channel.send("傻逼你沒進語音頻道")
    }
   let queue = player.createQueue(msg.guild,{
    metadata: msg.member.voice.channel,
     volumeSmoothness: true,
         ytdlDownloadOptions: {
        quality: "highest",
        filter: "audioonly",
      },
   })
   try {
    if (!queue.connection) await queue.connect(msg.member.voice.channel);
    const track = await player.search(msg.content.slice(2), {
        requestedBy: msg.author
    }).catch((err) =>{
      console.log(err)
      return msg.reply({
        content: "爆炸了"})
    })
     
    if (!track) return await msg.reply({ content: `❌ | 你傻逼啊,找不到 **${msg.content.slice(2)}** !` });
 track.playlist ? queue.addTracks(track.tracks) : queue.addTrack(track.tracks[0]);
        if (!queue.playing) {
          queue.play()
        }

     console.log("Playerd")

     return await msg.reply({ content: `⏱️ | 開始播放! ${track.tracks[0].title}` });
} catch (m){
    queue.destroy();
    console.log(m)
    return await msg.reply("幹嘛？");
}
       
          
    
  }