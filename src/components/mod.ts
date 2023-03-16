import deleteMessage from "@components/delete_message.ts";
import passwordNew from "@components/password-new.ts";
import Client from "@core";
import { Component } from "@typings/mod.ts";

const Register = (client: Client, component: Component) => {
  client.components.set(component.customId, component);
};

export default (client: Client) => {
  Register(client, passwordNew);
  Register(client, deleteMessage);
};
