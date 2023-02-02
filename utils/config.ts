import { config } from "dotenv";

interface Env {
  BOT_TOKEN: string
  BOT_COLOR: string

  DATABASE_NAME: string

  HOST: string
  USERNAME: string
  PASSWORD: string
  DATABASE: string
  PORT: string

  FILE_PATH: string

  SERVER_PORT: string

  MODE: "DEPLOY" | "DENODEPLOY" | string

  [index: string]: string
}

const getEnv = (): Env => {
  if (
    Deno.env.get("MODE") === "DEPLOY" || Deno.env.get("MODE") === "DENODEPLOY"
  ) {
    return Deno.env.toObject() as Env;
  } else {
    return config() as Env;
  }
};

const dots = getEnv();

export default dots;
