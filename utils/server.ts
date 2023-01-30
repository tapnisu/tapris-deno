import { Hono } from "hono";
const app = new Hono();

app.get("/", (r) => r.redirect("https://tapris.tapni.su", 302));

app.get("/git", (r) => r.redirect("https://github.com/tapris-bot/tapris", 302));

app.get("/github", (r) =>
  r.redirect("https://github.com/tapris-bot/tapris", 302)
);

app.get("/invite", (r) =>
  r.redirect(
    "https://discord.com/api/oauth2/authorize?client_id=869088074758520832&scope=bot+applications.commands&permissions=294208515334",
    302
  )
);

app.get("/api", (r) => r.redirect("/api/v1", 302));

app.get("/api/v1", (r) =>
  r.json({
    routes: ["commands"],
  })
);

export default app;
