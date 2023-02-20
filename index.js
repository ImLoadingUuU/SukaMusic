const { Client, GatewayIntentBits } = require('discord.js');
require("dotenv").config();
const statusList = require("./statusList.json")
const client = new Client(
    {
        intents: [
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildPresences
            
     
        ],
        partials: [
            'CHANNEL', // Required to receive DMs
        ]
    });
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const { Player } = require("discord-player");
const player = new Player(client);

player.events.on("trackStart", (queue, track) => {
 console.log("Next Track")
})


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        status: 'online',
        activities: {
            name: '籃球',
            type: 'PLAYING'
        }
    });
});

client.on('messageCreate', async (message) => {

    try {
      let lowered = message.content.toLowerCase()
        if (lowered.startsWith('獲取狀態來自')) {
            require("./getStatus.js")(message, client)
        } else if (lowered.startsWith("播放")) {
            require("./musicPlay.js")(message, client, player)
        } else if (lowered.startsWith("閉嘴")) {
          require("./musicStop.js")(message, client, player)
        } else if (lowered.startsWith("不想聽了")) {
           require("./musicSkip.js")(message, client, player)
        } else if (lowered.startsWith("設定特效")) { 
            require("./filter.js")(message, client, player)
        }
    } catch (err) {
        message.reply("你把我搞壞了,信不信我真實你")
        console.log(err)
    }
});


client.login(process.env.t);
require("./plugins/onlineForever.js")