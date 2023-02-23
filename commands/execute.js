


module.exports = {
    name: "Eval",
    description: "Eval",
    aliases: ["eval"],
    execute: async (bot, msg , args) => {
       let id = msg.member.id
       if(id == 683084368863952916){
       try {
        let ev = eval("(" + msg.content.slice(4) + ")")
      msg.reply("Result: \n ``` " + ev + " ```")
       } catch (err) {
        msg.reply("Eval Error \n ``` " + err + " ```")
        
       }
       }
    
       
    }
  }