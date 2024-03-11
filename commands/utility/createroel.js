/*const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('crt') 
      .setDescription('Create Team Roles (1-41)') 
      .addIntegerOption(option =>
          option.setName('number')
              .setDescription('The number of teams to create (1-41)')
              .setRequired(true)
              .setMinValue(1) 
              .setMaxValue(41)),
  async execute(interaction) {
    const numTeams = interaction.options.getInteger('number'); 

    for (let i = 1; i <= numTeams; i++) {
      const newRoleName = `Team${i}`;
      const newRole = await interaction.guild.roles.create({
        name: newRoleName,
        permissions: [],
      });
    }

    await interaction.reply(`Successfully created ${numTeams} Team roles.`);
  },
};
*/