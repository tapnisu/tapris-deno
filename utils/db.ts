import { LocaleNames } from "@types";
import { Database, DataTypes, Model, PostgresConnector } from "denodb";
import { LocaleRecords, Locales } from "../types/Locales.ts";

class Guild extends Model {
  static table = "Guild";

  static fields = {
    id: { primaryKey: true, type: DataTypes.STRING },
    language: DataTypes.STRING,
    russianRouletteBeforeDeath: DataTypes.INTEGER,
  };

  static defaults = {
    russianRouletteBeforeDeath: 0,
    language: "en",
  };
}

export default class DBManager {
  private db: Database;

  constructor(
    host: string,
    username: string,
    password: string,
    database: string,
  ) {
    const connection = new PostgresConnector({
      host: host,
      username: username,
      password: password,
      database: database,
    });

    this.db = new Database(connection);
    this.db.link([Guild]);
  }

  public async sync() {
    await this.db.sync();
  }

  public async registerGuild(id: string) {
    await Guild.create([
      {
        id: id,
      },
    ]);
  }

  public async removeGuild(id: string) {
    await Guild.deleteById(id);
  }

  public async getGuild(id: string) {
    return await Guild.where("id", id).first();
  }

  public async getGuildLanguage(id: string): Promise<LocaleNames> {
    return (await Guild.where("id", id).first()).language as LocaleNames;
  }

  public async selectLocale(
    id: string,
    locale: Locales,
  ): Promise<LocaleRecords> {
    return locale[await this.getGuildLanguage(id)];
  }

  public async setGuildLanguage(id: string, language: LocaleNames) {
    const guild = await this.getGuild(id);
    guild.language = language;
    await guild.update();
  }

  public async russianRouletteShoot(id: string): Promise<number> {
    const guild = await Guild.where("id", id).first();

    switch (guild.russianRouletteBeforeDeath) {
      case 0:
        return 2;

      case 1:
        guild.russianRouletteBeforeDeath = 0;
        await guild.update();

        return 1;

      default:
        (guild.russianRouletteBeforeDeath as number)--;
        await guild.update();

        return 0;
    }
  }

  public async russianRouletteReload(id: string, drumSize: number) {
    const guild = await this.getGuild(id);
    guild.russianRouletteBeforeDeath = Math.floor(Math.random() * drumSize);
    await guild.update();
  }
}
