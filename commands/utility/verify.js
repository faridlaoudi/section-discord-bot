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
		const roles = [
			{
				id: '1204759038026579980',
				label: 'Section'
			},
			{
				id: '1204891940718387210',
				label: 'Group 1'
			},
			{
				id: '1204892557083942963',
				label: 'Group 2'
			},
			{
				id: '1204892660012285973',
				label: 'Group 3'
			},
			{
				id: '1204893178251976725',
				label: 'Group 4'
			}
		];

        if (userIndex !== -1) {
            const user = userData[userIndex];
            // Check if Username is already filled
            if (user.Username !== "") {
                await interaction.reply('This matricule is already taken.');
            } else {
                user.Username = interaction.user.username;
                const userInfo = `Welcome ${user.Nom} ${user.Prénom} dans Section: ${user.Section} et Groupe: ${user.Groupe}`;
                await interaction.reply(`${userInfo}`);
				const member = await interaction.guild.members.fetch(interaction.user.id);
				const sectionRoleId = '1204759038026579980'; // ID for 'Section A' role
				const groupRoleId = roles.find(role => role.label === `Group ${user.Groupe}`)?.id;
				if (sectionRoleId) await member.roles.add(sectionRoleId);
				if (groupRoleId) await member.roles.add(groupRoleId);
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
