const Router = require("@koa/router");
const Koa = require("koa");
const next = require("next");

const PORT = 3000;

const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = new Koa();
  const router = new Router();

  router.get("(.*)", async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(PORT, () => {
    console.log(`🚀 Server Start at ${PORT}`);
  });
});
