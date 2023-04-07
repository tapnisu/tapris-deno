import Client from "@core";
import { EventBuilder } from "@framework/mod.ts";
import { Guild } from "harmony/mod.ts";

const event = new EventBuilder().setName("guildDelete").setRun(
  async (client: Client, guild: Guild) => {
    await client.db.removeGuild(guild.id);
    await client.updatePresence();
  },
);

export default event;
