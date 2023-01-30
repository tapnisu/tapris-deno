import { config } from "dotenv";

const getEnv = () => {
  if (Deno.env.get("MODE") === "DENODEPLOY") return Deno.env.toObject();
  return config();
};

const dots = getEnv();

export default dots;
