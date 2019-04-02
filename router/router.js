// 注意require('koa-router')返回的是函数:
const Router = require('koa-router')();
// add url-route:
Router.get('/hello/:name', async (ctx, next) => {
  let name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

Router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});

Router.post('/signin', async (ctx, next) => {
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

module.exports = Router;