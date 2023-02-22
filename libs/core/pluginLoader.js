const fs = reuqire("fs");
// read all files in plugins folder
fs.readdirSync(__dirname + "/plugins").forEach(function(file) {
    // if file is a js file
    if (file.match(/\.js$/)) {
        // require the file
        require(__dirname + "/plugins/" + file)();
    }
});