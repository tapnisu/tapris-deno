import TaprisClient from "@core/mod.ts";
import { Hono } from "hono/mod.ts";

class Api extends Hono {
  private client: TaprisClient;

  constructor(client: TaprisClient) {
    super();

    this.client = client;

    this.get("/", (r) => r.redirect("https://tapris.tapni.su", 302));

    this.get("/invite", (r) =>
      r.redirect(
        "https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334",
        302
      )
    );

    this.get("/git", (r) =>
      r.redirect("https://github.com/tapris-bot/tapris", 302)
    );

    this.get("/github", (r) =>
      r.redirect("https://github.com/tapris-bot/tapris", 302)
    );

    this.get("/invite", (r) =>
      r.redirect(
        "https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334",
        302
      )
    );

    this.get("/api", (r) => r.redirect("/api/v1", 302));

    this.get("/api/v1", (r) =>
      r.json({
        routes: ["commands", "guildsAmount"],
      })
    );

    this.get("/api/v1/commands", (r) => r.json(this.client.commands.array()));

    this.get("/api/v1/commands/:name", (r) => {
      const command = this.client.commands.get(r.req.param("name"));

      if (command) return r.json(command);

      return r.json({
        error: "Command not found!",
      });
    });

    this.get("/api/v1/guildsAmount", async (r) => {
      const guildsAmount = (await this.client.guilds.array()).length;

      return r.json({ guildsAmount: guildsAmount });
    });
  }
}

export default Api;
