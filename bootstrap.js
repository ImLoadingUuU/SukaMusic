console.log("Bootstraper v1.0.0");
console.log("Plugin Loader")
const config = require('./cfg.json')
// rread all files in plugins
require("fs").readdirSync(__dirname + "/plugins").forEach(function(file) {
    let res = require(__dirname + "/plugins/" +file);
    console.log(`Loading Plugin ${res.name} id: ${res.id}` )
    let permissionLists =  res.pluginConfig;
    if (config.permission[res.id]) {
     for (let i = 0; i < permissionLists.length; i++) {
        if (config.permission[res.id][permissionLists[i]] == undefined) {
            config.permission[res.id][permissionLists[i]] = false;
            console.log("Permission Error")
        }
     }
    } else {
        console.timeLog("Permission Error - Please add ID in cfg.json")
    }
})