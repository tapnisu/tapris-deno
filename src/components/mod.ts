import deleteMessage from "@components/delete_message.ts";
import passwordNew from "@components/password-new.ts";
import { TaprisComponent } from "@framework/mod.ts";
import { Collection } from "harmony/mod.ts";

export const components = [deleteMessage, passwordNew];

export class ComponentsCollection extends Collection<RegExp, TaprisComponent> {
  constructor(components: TaprisComponent[]) {
    super();

    components.forEach((component) => this.set(component.customId, component));
  }
}
