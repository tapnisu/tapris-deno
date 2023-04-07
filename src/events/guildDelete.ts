import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";
import { Guild } from "harmony/mod.ts";

const event = new TaprisEvent()
  .setName("guildDelete")
  .setRun(async (client: TaprisClient, guild: Guild) => {
    await client.db.removeGuild(guild.id);
    await client.updatePresence();
  });

export default event;
