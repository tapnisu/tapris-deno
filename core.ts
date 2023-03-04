import GetCommands from "@commands/mod.ts";
import GetComponents from "@components/mod.ts";
import GetEvents from "@events/mod.ts";
import { Command, Component, Event } from "@interfaces/mod.ts";
import env from "@utils/config.ts";
import DBManagerBuilder from "@utils/db.ts";
import server from "@utils/server.ts";
import { Client, Collection, GatewayIntents } from "harmony/mod.ts";
import { serve } from "std/http/server.ts";

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public components: Collection<RegExp, Component> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public env = env;
  public db = new DBManagerBuilder(
    {
      hostname: env.DATABASE_HOSTNAME,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE,
    },
  );

  public async init() {
    GetCommands(this);
    GetEvents(this);
    GetComponents(this);

    this.db.connect().catch((e) => console.warn(e));
    this.db.sync().catch((e) => console.warn(e));

    await this.connect(this.env.BOT_TOKEN, [
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILDS,
      GatewayIntents.GUILD_MESSAGES,
      GatewayIntents.GUILD_MEMBERS,
      GatewayIntents.GUILD_VOICE_STATES,
      GatewayIntents.GUILD_PRESENCES,
    ]);

    await serve(new server(this.commands).fetch, {
      port: Number(env.SERVER_PORT),
    });
  }
}

export default ExtendedClient;
