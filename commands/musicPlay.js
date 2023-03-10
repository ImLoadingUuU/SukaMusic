/* eslint-disable max-len */


/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 */
const axios = require('axios');
const {QueryType} = require('discord-player');
const Downloader = require('../libs/core/downloader.js');
const {EmbedBuilder} = require('discord.js');

module.exports = {
  name: '播放',
  description: '播放音樂',
  aliases: ['play', 'p', '我想聽'],
  execute: async (bot, msg, args) => {
    const player = bot.player;
    if (!msg.member.voice.channel) {
      return msg.channel.send('傻逼你沒進語音頻道');
    }
    const sliced = args;

    try {
      try {
        if (!sliced[1].startsWith('apm:')) {
          const res = await player.play(msg.member.voice.channel, args.slice(1).join(' '), {

            nodeOptions: {
              metadata: {
                channel: msg.member.voice.channel,
              },
              volumeSmoothness: true,
              ytdlOptions: {
                quality: 'highest',
                filter: 'audioonly',
              },
            },
          });
          return await msg.reply({content: `⏱️ | 載入中嘟嘟嘟 **${res.track.title}**!`});
        }
        // sliced[1].startsWith("apm:")
        // no working until v6 fixed
        if (sliced[1].startsWith('apm:')) {
          const query = args.slice(1).join(' ').slice(4);
          console.log(query);
          axios({
            method: 'POST',
            url: 'https://api.apmmusic.com/search/tracks',
            headers: {
              'Content-Type': 'application/json',
              'x-sundrop-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidHlwZSI6ImNvbXBvc2l0ZSIsImZpZWxkIjoidXNlcmluZm8iLCJ2YWx1ZSI6W3sidHlwZSI6InRleHQiLCJ2YWx1ZSI6IjAiLCJmaWVsZCI6InVzZXJpZCIsIm9wZXJhdGlvbiI6ImluY2x1ZGUifV0sIm9wZXJhdGlvbiI6ImluY2x1ZGUifSx7InR5cGUiOiJ0YWciLCJ2YWx1ZSI6IlVTIiwiZmllbGQiOlsicmVzdHJpY3RlZF90byJdLCJvcGVyYXRpb24iOiJtdXN0In1d.N4wYVgW8VnoKSZApYYjGqS2T3Tud_f4oHDCcKrBqPqg',
              'x-csrf-token': 'BASNjbQeR0ibnmamJ1UE1xF3iL2UNRI6Za-5FYBeQyA',
            },
            data: {'limit': 25, 'offset': 0, 'sort': 'relevancy_base', 'terms': [{'type': 'text', 'field': ['tags', 'track_title', 'track_description', 'album_title', 'album_description', 'sound_alikes', 'lyrics', 'library', 'composer'], 'value': query, 'operation': 'must'}]},
          }).then(async (res) => {
            if (!res.data.rows[0]) {
              return msg.reply('沒有這首歌在APM');
            }
            const item = res.data.rows[0];
            console.log(res.data.rows[0].audioUrl);
            //  player.play(msg.member.voice.channel, res.data.rows[0].audioUrl,{  searchEngine: QueryType.AUTO,})
            const embed = new EmbedBuilder();
            embed.setTitle('APM Music');
            embed.setDescription('Downloading');
            embed.setColor('#006d8f');
            embed.setImage(item.albumArtLargeUrl);
            embed.addFields(
                {name: 'Album', value: item.albumCode, inline: true},
                {name: 'Composer', value: item.composer.join(','), inline: true});

            const m = await msg.reply({
              embeds: [embed],
            });
            Downloader.download(res.data.rows[0].audioUrl, `${bot.dir}/datastore/downloads`, async (path) => {
              embed.setDescription('Downloaded');
              await m.edit({
                embeds: [embed],
              });
              console.log(path);
              player.play(msg.member.voice.channel, path, {searchEngine: QueryType.FILE});
            });
          });
        }
      } catch (e) {
        return await msg.reply({content: `出錯了！！: ${e.message}`, ephemeral: true});
      }
    } catch (m) {
      queue.destroy();
      bot.botLog.error(m);
      return await msg.reply('幹嘛？');
    }
  },
};
