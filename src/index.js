const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client({
  ws: {
    intents: ['GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILDS']
  }
});

client.once('ready', () => {
  console.log('Bot is ready.');
});

client.login(config.token);

client.on('guildMemberAdd', async (member) => {
  console.log(member.displayName);

  const patterns = config.patterns;

  for (const pattern of patterns) {
    if (
      member.displayName.toLowerCase().includes(pattern) ||
      member.nickname.toLowerCase().includes(pattern)
    ) {
      await member.ban();

      const logsChannel = client.channels.cache.get(config.logsChannelId);

      await logsChannel.send(
        `Member ${member.displayName} (id: \`${member.id}\`) has been banned because their ID matched the pattern \`${pattern}\`.`
      );
    }
  }
});
