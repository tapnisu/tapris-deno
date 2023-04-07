import Client from "@core";
import { EventBuilder } from "@framework/mod.ts";

const event = new EventBuilder().setName("reconnect").setRun(
  async (client: Client) => {
    await client.updatePresence();

    (await client.guilds.array()).forEach(async (guild) => {
      if (!await client.db.getGuild(guild.id)) {
        await client.db.registerGuild(guild.id);
      }
    });

    console.info(
      `${client.user?.tag} is reconnected!`,
    );
  },
);

export default event;
