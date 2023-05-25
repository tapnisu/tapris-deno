import { LocaleNames } from "@framework/mod.ts";
import { Client as PostgresClient } from "postgres/mod.ts";

interface Guild {
  id: string;
  language: LocaleNames;
  russianRouletteBeforeDeath: number;
}

/**
 * Db client for tapris using postgres
 */
export class TaprisDbClient extends PostgresClient {
  /**
   * Create default tables
   */
  public async sync(): Promise<TaprisDbClient> {
    await this.queryObject(
      `CREATE TABLE "Guilds" (
        id text,
        language text DEFAULT 'en' NOT NULL,
        russian_roulette_before_death int4 DEFAULT 0 NOT NULL
      );`
    );

    return this;
  }

  /**
   * Get guild info from db by id
   * @param id Id of discord guild
   */
  public async getGuild(id: string): Promise<Guild> {
    const guildResponse = await this.queryObject<Guild>(
      `select * from "Guilds" where id = '${id}';`
    );

    return guildResponse.rows[0];
  }

  /**
   * Get guild info from db by id
   * @param id Id of discord guild
   */
  public async getGuildLanguage(id?: string): Promise<LocaleNames> {
    if (!id) return "en";

    const guildResponse = await this.queryObject<Pick<Guild, "language">>(
      `select language from "Guilds" where id = '${id}';`
    );

    return guildResponse.rows.length ? guildResponse.rows[0].language : "en";
  }

  /**
   * Select one of locales, depending on locale in guild
   * @param locale Locales, to chose from
   * @param id Id of guild, if not presented, return en
   */
  public async selectLocale<T>(
    locale: Record<LocaleNames, T> | undefined,
    id?: string
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
    language: LocaleNames
  ): Promise<Pick<Guild, "language">> {
    const languageResponse = await this.queryObject<Pick<Guild, "language">>(
      `update "Guilds" set language = '${language}' where id = '${id}';
       select language from "Guilds" where id = '${id}';`
    );
    return languageResponse.rows[0];
  }

  /**
   * Inserts new guild into db
   * @param id Id of new guild
   */
  public async registerGuild(id: string): Promise<TaprisDbClient> {
    await this.queryObject(`insert into "Guilds" (id) values (${id});`);

    return this;
  }

  /**
   * Removes guild from db
   * @param id Id of guild to remove
   */
  public async removeGuild(id: string): Promise<TaprisDbClient> {
    await this.queryObject(`delete from "Guilds" where id = '${id}';`);

    return this;
  }
}
