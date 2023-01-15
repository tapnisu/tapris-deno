import { Event } from "@types";
import { Embed, Guild } from "harmony";
import ExtendedClient from "../core.ts";

const event: Event = {
  name: "guildCreate",
  run: async (client: ExtendedClient, guild: Guild) => {
    console.log(`Joined ${guild.name} guild!`);

    if (!guild.systemChannelID || !client.user) return;
    const channel = await client.channels.get(guild.systemChannelID);
    if (!channel?.isText() || !channel) return;

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle(client.user.username)
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `Type "/" to check bot commands!
        https://github.com/tapris-bot/tapris.`,
      );

    return channel.send({
      embeds: [embed],
    });
  },
};

export default event;
