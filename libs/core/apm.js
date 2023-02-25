/* eslint-disable max-len */
const axios = require('axios');
const f = {};
f.search = async ( query) => {
  const res = await axios.post("https://api.apmmusic.com/search/tracks",{'limit': 25, 'offset': 0, 'sort': 'relevancy_base', 'terms': [{'type': 'text', 'field': ['tags', 'track_title', 'track_description', 'album_title', 'album_description', 'sound_alikes', 'lyrics', 'library', 'composer'], 'value': query, 'operation': 'must'}]},{
    headers: {
      'Content-Type': 'application/json',
      'x-sundrop-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidHlwZSI6ImNvbXBvc2l0ZSIsImZpZWxkIjoidXNlcmluZm8iLCJ2YWx1ZSI6W3sidHlwZSI6InRleHQiLCJ2YWx1ZSI6IjAiLCJmaWVsZCI6InVzZXJpZCIsIm9wZXJhdGlvbiI6ImluY2x1ZGUifV0sIm9wZXJhdGlvbiI6ImluY2x1ZGUifSx7InR5cGUiOiJ0YWciLCJ2YWx1ZSI6IlVTIiwiZmllbGQiOlsicmVzdHJpY3RlZF90byJdLCJvcGVyYXRpb24iOiJtdXN0In1d.N4wYVgW8VnoKSZApYYjGqS2T3Tud_f4oHDCcKrBqPqg',
      'x-csrf-token': 'BASNjbQeR0ibnmamJ1UE1xF3iL2UNRI6Za-5FYBeQyA',
    },
  });


  
  if (!res.data.rows[0]) {
    console.error('No Results');
  }

  return res.data.rows[0];
};


f.version = 1;
f.license = 'mit';

module.exports = f;
