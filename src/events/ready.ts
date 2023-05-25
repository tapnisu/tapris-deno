import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";

export default new TaprisEvent<"ready">()
  .setName("ready")
  .setRun(async (client: TaprisClient) => {
    await client.updatePresence();

    (await client.guilds.array())
      .filter(async (guild) => !(await client.db.getGuild(guild.id)))
      .forEach(async (guild) => await client.db.registerGuild(guild.id));

    await client.interactions.commands.bulkEdit(
      client.commands.array().map((command) => command.json())
    );

    console.info(`${client.user!.tag} is up!`);
  });
