const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 

    message.delete();
    // Id van category van tickets.
    const categoryId = "669920780229804042";
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij kunt dit niet doen!");
    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID !== categoryId, "665877851509227521") {

        return message.channel.send("Gelieve dit commando in een ticket kanaal te doen.");
 
    }
 
    var icon = message.author.displayAvatarURL;

    var embedClaimTicket = new discord.RichEmbed()
        .setTitle("Hoi, " + message.channel.name)
        .setDescription("Je ticket is geclaimed door:", message.author)
        .setColor("#ffa500")
        .setThumbnail(icon)
        .setFooter("ticket geclaimed");
 
    // Vind kanaal voor de logs.
 
    return message.channel.send(embedClaimTicket);
    
 
}
 
module.exports.help = {
    name: "claim",
    description: "claim een ticket"
}