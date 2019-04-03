const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router/router');
const upload = require('./router/upload');
const koaBody = require('koa-body');

const app = new Koa();


// add router middleware:
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));
app.use(bodyParser());
app.use(upload.routes());
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');