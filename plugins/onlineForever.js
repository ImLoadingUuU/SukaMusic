const {fetch} = require('undici');
const express = require('express');
const app = express();
const configs = {
  time: 1, // s
};
// License Type 1 = MIT
// License Type 2 = GPL
// License Type 3 = Apache
// License Type 4 = BSD
module.exports = {
  pluginDataVersion: 1,
  name: 'onlineForever',
  description: 'Repl.it',
  id: 'onlineForever',
  license: 1,
  pluginConfig: [
    'overwriteCommand',
  ],
  function: (sukaCoreAPI) => {
    const {REPL_OWNER, REPL_SLUG} = process.env;
    if (REPL_OWNER == undefined) {
      console.log('Running on Local! Not supported');
      return;
    }
    if (REPL_OWNER) {
      console.log('Detect using repl.it');
      setInterval(() => {
        fetch('https://' + REPL_SLUG.replace(/[^\x00-\x7F]/g, '').replace(/ +/g, '').toLowerCase() + '.' + REPL_OWNER.toLowerCase() + '.repl.co');
      }, configs.time * 1000);
      app.get('/', (req, res) => {
        res.send('Online Forever Working');
      });
    }
  },
};
