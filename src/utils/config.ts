import { load } from "std/dotenv/mod.ts";

interface Env {
  BOT_TOKEN: string;
  BOT_COLOR: string;

  DATABASE_HOSTNAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE: string;
  DATABASE_PORT: string;

  SERVER_PORT: string;

  AUTHOR_ID: string;

  MODE: "DENODEPLOY" | string;
}

const getEnv = async (): Promise<Env> => {
  const env = (Deno.env.get("MODE") == "DENODEPLOY"
    ? Deno.env.toObject()
    : await load()) as unknown as Env;

  if (!env.BOT_COLOR) env.BOT_COLOR = "#97aee8";
  if (!env.AUTHOR_ID) env.AUTHOR_ID = "586128640136445964";

  return env;
};

export const env = await getEnv();
