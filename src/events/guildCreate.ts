import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";
import { Embed, Guild } from "harmony/mod.ts";

export default new TaprisEvent<"guildCreate">()
  .setName("guildCreate")
  .setRun(async (client: TaprisClient, guild: Guild) => {
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
  });
