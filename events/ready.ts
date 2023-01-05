import { Event } from "@types";
import { ApplicationCommandPartial } from "harmony";

const event: Event = {
  name: "ready",
  run: (client) => {
    client.setPresence({ name: "Type '/' to check bot commands!", type: 0 });

    const commands = client.interactions.commands;

    client.commands.forEach((command) =>
      commands?.create(command as ApplicationCommandPartial)
    );

    console.log(
      `${client.user?.username}#${client.user?.discriminator} is up!`,
    );
  },
};

export default event;
