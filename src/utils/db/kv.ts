import { LocaleNames } from "@framework/mod.ts";

class Guild {
  public language: LocaleNames = "en";
}

/**
 * Db client for tapris using Deno KV
 */
export class TaprisDbClient {
  private kv!: Deno.Kv;

  /**
   * Open Deno KV connection
   */
  public async connect(): Promise<TaprisDbClient> {
    this.kv = await Deno.openKv();

    return this;
  }

  /**
   * Get guild info from db by id
   * @param id Id of discord guild
   */
  public async getGuild(id: string): Promise<Guild | null> {
    return (await this.kv.get<Guild>(["guilds", id])).value;
  }

  /**
   * Get guild info from db by id
   * @param id Id of discord guild
   */
  public async getGuildLanguage(id?: string): Promise<LocaleNames> {
    if (!id) return "en";

    const guild = (await this.kv.get<Guild>(["guilds", id])).value;

    return guild ? guild.language : "en";
  }

  /**
   * Select one of locales, depending on locale in guild
   * @param locale Locales, to chose from
   * @param id Id of guild, if not presented, return en
   */
  public async selectLocale<T = unknown>(
    locale: Record<LocaleNames, T> | undefined,
    id?: string,
  ): Promise<T> {
    if (!locale) return undefined as T;

    return locale[await this.getGuildLanguage(id)];
  }

  /**
   * Select language for a guild
   * @param id Id of guild to change language
   * @param locale Language to set
   */
  public async setGuildLanguage(
    id: string,
    language: LocaleNames,
  ): Promise<LocaleNames> {
    const guild = (await this.kv.get<Guild>(["guilds", id])).value;
    guild!.language = language;
    await this.kv.set(["guilds", id], guild);

    return language;
  }

  /**
   * Inserts new guild into db
   * @param id Id of new guild
   */
  public async registerGuild(id: string): Promise<TaprisDbClient> {
    await this.kv.set(["guilds", id], new Guild());

    return this;
  }

  /**
   * Removes guild from db
   * @param id Id of guild to remove
   */
  public async removeGuild(id: string): Promise<TaprisDbClient> {
    await this.kv.delete(["guilds", id]);

    return this;
  }
}
