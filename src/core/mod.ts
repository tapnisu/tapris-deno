import { CommandsCollection } from "@commands/mod.ts";
import { ComponentsCollection } from "@components/mod.ts";
import { EventsCollection } from "@events/mod.ts";
import { TaprisCommand, TaprisComponent, TaprisEvent } from "@framework/mod.ts";
import { Env, TaprisDbClient } from "@utils/mod.ts";
import { Client, Collection, GatewayIntents } from "harmony/mod.ts";

export class TaprisClient extends Client {
  public commands: Collection<string, TaprisCommand>;
  public components: Collection<RegExp, TaprisComponent>;
  public events: Collection<string, TaprisEvent>;

  public botColor: string;
  public db: TaprisDbClient;
  public authorId: string;

  constructor(
    env: Env,
    commands: TaprisCommand[],
    events: TaprisEvent[],
    components: TaprisComponent[]
  ) {
    super();

    this.commands = new CommandsCollection(commands);
    this.components = new ComponentsCollection(components);
    this.events = new EventsCollection(events);

    this.botColor = env.BOT_COLOR;
    this.authorId = env.AUTHOR_ID;

    this.token = env.BOT_TOKEN;

    this.events.array().forEach((event) =>
      // deno-lint-ignore no-explicit-any
      this.on(event.name, event.run.bind(null, this) as any)
    );

    this.db = new TaprisDbClient();
  }

  /**
   * Start bot
   */
  public async start() {
    await this.db.connect();

    await this.connect(this.token, [
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILDS,
      GatewayIntents.GUILD_MESSAGES,
      GatewayIntents.GUILD_MEMBERS,
      GatewayIntents.GUILD_VOICE_STATES,
      GatewayIntents.GUILD_PRESENCES,
    ]);
  }

  /**
   * Get amount of guilds
   * @returns Size of guild
   */
  public async getGuildsAmount(): Promise<number> {
    return await this.guilds.size();
  }

  /**
   * Updates presence
   */
  public async updatePresence() {
    const guildsAmount = await this.getGuildsAmount();

    this.setPresence({
      name: `Serving ${guildsAmount} guild${guildsAmount != 1 ? "s" : ""}!`,
      type: 0,
    });
  }
}
