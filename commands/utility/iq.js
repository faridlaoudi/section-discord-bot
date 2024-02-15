const { SlashCommandBuilder } = require('discord.js');
const crypto = require('crypto'); // Import the crypto module to generate a hash

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iq')
        .setDescription('Replies with a fake IQ test result!')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name to get an IQ score for')
                .setRequired(false)),
    async execute(interaction) {
        // Get the current date in YYYY-MM-DD format
        const today = new Date().toISOString().slice(0, 10);

        // Decide the seed source: Use the provided name or the user's ID if no name is given
        const nameOption = interaction.options.getString('name');
        const seedSource = nameOption || interaction.user.id;

        // Create a unique string using the seed source and the current date
        const uniqueString = `${seedSource}-${today}`;

        // Generate a hash from the unique string
        const hash = crypto.createHash('md5').update(uniqueString).digest('hex');

        // Convert the first few characters of the hash into a number
        const seed = parseInt(hash.substring(0, 8), 16);

        // Generate a "random" number using the seed, within the range of 50 to 180
        const fakeIQ = 50 + (seed % 131); // 131 is the range size (180 - 50 + 1)

        // Decide whether to use the provided name or the user's username for display
        const displayName = nameOption || interaction.user.username;
        
        await interaction.reply(`IQ Of **${displayName}** is **${fakeIQ}** today.`);
    },
};
