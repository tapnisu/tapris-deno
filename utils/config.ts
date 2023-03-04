import { config } from "dotenv/mod.ts";

interface Env {
  BOT_TOKEN: string;
  BOT_COLOR: string;

  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE: string;
  DATABASE_PORT: string;

  SERVER_PORT: string;

  MODE: "DENODEPLOY" | string;
}

const getEnv = (): Env => {
  if (
    Deno.env.get("MODE") === "DENODEPLOY"
  ) {
    return Deno.env.toObject() as unknown as Env;
  } else {
    return config() as unknown as Env;
  }
};

const dots = getEnv();

export default dots;
