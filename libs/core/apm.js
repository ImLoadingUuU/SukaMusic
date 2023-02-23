/* eslint-disable max-len */
const {Util, Track} = require('discord-player');
const f = {};
f.search = () => {
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
      console.error('No Results');
    }
    const trackInfo = res.data.rows[0];
    Downloader.download(trackInfo.audioUrl, `${bot.dir}/datastore/downloads`, async (path) => {
      embed.setDescription('Downloaded');
      await m.edit({
        embeds: [embed],
      });
      console.log(path);
      player.play(msg.member.voice.channel, path, {searchEngine: QueryType.FILE});
    });
  });
};
f.createTrack = (json, filePath) => {
  if (!filePath) {
    return;
  }
  const track = new Track(player, {
    title: json.trackTitle, // title
    url: json.audioUrl, // display url
    duration: Util.buildTimeCode(json.duration), // you can skip Util.buildTimeCode if you have the duration in str (0:00 format)
    description: json.description, // this also exists for compat
    thumbnail: json.albumArtLargeUrl, // thumbnail
    views: 0, // this is optional, this option existed in old versions and it exists for compat purpose
    author: json.composer.join(','), // track author
    requestedBy: context.requestedBy,
    source: 'arbitrary', // use this value if it is a raw url or path
    engine: filePath, // track value, this should point to raw downloadable url or stream object
    queryType: QueryType.ARBITRARY, // query value
  });
};

f.version = 1;
f.license = 'mit';

module.exports = f;
