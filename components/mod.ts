import ExtendedClient from "@core";
import { Component } from "@interfaces/mod.ts";
import deleteMessage from "./delete_message.ts";
import passwordNew from "./password-new.ts";

const Register = (client: ExtendedClient, component: Component) => {
  client.components.set(component.customId, component);
};

export default (client: ExtendedClient) => {
  Register(client, passwordNew);
  Register(client, deleteMessage);
};
