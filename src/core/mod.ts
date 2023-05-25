import { getCommands } from "@commands/mod.ts";
import { getComponents } from "@components/mod.ts";
import { getEvents } from "@events/mod.ts";
import { TaprisCommand, TaprisComponent, TaprisEvent } from "@framework/mod.ts";
import api from "@utils/api.ts";
import { env } from "@utils/config.ts";
import TaprisDBManager from "@utils/db.ts";
import { Client, Collection, GatewayIntents } from "harmony/mod.ts";
import { serve } from "std/http/server.ts";

export class TaprisClient extends Client {
  public commands = new Collection<string, TaprisCommand>();
  public components = new Collection<RegExp, TaprisComponent>();
  public events = new Collection<string, TaprisEvent>();
  public botColor = env.BOT_COLOR;
  public db = new TaprisDBManager();
  public authorId = env.AUTHOR_ID;

  public async init() {
    getCommands(this);
    getEvents(this);
    getComponents(this);

    await this.db.connect();

    await this.connect(env.BOT_TOKEN, [
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILDS,
      GatewayIntents.GUILD_MESSAGES,
      GatewayIntents.GUILD_MEMBERS,
      GatewayIntents.GUILD_VOICE_STATES,
      GatewayIntents.GUILD_PRESENCES,
    ]);

    await serve(new api(this).fetch, {
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
