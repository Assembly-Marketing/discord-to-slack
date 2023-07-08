import { Client } from "discord.js";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    const channel = client.channels.fetch(
      process.env.DISCORD_CHANNEL_ID as string
    );
    if (!channel) {
      console.log(
        `Error: No Discord channels with ID ${process.env.DISCORD_CHANNEL_ID} found.`
      );
      return;
    }

    console.log("Discord connected");
  });
};
