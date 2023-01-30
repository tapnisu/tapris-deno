import { config } from "dotenv";

const inits = () => {
  if (Deno.env.get("MODE") === "DEPLOY") {
    return Deno.env.toObject();
  } else {
    return config();
  }
};

const dots = inits();

export default dots;
