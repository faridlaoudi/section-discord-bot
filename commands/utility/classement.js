const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('classement')
        .setDescription('Checks classement based on matricule.')
        .addStringOption(option =>
            option.setName('matricule')
                .setDescription('The matricule to check')
                .setRequired(true)),
    async execute(interaction) {
        // Adjust the path to the location of your students.json file
        const filePath = path.join(__dirname, '../../deliberation.json');
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
            // Extract relevant information from the user object
            const { "": name, "Moyenne du Semestre 3": moyenneSemestre, 
            "classement S3": classement } = user;

            await interaction.reply(`classement of ${name}:\nMoyenne du Semestre 3: ${moyenneSemestre}\nclassement: ${classement}`);
            
        } else {
            await interaction.reply('No user found with that Matricule.');
        }
    },
};
