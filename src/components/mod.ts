import deleteMessage from "@components/delete_message.ts";
import passwordNew from "@components/password-new.ts";
import ExtendedClient from "@core";
import { Component } from "@typings/mod.ts";

const Register = (client: ExtendedClient, component: Component) => {
  client.components.set(component.customId, component);
};

export default (client: ExtendedClient) => {
  Register(client, passwordNew);
  Register(client, deleteMessage);
};
