const { EmbedBuilder } = require("discord.js")
let embeds = {}
// Player Error EMbed
embeds.PlayerError = new EmbedBuilder()
embeds.PlayerError.setTitle("播放錯誤")
embeds.PlayerError.setAuthor("坤坤音樂")
embeds.PlayerError.setDescription("播放出錯了,肯地有小黑子來搗亂")
embeds.PlayerError.setColor("#f0002c")
// Filter Applyed

embeds.FilterApplied = new EmbedBuilder()
embeds.FilterApplied.setTitle("成功套用過濾器")
embeds.FilterApplied.setAuthor("坤坤音樂")
embeds.FilterApplied.setDescription("播放出錯了,肯地有小黑子來搗亂")
embeds.FilterApplied.setColor("#f0002c")

