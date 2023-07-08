"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client) => {
    client.on("message", async (message) => {
        if (message.channel.id !== process.env.DISCORD_CHANNEL_ID) {
            return;
        }
        const axiomUserID = "1126974183738462280";
        if (message.author.id === axiomUserID) {
            const content = message.content;
            console.log(message);
            await fetch(process.env.SLACK_WEBHOOK_URL, {
                method: "POST",
                body: JSON.stringify({
                    text: message.author.username + ": " + content,
                }),
            });
        }
    });
};
