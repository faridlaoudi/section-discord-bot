const Discord = require('discord.js');
const csv = require('csv-parser');
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');

// Define your client with the necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

const token = 'MTIwNDM3NzQwMjM2NTQ1MjMxOA.Gme66a.CpV7gbmWrMyBVbSPNLTZ03iuK2W6kccoaTUHIw'; // Replace with your actual bot token
const welcomeChannelId = '1203838731010969711'; // Replace with your welcome channel ID

client.once('ready', () => {
    console.log('Bot is online!');
    sendWelcomeMessage();
});

client.on('guildMemberAdd', member => {
    // You can also send a DM to each member that joins if preferred
    member.send('Welcome to the server! Please verify your identity by sending me a direct message with `!join <your_matricule>` to gain full access.');
});

client.on('messageCreate', message => {
    // Check if the message is a direct message with the correct prefix
    if (message.channel.type === welcomeChannelId) {
        const args = message.content.slice().trim().split(/ +/); // Adjust index if necessary
        if (args.length === 0) {
            return message.reply('Please provide your matricule after the `!join` command.');
        }
        const matricule = args[0];
        // Insert your verification logic here
        verifyMatricule(matricule, isValid => {
            if (isValid) {
                message.reply('Your matricule has been verified!');
                // Handle successful verification, such as adding to a database or marking as verified
            } else {
                message.reply('Invalid matricule. Please try again or contact an admin for help.');
            }
        });
    }
});

function sendWelcomeMessage() {
    const welcomeChannel = client.channels.cache.get(welcomeChannelId);
    if (welcomeChannel) {
        welcomeChannel.send('Welcome to the server! Please verify your identity by sending me a direct message with `!join <your_matricule>` to gain full access.');
    } else {
        console.log('Welcome channel not found. Please check the channel ID.');
    }
}

function verifyMatricule(inputMatricule, callback) {
    // Implement your matricule verification logic here
    // This example assumes a function that checks the matricule against a CSV file or other data source
    let isValid = false; // Placeholder for actual verification result
    // Example: Set isValid to true if matricule matches
    fs.createReadStream('students.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.matricule === inputMatricule) {
                isValid = true;
            }
        })
        .on('end', () => {
            callback(isValid);
        });
}

client.login(token);
