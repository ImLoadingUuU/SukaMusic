const { fetch } = require("undici")
const configs = {
    time: 1 //s
  }
module.exports = {

  function: () => {
      const { REPL_OWNER, REPL_SLUG } = process.env
    setInterval(() => {
        fetch("https://" + REPL_SLUG.replace(/[^\x00-\x7F]/g, "").replace(/ +/g, "").toLowerCase() + "." + REPL_OWNER.toLowerCase() + ".repl.co")
      console.log("Requested")
    },configs.time * 1000)
  }
}