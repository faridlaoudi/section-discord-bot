const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Replies with the verification options!'),
	async execute(interaction) {
		await interaction.reply('Please enter you **MATRICULE** to get the FULL ACCES!');
	},
};