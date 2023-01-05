import { config } from "dotenv";

const inits = () => {
  if (Deno.env.get("MODE") === "DENODEPLOY") {
    return Deno.env.toObject();
  } else {
    return config();
  }
};

const dots = inits();

export default dots;
