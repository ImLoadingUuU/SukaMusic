/**
 * @param {import('discord.js').Message} message - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 */
const statusList = require('../statusList.json');
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
module.exports = {
  name: 'status',
  description: 'status',
  aliases: ['狀態', '在幹嘛'],
  execute: async (bot, msg, args) => {
    const user = msg.mentions.users.first();
    if (!user) {
      return msg.reply('傻逼你要先找一個人');
    }
    const member = await msg.guild.members.fetch(user);

    const userStatus = member.presence.status;
    if (!userStatus) {
      await message.reply('不知道哈');
      return;
    }
    let result = '不知道';
    console.log('狀態是');
    console.log(userStatus);

    const stats = statusList[userStatus];

    const rp = stats[getRandomInt(stats.length)];
    result = `${user.tag} ${rp}` || '不知道在幹嘛';

    await message.reply(result);
  },
};
