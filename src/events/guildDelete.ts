import { EventBuilder } from "@builders/mod.ts";
import ExtendedClient from "@core";
import { Guild } from "harmony/mod.ts";

const event = new EventBuilder().setName("guildDelete").setRun(
  async (client: ExtendedClient, guild: Guild) => {
    await client.db.removeGuild(guild.id);
    await client.updatePresence();
  },
);

export default event;
