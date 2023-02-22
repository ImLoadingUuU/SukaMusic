// Formatted by ChatGPT
// 引入必要的庫
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const Logger = require('./libs/logger-v5/logger.js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require("fs")
// 載入環境變數
dotenv.config();

// 創建日誌記錄器
const botLogger = new Logger('Bot', true, [], 8);
const processLogger = new Logger('Process', true, [], 8);

// 启动日志
botLogger.ok('Starting Bot');
processLogger.ok('Starting Process');

// 初始化 Discord 客戶端
const bot = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
  partials: ['CHANNEL'], // 必需接收私人訊息
});

// 初始化音频播放器
const player = new Player(bot);

// 設置客戶端的變量
bot.commands = new Collection();
bot.player = player;
bot.botLog = botLogger;
bot.processLog = processLogger;
bot.dir = __dirname;

// 监听 ready 事件，表示客户端已准备好
bot.on('ready', async () => {
  bot.botLog.ok(`Logged in as ${bot.user.tag}`);
});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('aliases' in command && 'execute' in command) {

        bot.botLog.ok(`Loaded Command "${command.name}" from ${filePath}`)
        for (let alias of command.aliases) {
            bot.commands.set(alias, command)
            bot.botLog.info(`Registerd ${alias} as an alias for "${command.name}"`)
        }
	} else {
		bot.botLog.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

bot.on("messageCreate",async (msg) => {
    let content = msg.content.toLowerCase()
    let splited = content.split(" ")
    let c = bot.commands.get(splited[0])
    if(c && msg.author.id !== bot.user.id){
        c.execute(bot,msg,splited)
    }
})
 
bot.login(process.env.t);
// require("./plugins/onlineForever.js")