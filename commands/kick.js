const discord = require("discord.js");

module.exports.run = async (bot, message, arguments) => {

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

    if (!kickUser) return message.channel.send("Speler niet gevonden.");

    var reason = arguments.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Alleen staff leden kunnen dit.");

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je kan geen staff leden kicken!");


    var kick = new discord.RichEmbed()
    .setTitle("Kick")
    .setColor("#ff5900")
    .addField("Gebruiker:", kickUser)
    .addField("Moderator:", message.author)
    .addField("Kanaal:", message.channel)
    .addField("Tijd:", message.createdAt)
    .addField("Reden:", reason)
    .setFooter("Kick Systeem");

    var kickChannel = message.guild.channels.find(`name`, "logs");
    if (!kickChannel) return message.channel.send("Maak het kanaal **logs** aan.");

    message.guild.member(kickUser).kick(reason);


    kickChannel.send(kick)


    return;

}

module.exports.help = {
    name: "kick"
}