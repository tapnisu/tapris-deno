import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";

const event = new TaprisEvent()
  .setName("reconnect")
  .setRun(async (client: TaprisClient) => {
    await client.updatePresence();

    (await client.guilds.array()).forEach(async (guild) => {
      if (!(await client.db.getGuild(guild.id))) {
        await client.db.registerGuild(guild.id);
      }
    });

    console.info(`${client.user?.tag} is reconnected!`);
  });

export default event;
