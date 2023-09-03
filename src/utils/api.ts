import { TaprisClient } from "@core/mod.ts";
import { Hono } from "hono/mod.ts";

const INVITE_URL =
  "https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334";
const GITHUB_URL = "https://github.com/tapris-bot/tapris";
const WEBSITE_URL = "https://tapris.tapnisu.ru";

export class Api extends Hono {
  private client: TaprisClient;

  constructor(client: TaprisClient) {
    super();

    this.client = client;

    this.get("/", (r) => r.redirect(WEBSITE_URL, 302));

    this.get("/invite", (r) => r.redirect(INVITE_URL, 302));

    this.get("/git", (r) => r.redirect(GITHUB_URL, 302));

    this.get("/github", (r) => r.redirect(GITHUB_URL, 302));

    this.get("/api", (r) => r.redirect("/api/v1", 302));

    this.get("/api/v1", (r) =>
      r.json({
        routes: ["commands", "guildsAmount"],
      }),
    );

    this.get("/api/v1/commands", (r) =>
      r.json(this.client.commands.array().map((command) => command.json())),
    );

    this.get("/api/v1/commands/:name", (r) => {
      const command = this.client.commands.get(r.req.param("name"));

      if (command) {
        command.locales = undefined;
        return r.json(command);
      }

      return r.json({
        error: "Command not found!",
      });
    });

    this.get("/api/v1/guildsAmount", async (r) => {
      const guildsAmount = await this.client.getGuildsAmount();

      return r.json({ guildsAmount: guildsAmount });
    });
  }
}
