import { load } from "std/dotenv/mod.ts";

export interface Env {
  BOT_TOKEN: string;
  BOT_COLOR: string;

  SERVER_PORT: string;
  AUTHOR_ID: string;

  MODE: "production" | "development" | string;
}

export interface Config {
  token: string;
  botColor: string;

  serverPort: string;
  authorId: string;

  mode: "production" | "development" | string;
}

export const getEnv = async (): Promise<Env> => {
  const env = ((Deno.env.get("MODE") as Env["MODE"]) === "production"
    ? Deno.env.toObject()
    : await load()) as unknown as Env;

  if (!env.BOT_COLOR) env.BOT_COLOR = "#97aee8";
  if (!env.AUTHOR_ID) env.AUTHOR_ID = "586128640136445964";

  return env;
};

export const env = await getEnv();
