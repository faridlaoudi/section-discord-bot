const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkmatricule')
        .setDescription('Checks a matricule and provides user information.')
        .addStringOption(option => 
            option.setName('matricule')
            .setDescription('The matricule to check')
            .setRequired(true)),
    async execute(interaction) {
        // Adjust the path to the location of your students.json file
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
        const user = userData.find(u => String(u.matricule) === matriculeInput);

        if (user) {
            const userInfo = `Name: ${user.Nom}\nPrénom: ${user.Prénom}\nSpeciality: ${user.Palier}\nSection: ${user.Section}\nGroupe: ${user.Groupe}`;
            await interaction.reply(`User information:\n${userInfo}`);
        } else {
            await interaction.reply('No user found with that Matricule.');
        }
    },
};
