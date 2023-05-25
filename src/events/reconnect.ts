import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";

export default new TaprisEvent()
  .setName("reconnect")
  .setRun(async (client: TaprisClient) => {
    await client.updatePresence();

    (await client.guilds.array())
      .filter(async (guild) => !(await client.db.getGuild(guild.id)))
      .forEach(async (guild) => await client.db.registerGuild(guild.id));

    console.info(`${client.user?.tag} is reconnected!`);
  });
