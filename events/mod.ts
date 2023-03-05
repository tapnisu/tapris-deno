import ExtendedClient from "@core";
import guildCreate from "@events/guildCreate.ts";
import guildDelete from "@events/guildDelete.ts";
import interactionCreate from "@events/interactionCreate.ts";
import ready from "@events/ready.ts";
import reconnect from "@events/reconnect.ts";
import { Event } from "@typings/mod.ts";

const Register = (client: ExtendedClient, event: Event) => {
  client.events.set(event.name, event);
  client.on(event.name, event.run.bind(null, client));
};

export default (client: ExtendedClient) => {
  Register(client, ready);
  Register(client, reconnect);
  Register(client, interactionCreate);
  Register(client, guildCreate);
  Register(client, guildDelete);
};
