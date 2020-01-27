const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden!");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} is geladen!`);

        bot.commands.set(fileGet.help.name, fileGet)

    })

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("Utrecht || roblox.com || !help", { type: "PLAYING" });

});

bot.on("guildMemberAdd", member => {
    var role = member.guild.roles.find("name", "Speler");

    if (!role) return;

    member.addRole(role);

    const channel = member.guild.channels.find("name", "welkom-en-tot-ziens");

    if (!channel) return;

    channel.send(`Welkom in Utrecht ${member}`);
})


bot.on("message", async message => {


    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);



    if(command === `${prefix}kick`) {
        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

    if (!kickUser) return message.channel.send("Speler niet gevonden.");

    var reason = arguments.join(" ").slice(22);

    if (!reason) return message.channel.send("Vergeet de reden niet.")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Alleen staff leden kunnen dit.");

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je kan geen staff leden kicken!");


    var kick = new discord.RichEmbed()
        .setTitle("Kick")
        .setColor("#ff5900")
        .addField("Gebruiker:", kickUser)
        .addField("Moderator:", message.author)
        .addField("Tijd:", message.createdAt)
        .addField("Reden:", reason)
        .setFooter("Kick Systeem Utrecht");

    var kickChannel = message.guild.channels.find(`name`, "logs");
    if (!kickChannel) return message.channel.send("Maak het kanaal **logs** aan.");

    message.guild.member(kickUser).kick(reason);


    kickChannel.send(kick)


    return;
    }
});


bot.login(process.env.token);