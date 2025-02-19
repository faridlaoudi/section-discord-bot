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
            const { "": name, "Moyenne du Semestre 3": moyenneSemestre, 
            "Algèbre 3": ALGEBRE,
            "Programmation orientée objet 1": POO,
            "Structures de fichiers et structure de données": SFSD,
            'Algorithmique  et complexité': ALGO,
            "Analyse mathématique 3": ANALYSE3,
            "Architecture  des ordinateurs 2": ARCHI,
            "Probabilités et statistiques 2": PROBA,
            "Entreprenariat": Entreprenariat } = user;

            // Check if the student passed or failed
            const deliberation = parseFloat(moyenneSemestre) >= 10 ? 'Admis' : 'ajourne';

            await interaction.reply(`Deliberation for ${name}:\nMoyenne du Semestre: ${moyenneSemestre}\nDeliberation: ${deliberation}\nAlgèbre 3: ${ALGEBRE}\nALGO: ${ALGO}\nANALYSE: ${ANALYSE3}\nPROBA: ${PROBA}\nArchi: ${ARCHI}\nSFSD: ${SFSD}\nEntreprenariat: ${Entreprenariat}\nPOO: ${POO}`);
            
        } else {
            await interaction.reply('No user found with that Matricule.');
        }
    },
};
