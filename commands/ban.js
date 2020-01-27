const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!banUser) return message.channel.send("Speler niet gevonden.");

    var reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("Vergeet de reden niet.")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Alleen staff leden kunnen dit.");

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je kan geen staff leden bannen!");


    var ban = new discord.RichEmbed()
    .setTitle("Ban")
    .setColor("#ff5900")
    .addField("Gebruiker:", banUser)
    .addField("Moderator:", message.author)
    .addField("Reden:", reason)
    .addField("Tijd:", message.createdAt)
    .setFooter("Ban Systeem Utrecht");

    var banChannel = message.guild.channels.find(`name`, "logs");
    if (!banChannel) return message.channel.send("Maak het kanaal **logs** aan.");

    message.guild.member(banUser).ban(reason);


    banChannel.send(ban)


    return;

}

module.exports.help = {
    name: "ban"
}