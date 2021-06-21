//https://www.youtube.com/watch?v=BmKXBVdEV0g

require('dotenv').config();
const { Client } = require('discord.js');

const client = new Client();
const PREFIX = '$';

client.on('ready', () => {
  console.log(`${client.user.username} has logged in.`);
});

client.on('message', (message) => {
  console.log(`[${message.author.tag}]: ${message.content} `);
  if (message.author.bot) return; //alternativa para não entrar no loop infinito(ver abaixo)
  if (message.content === 'hello') {
    message.reply('hello there'); //se a resposta for igual, entra em loop infinito
  }
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply("You don't have kicking permissions.");

      if (args.length === 0) return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]); //guild é o server
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} will be kicked`))
          .catch((err) => message.channel.send('No permission.'));
      } else {
        message.channel.send('Member not found.');
      }
      message.channel.send(`I will kick ${args}`);
    }

    if (CMD_NAME === 'ban') {
      message.channel.send(`I will ban ${args}`);
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === 'message.id') {
    switch (name) {
      case '🍎':
        member.roles.add('7332154621354');
        break;
      case '🍌':
        member.roles.add('7332154621354');
        break;
      case '🍇':
        member.roles.add('7332154621354');
        break;
      case '🍑':
        member.roles.add('7332154621354');
        break;
    }
  }
});

client.login(process.env.TOKEN);
