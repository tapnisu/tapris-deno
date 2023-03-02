import { DBNames } from "@utils/db.ts";
import { config } from "dotenv/mod.ts";

interface Env {
  BOT_TOKEN: string;
  BOT_COLOR: string;

  DATABASE_NAME: DBNames;

  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE: string;
  DATABASE_PORT: string;

  DATABASE_FILE_PATH: string;

  SERVER_PORT: string;

  MODE: "DENODEPLOY" | string;

  [index: string]: string;
}

const getEnv = (): Env => {
  if (
    Deno.env.get("MODE") === "DENODEPLOY"
  ) {
    return Deno.env.toObject() as Env;
  } else {
    return config() as Env;
  }
};

const dots = getEnv();

export default dots;
