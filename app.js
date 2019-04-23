const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const router = require('koa-router')();

const data = require('./router/data');
const upload = require('./router/upload');
const user = require('./router/user');
const driver = require('./router/driver');
const admin = require('./router/admin');

const app = new Koa();

// 配置路由
router
  .use('/v1', data.routes())
  .use('/v1', upload.routes())
  .use('/v1', user.routes())
  .use('/v1', driver.routes())
  .use('/v1', admin.routes())

// 允许跨域
app.use(cors());

// add router middleware:
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));
app.use(bodyParser());
app.use(router.routes());

app.listen(3100);
