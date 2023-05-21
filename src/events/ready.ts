import { TaprisClient } from "@core/mod.ts";
import { TaprisEvent } from "@framework/mod.ts";
import {
  ApplicationCommandPartial,
  PermissionResolvable,
} from "harmony/mod.ts";

export default new TaprisEvent()
  .setName("ready")
  .setRun(async (client: TaprisClient) => {
    await client.updatePresence();

    (await client.guilds.array()).forEach(async (guild) => {
      if (!(await client.db.getGuild(guild.id)))
        await client.db.registerGuild(guild.id);
    });

    await client.interactions.commands.bulkEdit(
      client.commands.array().map(
        (
          c: ApplicationCommandPartial & {
            id?: string;
            memberPermissions?: PermissionResolvable;
          }
        ) => {
          delete c.memberPermissions;

          return c;
        }
      )
    );

    console.info(`${client.user!.tag} is up!`);
  });
