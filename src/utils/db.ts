import { LocaleNames, LocaleRecords } from "@typings/Locales.ts";
import { Client as PostgresClient } from "postgres/mod.ts";

interface Guild {
  id: string;
  language: LocaleNames;
  russianRouletteBeforeDeath: number;
}

class TaprisDBManager extends PostgresClient {
  public async getGuild(id: string): Promise<Guild> {
    const guildResponse = await this.queryObject<Guild>(
      `select * from "Guilds" where id = '${id}';`
    );

    return guildResponse.rows[0];
  }

  public async getGuildLanguage(id?: string): Promise<LocaleNames> {
    if (!id) return "en";

    const guildResponse = await this.queryObject<Pick<Guild, "language">>(
      `select language from "Guilds" where id = '${id}';`
    );

    return guildResponse.rows.length ? guildResponse.rows[0].language : "en";
  }

  public async selectLocale<T extends LocaleRecords | undefined>(
    locale: Record<LocaleNames, T> | undefined,
    id?: string
  ): Promise<T> {
    if (!locale) return undefined as T;
    return locale[await this.getGuildLanguage(id)];
  }

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

  public async registerGuild(id: string) {
    await this.queryObject(`insert into "Guilds" (id) values (${id});`);
  }

  public async removeGuild(id: string) {
    await this.queryObject(`delete from "Guilds" where id = '${id}';`);
  }

  public async sync() {
    await this.queryObject(
      `CREATE TABLE "Guilds" (
        id text,
        language text DEFAULT 'en' NOT NULL,
        russian_roulette_before_death int4 DEFAULT 0 NOT NULL
      );`
    );
  }
}

export default TaprisDBManager;
