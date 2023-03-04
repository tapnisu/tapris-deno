import { Client as PostgresClient } from "postgres/mod.ts";

class DBManagerBuilder extends PostgresClient {
  public async postInit() {
    await this.connect();
  }

  public async sync() {
  }
}

export default DBManagerBuilder;
