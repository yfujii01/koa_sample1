const Router = require("koa-router");

const router = new Router({
  prefix: "/books",
});

let books = [
  { id: 101, name: "草枕", author: "夏目漱石" },
  { id: 102, name: "走れメロス", author: "太宰治" },
  { id: 103, name: "千曲川のスケッチ", author: "島崎藤村" },
  { id: 104, name: "高瀬舟", author: "森鴎外" },
];

// Routes will go here
router.get("/", (ctx, next) => {
  ctx.body = {
    status: "success",
    message: books,
  };
  next();
});

router.get("/:id", (ctx, next) => {
  let getCurrentBook = books.filter(function (book) {
    if (book.id == ctx.params.id) {
      return true;
    }
  });

  if (getCurrentBook.length) {
    ctx.body = getCurrentBook[0];
  } else {
    ctx.response.status = 404;
    ctx.body = {
      status: "error!",
      message: "Book Not Found with that id!",
    };
  }
  next();
});

router.post("/new", (ctx, next) => {
  // Check if any of the data field not empty
  if (
    !ctx.request.body.id ||
    !ctx.request.body.name ||
    !ctx.request.body.author
  ) {
    ctx.response.status = 400;
    ctx.body = {
      status: "error",
      message: "Please enter the data",
    };
  } else {
    let newBook = books.push({
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      author: ctx.request.body.author,
    });
    ctx.response.status = 201;
    ctx.body = {
      status: "success",
      message: `New book added with id: ${ctx.request.body.id} & name: ${ctx.request.body.name}`,
    };
  }
  next();
});

module.exports = router;
