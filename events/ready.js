const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute: async (client) => {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        const guild = await client.guilds.cache.get('1023000016383647824'); // Ensure this is your guild ID
        const members = await guild.members.fetch();
        
        // Assuming these find operations successfully retrieve the role IDs
        const sectionARoleId = '1204759038026579980';
        const gariciRoleId = guild.roles.cache.find(role => role.name === 'Garici lover')?.id;

        members.forEach(member => {
            // Check if the member does not have the Section role AND does not already have the Garici lover role
            if (!member.roles.cache.has(sectionARoleId) && !member.roles.cache.has(gariciRoleId)) {
                member.roles.add(gariciRoleId)
                    .then(() => console.log(`Added Garici lover role to ${member.user.tag}.`))
                    .catch(console.error);
            }
        });
		members.forEach(member => {
            // Check if the member does not have the Section role AND does not already have the Garici lover role
            if (member.roles.cache.has(sectionARoleId) && member.roles.cache.has(gariciRoleId)) {
                member.roles.remove(gariciRoleId)
                    .then(() => console.log(`removed Garici lover role to ${member.user.tag}.`))
                    .catch(console.error);
            }
        });
        console.log(`Completed`);
    }
};
