import ExtendedClient from "@core";
import { Event } from "@typings/mod.ts";
import { Guild } from "harmony/mod.ts";

const event: Event = {
  name: "guildDelete",
  run: async (client: ExtendedClient, guild: Guild) => {
    await client.db.removeGuild(guild.id);
    await client.updatePresence();
  },
};

export default event;
