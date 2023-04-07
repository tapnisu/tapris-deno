import Client from "@core";
import { TaprisEvent } from "@framework/mod.ts";
import { Guild } from "harmony/mod.ts";

const event = new TaprisEvent()
  .setName("guildDelete")
  .setRun(async (client: Client, guild: Guild) => {
    await client.db.removeGuild(guild.id);
    await client.updatePresence();
  });

export default event;
