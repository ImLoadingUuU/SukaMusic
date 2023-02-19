
module.exports = (msg,client,player) => {
  const queue = player.getQueue(msg.guildId); 
  if (!queue) { return msg.reply("你傻逼沒有播放清單,警告一支傻逼")}


}