const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iq')
        .setDescription('Replies with a fake IQ test result!')
        .addStringOption(function(option) {
            return option.setName('name')
                .setDescription('The name to get an IQ score for')
                .setRequired(false);
        }),
    async execute(interaction) {
        // Generate a random IQ score between 50 and 180 for variety
        const fakeIQ = Math.floor(Math.random() * (180 - 50 + 1)) + 50;
        
        // Get the input name, if provided
        const name = interaction.options.getString('name');
        
        // Decide whether to use the provided name or the user's username
        const displayName = name || interaction.user.username;
        
        await interaction.reply(`IQ Of **${displayName}** is **${fakeIQ}** today.`);
    },
};
