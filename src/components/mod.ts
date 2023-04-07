import deleteMessage from "@components/delete_message.ts";
import passwordNew from "@components/password-new.ts";
import TaprisClient from "@core/mod.ts";

const components = [deleteMessage, passwordNew];

export default (client: TaprisClient) => {
  components.forEach((component) =>
    client.components.set(component.customId, component)
  );
};
