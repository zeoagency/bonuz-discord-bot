# Bonuz Discord Bot - A discord bot to give gifts on discord with bonuz.

## Requirements
* Docker
* Docker Compose
## Requirements(without Docker)
* Node 16
## Installation
#### Create compose file
Copy docker-compose.prod.yml as docker-compose.yml.
#### Setting Up Environments
Open up your docker-compose.yml, you will see some environment options;
```yml
# Your discord application's access token
TOKEN: "example.access.token"
# User id of the invited bot
BOT_ID: "000000000000000000"
# Discord server id that the bot joined
GUILD_ID: "000000000000000000"
# Bonuz discord secret
DISCORD_SECRET: "iamasecret"
# Your bonuz app's base url
BONUZ_APP_URL: "https://example.com"
```
#### Boot it up
Give it a go.
```bash
docker-compose up
```
#### Deploy Discord commands
To add /bonuz command into your discord server you need to inject the command.

```bash
docker-compose exec app /bin/bash
npm run deploy
# cleared global commands
# Successfully registered application commands.
exit
```