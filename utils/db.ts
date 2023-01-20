import { Database, DataTypes, Model, PostgresConnector } from "denodb";

type Language = "en" | "ru";

class Guild extends Model {
  static table = "Guild";

  static fields = {
    id: { primaryKey: true, type: DataTypes.STRING },
    language: DataTypes.STRING,
    russianRouletBeforeDeath: DataTypes.INTEGER,
  };

  static defaults = {
    russianRouletBeforeDeath: 0,
    language: "en",
  };
}

export default class DBManager {
  private host: string;
  private username: string;
  private password: string;
  private databese: string;
  public db: Database;

  constructor(
    host: string,
    username: string,
    password: string,
    database: string
  ) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.databese = database;

    const connection = new PostgresConnector({
      host: this.host,
      username: this.username,
      password: this.password,
      database: this.databese,
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
}
