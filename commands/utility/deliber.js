const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deliberation')
        .setDescription('Checks deliberation based on matricule.')
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
            const { "": name, "Moyenne du Semestre": moyenneSemestre, 
            "ALGEBRE": ALGEBRE,
            "POO": POO,
            "SFSD": SFSD,
            "ALGO": ALGO,
            "ANALYSE3": ANALYSE3,
            "ARCHI": ARCHI,
            "PROBA": PROBA,
            "Entreprenariat": Entreprenariat } = user;

            // Check if the student passed or failed
            const deliberation = parseFloat(moyenneSemestre) >= 10 ? 'Admis' : 'ajourne';

            await interaction.reply(`Deliberation for ${name}:\nMoyenne du Semestre: ${moyenneSemestre}\nDeliberation: ${deliberation}\nAlgèbre 3: ${ALGEBRE}\nALGO: ${ALGO}\nANALYSE: ${ANALYSE3}\nPROBA: ${PROBA}\nArchi: ${ARCHI}\nSFSD: ${SFSD}\nEntreprenariat: ${Entreprenariat}\nPOO: ${POO}`);
            
        } else {
            await interaction.reply('No user found with that Matricule.');
        }
    },
};
