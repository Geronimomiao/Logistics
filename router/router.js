// 注意require('koa-router')返回的是函数:

const router = require('koa-router')();
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/data')
mongoose.connection.on("connected", function () {
  console.log("MongoDB Connected success")
})
mongoose.connection.on("error", function () {
  console.log("MongoDB Connected fail")
})
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB Connected disconnected")
})

// add url-route:
router.get('/', async (ctx, next) => {
  ctx.render('index.html', {
    title: 'Welcome'
  });
});

router.post('/signin', async (ctx, next) => {
  let
    name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
  console.log(ctx.request.body);
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
  }
});



module.exports = router;