const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('project')
        .setDescription('get project role')
        .addStringOption(option =>
            option.setName('matricule')
                .setDescription('The matricule to check')
                .setRequired(true)),
    async execute(interaction) {
        const filePath = path.join(__dirname, '../../projetaff.json');
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
		const roles = [
			{
				id: '1216752681234989157',
				label: 'Project1'
			},
			{
				id: '1216752851645104229',
				label: 'Project2'
			},
			{
				id: '1216752928094945453',
				label: 'Project3'
			},
			{
				id: '1216752963419373588',
				label: 'Project4'
			},
            {
				id: '1216752996885467176',
				label: 'Project5'
			},
			{
				id: '1216753031643664444',
				label: 'Project6'
			},
            {
				id: '1216753076921172170',
				label: 'Project7'
			},
			{
				id: '1216753120265371718',
				label: 'Project8'
			},
            {
				id: '1216753149763784825',
				label: 'Project9'
			},
			{
				id: '1216753185205522593',
				label: 'Project10'
			},
		];

        if (userIndex !== -1) {
            const user = userData[userIndex];
            // Check if Username is already filled
            if (user.Username !== "") {
                await interaction.reply('This matricule is already taken.');
            } else {
                user.Username = interaction.user.username;
                const userInfo = `Welcome dans Projet: ${user.Projet} et Groupe: ${user.Groupe}`;
                await interaction.reply(`${userInfo}`);
				const member = await interaction.guild.members.fetch(interaction.user.id);
				const projectRoleId = roles.find(role => role.label === `Project${user.Projet}`)?.id;
                const teamRoleId = interaction.guild.roles.cache.map(role => 
                    role.name === `Team${user.Groupe}` ? role.id : null
                  ).find(roleId => roleId !== null);                  
				if (projectRoleId) await member.roles.add(projectRoleId);
                if (teamRoleId) await member.roles.add(teamRoleId);
                try {
                    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), 'utf-8');
                    // Assign roles based on section and group
                } catch (error) {
                    console.error('Error writing to the students.json file or assigning roles:', error);
                    await interaction.reply('Failed to update student data or assign roles. Please try again later.');
                }
            }
        } else {
            await interaction.reply('No user found with that Matricule.');
        }
    },
};
