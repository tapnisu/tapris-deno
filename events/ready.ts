import ExtendedClient from "@core";
import { Event } from "@interfaces/mod.ts";

const event: Event = {
  name: "ready",
  run: async (client: ExtendedClient) => {
    client.setPresence({ name: "Type '/' to check bot commands!", type: 0 });

    (await client.guilds.array()).forEach(async (guild) => {
      if (!await client.db.getGuild(guild.id)) {
        // await client.db.registerGuild(guild.id);
      }
    });

    const commands = client.interactions.commands;

    client.commands.forEach((command) => commands.create(command));

    console.info(
      `${client.user?.tag} is up!`,
    );
  },
};

export default event;
