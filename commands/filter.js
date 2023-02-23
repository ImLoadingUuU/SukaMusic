const {EmbedBuilder} = require('discord.js');


module.exports ={
  name: 'filter',
  description: 'filter',
  aliases: ['設定特效', 'effects', '設置特效', '特效', 'filters'],
  execute: async (bot, msg, args) => {
    const player = bot.player;
    const queue = player.nodes.get(msg.guildId);
    const fields = msg.content.split(' ');
    let prevMessage = null;
    try {
      if (queue && msg.client.voice) {
        const embed = new EmbedBuilder();
        embed.setAuthor({
          name: '坤坤音樂',
        });
        embed.setTitle('更換過濾器中... 這需要一段時間');
        embed.setColor('#006d8f');
        embed.setFooter({
          text: '坤坤音樂 2023  - 過濾器功能',
        });
        embed.setTimestamp();

        prevMessage = await msg.reply({embeds: [embed]});


        async function end() {
          const embed = new EmbedBuilder();
          embed.setAuthor({
            name: '坤坤音樂',
          });
          embed.setTitle('成功更換過濾器');
          embed.setColor('#006d8f');
          embed.setFooter({
            text: '坤坤音樂 2023  - 過濾器功能',
          });
          embed.setTimestamp();
          await prevMessage.edit({embeds: [embed]});
        }
        switch (fields[1].toLowerCase()) {
          case 'nightcore':
            queue.filters.ffmpeg.toggle(['nightcore']);
            end();
            break;
          case 'bassboost':
            queue.filters.ffmpeg.toggle(['bassboost']);
            end();
            break;
          case '8d':
            queue.filters.filters.setFilters(['8D']);
            end();
            break;
          case 'karaoke':
            queue.filters.ffmpeg.toggle(['karaoke']);
            end();
            break;
          case 'lofi' || 'lo-fi' || 'lf' || '低傳真':
            queue.filters.ffmpeg.toggle(['lofi']);
            end();
            break;
          default:
            await prevMessage.edit('沒有這個過濾器');
            break;
        }
      } else {
        msg.reply('沒有在播放');
      }
    } catch (err) {
      console.log(err);
      msg.reply('出錯摟！');
    }
  },
};
