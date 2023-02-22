const config = require('./config.json')
const Logger = require("./libs/logger-v5/logger.js")
const coreLogger = new Logger('Core', true, [], 8);
coreLogger.info("Bootstraper v1.0.0");
coreLogger.info("Plugin Loader")

// Plugin Loader not working rn
require("fs").readdirSync(__dirname + "/plugins").forEach(function(file) {
    let res = require(__dirname + "/plugins/" +file);
    console.log(`Loading Plugin ${res.name} id: ${res.id}` )
    let permissionLists =  res.pluginConfig;
    if (config.permission[res.id]) {
     for (let i = 0; i < permissionLists.length; i++) {
        if (config.permission[res.id][permissionLists[i]] == undefined) {
            config.permission[res.id][permissionLists[i]] = false;
            coreLogger.warn("Permission Error ")
        }
     }
    } else {
        coreLogger.warn("Permission Error - Please add ID in cfg.json")
    }

})
require("./index.js");