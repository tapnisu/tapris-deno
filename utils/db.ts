import { LocaleNames, LocaleRecords, Locales } from "@interfaces/Locales.ts";
import { Client as PostgresClient } from "postgres/mod.ts";

interface Guild {
  id: string;
  language: LocaleNames;
  russianRouletteBeforeDeath: number;
}

class DBManagerBuilder extends PostgresClient {
  public async getGuild(id: string) {
    const guildResponse = await this.queryObject<Guild>(
      `select * from "Guild" where id = '${id}';`,
    );

    return guildResponse.rows[0];
  }

  public async getGuildLanguage(id?: string): Promise<LocaleNames> {
    if (!id) return "en";

    const guildResponse = await this.queryObject<Pick<Guild, "language">>(
      `select language from "Guild" where id = '${id}';`,
    );

    return guildResponse.rows.length ? guildResponse.rows[0].language : "en";
  }

  public async selectLocale(
    locale: Locales,
    id?: string,
  ): Promise<LocaleRecords> {
    return locale[await this.getGuildLanguage(id)];
  }

  public async setGuildLanguage(id: string, language: LocaleNames) {
    const languageResponse = await this.queryObject<Pick<Guild, "language">>(
      `update "Guild" set language = '${language}' where id = '${id}';
       select language from "Guild" where id = '${id}';`,
    );

    return languageResponse.rows[0];
  }

  public async registerGuild(id: string) {
    await this.queryObject(
      `insert into "Guild" (id) values (${id});`,
    );
  }

  public async removeGuild(id: string) {
    await this.queryObject(
      `delete from "Guild" where id = '${id}';`,
    );
  }

  public async sync() {}
}

export default DBManagerBuilder;
