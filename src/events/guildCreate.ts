import { EventBuilder } from "@builders/mod.ts";
import ExtendedClient from "@core";
import { Embed, Guild } from "harmony/mod.ts";

const event = new EventBuilder().setName("guildCreate").setRun(
  async (client: ExtendedClient, guild: Guild) => {
    await client.db.registerGuild(guild.id);
    await client.updatePresence();

    if (!guild.systemChannelID || !client.user) return;
    const channel = await client.channels.get(guild.systemChannelID);
    if (!channel?.isText() || !channel) return;

    const embed = new Embed()
      .setColor(client.botColor)
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
);

export default event;
