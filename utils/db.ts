import { LocaleNames, LocaleRecords, Locales } from "@interfaces/Locales.ts";
import { Client as PostgresClient } from "postgres/mod.ts";

interface Guild {
  id: string;
  language: LocaleNames;
  russianRouletteBeforeDeath: number;
}

class DBManagerBuilder extends PostgresClient {
  public async postInit() {
    await this.connect();
  }

  public async getGuild(id: string) {
    const guild = await this.queryObject<Guild>(
      `select * from "Guild" where id = '${id}';`,
    );

    return guild.rows[0];
  }

  public async getGuildLanguage(id?: string): Promise<LocaleNames> {
    if (!id) return "en";

    const guild = await this.queryObject<LocaleNames>(
      `select language from "Guild" where id = '${id}';`,
    );

    return guild.rows.length ? guild.rows[0] : "en";
  }

  public async selectLocale(
    locale: Locales,
    id?: string,
  ): Promise<LocaleRecords> {
    return locale[await this.getGuildLanguage(id)];
  }

  public async setGuildLanguage(id: string, language: LocaleNames) {
    const languageResponse = await this.queryObject<LocaleNames>(
      `update "Guild" set language = '${language}' where id = '${id}';
       select language from "Guild" where id = '${id}';`,
    );

    return languageResponse.rows[0];
  }

  public async sync() {}
}

export default DBManagerBuilder;
