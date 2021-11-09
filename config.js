require("dotenv").config();

module.exports = {
	token: process.env.TOKEN,
	bot_id: process.env.BOT_ID,
	guild_id: process.env.GUILD_ID,
	discord_secret: process.env.DISCORD_SECRET,
	bonuz_app_url: process.env.BONUZ_APP_URL
};
