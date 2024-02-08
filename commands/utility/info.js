const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Provides user information.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get information for')
                .setRequired(true)),
    async execute(interaction) {
        // Correctly retrieve the user object
        const user = interaction.options.getUser('user');

        if (!user) {
            console.log('No user found in the command option.'); // For debugging
            await interaction.reply({ content: 'Error: No user was found.', ephemeral: true });
            return;
        }

        // Example reply, showing the user's username
        await interaction.reply(`User information for: ${user.username}`);
    },
};
