import { Client, Events } from "discord.js";
import axios from "axios";

export default (client: Client): void => {
  client.on(Events.MessageCreate, async (message) => {
    console.log(message);
    if (message.channelId !== process.env.DISCORD_CHANNEL_ID) {
      return;
    }

    // This UserID we know always shares embed so we'll forward the embed to Slack
    if (message.author.id === process.env.USER_ID_TO_TRACK) {
      const { content, embeds } = message;
      console.log(message);

      try {
        if (embeds.length > 0) {
          const embed = embeds[0];

          const title = embed.title;

          const blocks = [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: title,
                emoji: true,
              },
            },
            {
              type: "divider",
            },
            ...embed.fields
              .map((field) => {
                return [
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: field.name,
                    },
                  },
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: field.value,
                    },
                  },
                ];
              })
              .flat(),
          ];

          await axios.post(process.env.SLACK_WEBHOOK_URL as string, {
            // Unfortunate hack to get around Slack not showing a notification
            // preview if the message only has attachments
            text: `${title} <!everyone>`,
            attachments: [
              {
                color: title?.includes("Triggered") ? "#FF5C74" : "#48970B",
                blocks,
              },
            ],
          });
        } else {
          await axios.post(process.env.SLACK_WEBHOOK_URL as string, {
            text: `@${message.author.username}: ${content}`,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      await axios.post(process.env.SLACK_WEBHOOK_URL as string, {
        text: `@${message.author.username}: ${message.content}`,
      });
    }
  });
};
