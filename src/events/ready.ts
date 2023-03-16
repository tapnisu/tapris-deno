import { EventBuilder } from "@builders/mod.ts";
import Client from "@core";

const event = new EventBuilder().setName("ready").setRun(
  async (client: Client) => {
    await client.updatePresence();

    (await client.guilds.array()).forEach(async (guild) => {
      if (!await client.db.getGuild(guild.id)) {
        await client.db.registerGuild(guild.id);
      }
    });

    const commands = client.interactions.commands;

    client.commands.forEach((command) => commands.create(command));

    console.info(
      `${client.user?.tag} is up!`,
    );
  },
);

export default event;
