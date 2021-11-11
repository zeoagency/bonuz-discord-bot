const { Client, Intents, MessageMentions } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const axios = require('axios').default;
const config = require("./config");
client.once('ready', () => {
	console.log('Ready!');
});

const mapGuildMember = gm => new Object({ displayName: gm.displayName, id: gm.id, rawReplace: `<@!${gm.id}>` });
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;

	if (commandName === 'bonuz') {


		const message = interaction.options.getString('message', true);
		if (message) {
			const regex = MessageMentions.USERS_PATTERN;
			let mentioned = message.match(regex);
			if (mentioned) {
				const ids = mentioned.map(match => match.replace(/[<@!>]/g, ''));
				const sender = mapGuildMember(interaction.user);
				const list = await interaction.guild.members.list({ limit: 1000 });
				const recievers = list.filter((member) => ids.includes(member.id)).map(mapGuildMember);
				const requestData = {
					sender,
					message,
					recievers,
				}

				try {

					const res = await axios.post(config.bonuz_app_url + '/bots/discord', requestData, {
						headers: {
							"DiscordSecret": config.discord_secret
						}
					});
					const url = res.data;
					await interaction.reply({ content: "Bonuz transaction successful.", ephemeral: true });
				}
				catch (err) {
					if (!err?.response?.data) {
						console.log(err);
					}
					await interaction.reply({ content: err?.response?.data || 'something went wrong', ephemeral: true });
				}

				return;
			}
			await interaction.reply({ content: 'You should mention someone to give bonuz. Example: @john +20 thanks', ephemeral: true });



		}



	}

	else if (commandName === 'bonuzlink') {


		const email = interaction.options.getString('email', true);
		if (email) {
			const sender = mapGuildMember(interaction.user);
			try {
				const requestData = {
					sender,
					email,
				}
				const res = await axios.post(config.bonuz_app_url + '/bots/discord/link', requestData, {
					headers: {
						"DiscordSecret": config.discord_secret
					}
				});
				await interaction.reply({ content: "Your discord account is now linked to " + email + ".", ephemeral: true });
			}
			catch (err) {
				if (!err?.response?.data) {
					console.log(err);
				}
				await interaction.reply({ content: err?.response?.data || 'something went wrong', ephemeral: true });
			}
			return;
		}



	}
});



client.login(config.token);
