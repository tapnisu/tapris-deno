import { LocaleNames } from "@types";
import {
  Database,
  DatabaseOptions,
  DataTypes,
  Model,
  PostgresConnector,
  SQLite3Connector
} from "denodb";
import { ConnectorOptions } from "https://deno.land/x/denodb@v1.2.0/lib/connectors/connector.ts";
import { LocaleRecords, Locales } from "../types/Locales.ts";

export class Guild extends Model {
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

export class DBManager {
  private db: Database;

  constructor(
    dialectOptionsOrDatabaseOptionsOrConnector: DatabaseOptions,
    connectionOptions?: ConnectorOptions
  ) {
    this.db = new Database(
      dialectOptionsOrDatabaseOptionsOrConnector,
      connectionOptions
    );
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

  public async getGuildLanguage(id: string | undefined): Promise<LocaleNames> {
    if (!id) return "en";
    return (await Guild.where("id", id).first()).language as LocaleNames;
  }

  public async selectLocale(
    id: string | undefined,
    locale: Locales
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

export type DBNames = "sqlite3" | "postgres";

export interface Sqlite3DBManagerSettings {
  filepath: string;
}

export interface PostgresDBManagerSettings {
  host: string;
  username: string;
  password: string;
  database: string;
}

export type DBManagerSettings =
  | Sqlite3DBManagerSettings
  | PostgresDBManagerSettings;

export class Sqlite3DBManager extends DBManager {
  constructor(settings: Sqlite3DBManagerSettings) {
    const connection = new SQLite3Connector({
      filepath: settings.filepath,
    });

    super(connection);
  }
}

export class PostgresDBManager extends DBManager {
  constructor(settings: PostgresDBManagerSettings) {
    const connection = new PostgresConnector({
      host: settings.host,
      username: settings.username,
      password: settings.password,
      database: settings.database,
    });

    super(connection);
  }
}

export default class DBManagerBuilder {
  public dbManager: PostgresDBManager | Sqlite3DBManager;

  constructor(dbName: DBNames, options: DBManagerSettings) {
    switch (dbName) {
      case "postgres":
        this.dbManager = new PostgresDBManager(
          options as PostgresDBManagerSettings
        );
        break;

      case "sqlite3":
        this.dbManager = new Sqlite3DBManager(
          options as Sqlite3DBManagerSettings
        );
        break;
    }
  }
}
