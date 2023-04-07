import TaprisClient from "@core";
import { TaprisEvent } from "@framework/mod.ts";

const event = new TaprisEvent()
  .setName("ready")
  .setRun(async (client: TaprisClient) => {
    await client.updatePresence();

    (await client.guilds.array()).forEach(async (guild) => {
      if (!(await client.db.getGuild(guild.id))) {
        await client.db.registerGuild(guild.id);
      }
    });

    const commands = client.interactions.commands;

    client.commands.forEach((command) => commands.create(command));

    console.info(`${client.user?.tag} is up!`);
  });

export default event;
