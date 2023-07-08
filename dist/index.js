"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const message_1 = tslib_1.__importDefault(require("./listeners/message"));
const ready_1 = tslib_1.__importDefault(require("./listeners/ready"));
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
(0, ready_1.default)(client);
(0, message_1.default)(client);
client.login(process.env.DISCORD_TOKEN);
