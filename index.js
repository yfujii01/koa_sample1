const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const { koaBody } = require('koa-body');


router.get("/", (ctx, next) => {
    ctx.body = 'Hello World!!';
});
router.get("/hoge", (ctx, next) => {
    ctx.body = 'Hoge World!!';
});
router.post("/hoge", (ctx, next) => {
    ctx.body = 'hoge post!!';
})
router.get("/status", (ctx, next) => {
    ctx.response.status = 201;
    ctx.body = {
        "aaa":"123",
        "bbb":"987"
    };
})

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

let books = require('./books.js')
app.use(books.routes())


app.listen(process.env.PORT || 3000);
