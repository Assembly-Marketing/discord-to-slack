# Discord to Slack

This is a fairly simple Discord bot that listens in a specific Discord channel for new messages and passes them to a specific Slack channel via a webhook URL

### Install

```
yarn install
```

## Config

### Slack Config

`Follow the [directions from Slack](https://api.slack.com/messaging/webhooks) to create a Slack bot and get a webhook URL

Set the in `.env` in `SLACK_WEBHOOK_URL`

### Discord Bot

Create a new Discord Bot in the [developer portal](https://discord.com/developers/applications)

Once the bot is created go to the Bot tab on the sidebar and turn on the **Message Content Intent** and **Server Members Intent**

On the same page you'll see the Reset Token button. Click it and get the token that you'll put in to `.env` as `DISCORD_TOKEN`

You're now ready to install the bot in to your Discord server!

Go to the General Information tab and grab the Application ID

The only permissions you need are

- Read Message History
- Add Reactions

Which comes out to permission integer 65600

Install the app via https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=65600

### Discord Channel ID

The bot is programmed to listen to a specific channel so get the ID following the directions [here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).

Take the channel ID and put it in `.env` as `DISCORD_CHANNEL_ID`

### User ID to Track

This was useful for me since I only wanted to really filter on a specific user (really a webhook's posts) so get a user ID you want to track and put it in `USER_ID_TO_TRACK`
