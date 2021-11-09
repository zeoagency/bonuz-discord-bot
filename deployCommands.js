const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot_id, token, guild_id } = require('./config.js');

const commands = [
    new SlashCommandBuilder().setName('bonuz').setDescription('Give bonuz to someone.').addStringOption(option => {
        return option.setName('message').setDescription('Bonuz message.\nExample: +20 @john @marry thanks for helping.').setRequired(true);
    }),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(bot_id, guild_id), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
rest.put(Routes.applicationCommands(bot_id), { body: [] }).then(() => console.log('cleared global commands'));