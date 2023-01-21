import ExtendedClient from "@core";
import { Event } from "@types";
import { Guild } from "harmony";

const event: Event = {
  name: "guildCreate",
  run: async (client: ExtendedClient, guild: Guild) => {
    await client.db.removeGuild(guild.id);
  },
};

export default event;
