import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";

export default new TaprisEvent()
  .setName("ready")
  .setRun(async (client: TaprisClient) => {
    await client.updatePresence();

    (await client.guilds.array()).forEach(async (guild) => {
      if (!(await client.db.getGuild(guild.id)))
        await client.db.registerGuild(guild.id);
    });

    client.commands.forEach(
      async (command) => await client.interactions.commands.create(command)
    );

    console.info(`${client.user!.tag} is up!`);
  });
