const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Replies with the verification options!')
        .addStringOption(option =>
            option.setName('matricule')
                .setDescription('The matricule to check')
                .setRequired(true)),
    async execute(interaction) {
        const filePath = path.join(__dirname, '../../students.json');
        let userData;
        try {
            userData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (error) {
            console.error('Error reading the students.json file:', error);
            await interaction.reply('Failed to read student data. Please try again later.');
            return;
        }

        const matriculeInput = interaction.options.getString('matricule').trim();
        const userIndex = userData.findIndex(u => String(u.matricule) === matriculeInput);

        if (userIndex !== -1) {
            const user = userData[userIndex];
            // Check if Username is already filled
            if (user.Username !== "") {
                // Username is already set and does not match the current user's username
                await interaction.reply('This matricule is already taken.');
            } else {
                // Username is not set or matches the current user's username, proceed with update
                user.Username = interaction.user.username;
                const userInfo = `Welcome ${user.Nom} ${user.Prénom} dans Section: ${user.Section} et Groupe: ${user.Groupe}`;
                await interaction.reply(`${userInfo}`);
                try {
                    // Save the updated userData array back to the file
                    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), 'utf-8');
                } catch (error) {
                    console.error('Error writing to the students.json file:', error);
                    await interaction.reply('Failed to update student data. Please try again later.');
                }
            }
        } else {
            await interaction.reply('No user found with that Matricule.');
        }
    },
};
