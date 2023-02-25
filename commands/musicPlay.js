/* eslint-disable max-len */


/**
 * @param {import('discord.js').Message} msg - Discord 消息对象
 * @param {import('discord.js').Client} client - Discord 客户端对象
 * @param {import('discord-player').Player} player - Discord Player 播放器对象
 */
// const axios = require('axios');
const {QueryType, Track, Util} = require('discord-player');
const { createAudioResource, StreamType } = require('@discordjs/voice');

const Downloader = require('../libs/core/downloader.js');
const {EmbedBuilder} = require('discord.js');
const APM = require('../libs/core/apm.js');
function convertToMinutesSeconds(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;

  minutes = minutes.toString();
  seconds = seconds.toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
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
          const queue =bot.player.nodes.get(msg.guildId);
          const query = args.slice(1).join(' ').slice(4);
          console.log(query);
          const json = await APM.search(query);
          console.log(typeof(json))
          Downloader.download(json.audioUrl, `${bot.dir}/datastore/downloads`, async (path) => {
            console.log("Creating")
            console.log(convertToMinutesSeconds(json.duration))
            const track = new Track(player, {
              title: json.trackTitle, // title
              url: json.audioUrl, // display url
              duration: convertToMinutesSeconds(json.duration), // you can skip Util.buildTimeCode if you have the duration in str (0:00 format)
              description: json.description, // this also exists for compat
              thumbnail: json.albumArtLargeUrl, // thumbnail
              views: 0, // this is optional, this option existed in old versions and it exists for compat purpose
              author: json.composer.join(','), // track author
              requestedBy: msg.author,
              source: 'arbitrary', // use this value if it is a raw url or path
              engine: path, // track value, this should point to raw downloadable url or stream object
              queryType: QueryType.FILE, // query value,
              
            });
            track.isFile = true
            console.log(track);
            const resource = createAudioResource(path, {
              type: StreamType.Arbitrary,
              inlineVolume: false,
              metadata: track
          });
          
          queue.node.playRaw(resource) 
            await msg.reply('Played');
          });
        }
      } catch (e) {
        return await msg.reply({content: `Error: ${e.message}`, ephemeral: true});
      }
    } catch (m) {
      queue.destroy();
      bot.botLog.error(m);
      return await msg.reply('幹嘛？');
    }
  },
};
