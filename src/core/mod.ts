import { CommandsCollection, commands } from "@commands/mod.ts";
import { ComponentsCollection, components } from "@components/mod.ts";
import { EventsCollection, events } from "@events/mod.ts";
import { TaprisCommand, TaprisComponent, TaprisEvent } from "@framework/mod.ts";
import { Api, TaprisDbClient, env } from "@utils/mod.ts";
import { Client, Collection, GatewayIntents } from "harmony/mod.ts";
import { serve } from "std/http/server.ts";

export class TaprisClient extends Client {
  public commands: Collection<string, TaprisCommand>;
  public components = new Collection<RegExp, TaprisComponent>();
  public events = new Collection<string, TaprisEvent>();
  public botColor = env.BOT_COLOR;
  public db = new TaprisDbClient({
    hostname: env.DATABASE_HOSTNAME,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE,
    port: env.DATABASE_PORT,
  });
  public authorId = env.AUTHOR_ID;

  constructor() {
    super();

    this.commands = new CommandsCollection(commands as TaprisCommand[]);
    this.components = new ComponentsCollection(components);
    this.events = new EventsCollection(events);
  }

  public async start() {
    await this.db
      .sync()
      .catch(() => console.warn("Error creating tables for database!"));
    await this.db
      .connect()
      .catch(() => console.warn("Failed to connect to database using TCP!"));

    await this.connect(env.BOT_TOKEN, [
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILDS,
      GatewayIntents.GUILD_MESSAGES,
      GatewayIntents.GUILD_MEMBERS,
      GatewayIntents.GUILD_VOICE_STATES,
      GatewayIntents.GUILD_PRESENCES,
    ]);

    await serve(new Api(this).fetch, {
      port: Number(env.SERVER_PORT),
    });
  }

  public async getGuildsAmount(): Promise<number> {
    return await this.guilds.size();
  }

  public async updatePresence() {
    const guildsAmount = await this.getGuildsAmount();

    this.setPresence({
      name: `Serving ${guildsAmount} guild${guildsAmount != 1 ? "s" : ""}!`,
      type: 0,
    });
  }
}
