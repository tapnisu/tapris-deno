import ExtendedClient from "@core";
import guildCreate from "@events/guildCreate.ts";
import interactionCreate from "@events/interactionCreate.ts";
import ready from "@events/ready.ts";
import { Event } from "@types";

const Register = (client: ExtendedClient, event: Event) => {
  client.events.set(event.name, event);
  client.on(event.name, event.run.bind(null, client));
};

export default (client: ExtendedClient) => {
  Register(client, ready);
  Register(client, interactionCreate);
  Register(client, guildCreate);
};
