import ExtendedClient from "@core";
import { Component } from "@types";
import passwordNew from "./password-new.ts";
import deleteMessage from "./delete_message.ts";

const Register = (client: ExtendedClient, component: Component) => {
  client.components.set(component.customId, component);
};

export default (client: ExtendedClient) => {
  Register(client, passwordNew);
  Register(client, deleteMessage);
};
