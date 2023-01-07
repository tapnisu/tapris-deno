import { Command } from "@types";
import colorCommand from "./color.ts";

const command: Command = {
  name: "colour",
  description: "Shows colour or generates colour",
  options: [
    {
      name: "colour",
      description: "Colour to be shown",
      type: 3,
      required: false,
    },
  ],
  run: colorCommand.run
};

export default command;
