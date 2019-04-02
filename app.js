const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const router = require('./router/router')

const app = new Koa();


// add router middleware:
app.use(bodyParser());
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');