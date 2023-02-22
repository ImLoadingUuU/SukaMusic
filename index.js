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
const commands = {}


// read all files in commands
let overwritedCommands = [
   
]
require("fs").readdirSync(__dirname + "/commands").forEach(function(file) {
 if (typeof(require(file)) !== "object") {
     console.log("Commands Loader WARN - " + file + " is not a command object.")
 }
 
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
            require("./commands/getStatus.js")(message, client)
        } else if (lowered.startsWith("播放")) {
            require("./commands/musicPlay.js")(message, client, player)
        } else if (lowered.startsWith("閉嘴")) {
          require("./commands/musicStop.js")(message, client, player)
        } else if (lowered.startsWith("不想聽了")) {
           require("./commands/musicSkip.js")(message, client, player)
        } else if (lowered.startsWith("設定特效")) { 
            require("./commands/filter.js")(message, client, player)
        }
    } catch (err) {
        message.reply("你把我搞壞了,信不信我真實你")
        console.log(err)
    }
});


client.login(process.env.t);
require("./plugins/onlineForever.js")