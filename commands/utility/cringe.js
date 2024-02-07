const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cringe')
        .setDescription('Replies with a fake cringe test result!')
        .addStringOption(function(option) {
            return option.setName('name')
                .setDescription('The name to get an cringe score for')
                .setRequired(false);
        }),
    async execute(interaction) {
        // Generate a random IQ score between 50 and 180 for variety
        const cringeF = Math.floor(Math.random() * (101));

        // Get the input name, if provided
        const name = interaction.options.getString('name');
        
        // Decide whether to use the provided name or the user's username
        const displayName = name || interaction.user.username;
        
        await interaction.reply(`Cringe Of **${displayName}** is **${cringeF}%** today.`);
    },
};