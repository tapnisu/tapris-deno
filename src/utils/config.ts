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

  MODE: "DENODEPLOY" | string;
}

const getEnv = async (): Promise<Env> => {
  if (Deno.env.get("MODE") === "DENODEPLOY") {
    return Deno.env.toObject() as unknown as Env;
  } else {
    return (await load()) as unknown as Env;
  }
};

const dots = await getEnv();

export default dots;
