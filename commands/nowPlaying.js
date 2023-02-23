
const {EmbedBuilder} = require('discord.js');

module.exports = {
  name: 'Now Playing',
  description: 'Get Now Playing',
  aliases: ['np'],
  execute: async (bot, msg, args) => {
    const queue = bot.player.nodes.get(msg.guildId);
    if (!queue) {
      msg.reply('Not Playing');
      return;
    }

    const track = queue.currentTrack;

    const ts = queue.node.getTimestamp();


    const embed = new EmbedBuilder()

        .setColor('Red')
        .setTitle('💿 Now Playing')
        .setDescription(`[${track.title}](${track.url})`)
        .setThumbnail(track.thumbnail ?? msg.author.displayAvatarURL())
        .addFields([
          {name: 'Author', value: track.author},
          {name: 'Progress', value: `${queue.node.createProgressBar()} (${ts?.progress}%)`},
        ])
        .setFooter({
          text: `Ping: ${queue.ping}ms | Event Loop Lag: ${queue.player.eventLoopLag.toFixed(0)}ms`,
        });
    msg.reply({embeds: [embed]});
  },


};
