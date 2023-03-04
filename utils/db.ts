import { LocaleNames, LocaleRecords, Locales } from "@interfaces/Locales.ts";
import { Client as PostgresClient } from "postgres/mod.ts";

interface Guild {
  id: number;
  language: LocaleNames;
  russianRouletteBeforeDeath: number;
}

class DBManagerBuilder extends PostgresClient {
  public async postInit() {
    await this.connect();
  }

  public async getGuild(id: number) {
    const guild = await this.queryObject<Guild>(
      `select * from "Guild" where id = ${id};`,
    );

    return guild.rows[0];
  }

  public async getGuildLanguage(id?: number): Promise<LocaleNames> {
    if (!id) return "en";

    const guild = await this.queryObject<LocaleNames>(
      `select language from "Guild" where id = ${id};`,
    );

    return guild.rows.length ? guild.rows[0] : "en";
  }

  public async selectLocale(
    locale: Locales,
    id: number,
  ): Promise<LocaleRecords> {
    return locale[await this.getGuildLanguage(id)];
  }

  public async sync() {
  }
}

export default DBManagerBuilder;
