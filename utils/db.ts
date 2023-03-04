import { LocaleNames } from "@interfaces/Locales.ts";
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

  public async getGuild(id: string) {
    const guild = await this.queryObject<Guild>(
      `select * from Guild where id = ${id};`,
    );

    return guild.rows[0];
  }

  public async getGuildLanguage(id?: string) {
    if (!id) return "en";

    const guild = await this.queryObject<Pick<Guild, "language">>(
      `select language from Guild where id = ${id};`,
    );

    return guild.rows.length ? guild.rows[0] : "en";
  }

  public async sync() {
  }
}

export default DBManagerBuilder;
