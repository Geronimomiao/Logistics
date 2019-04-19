const router = require('koa-router')();
const Driver = require('../models/driver');

router.post('/driver/register', async (ctx, next) => {
  console.log(111)
  let username = ctx.request.body.username;
  let phone = ctx.request.body.phone;
  let password = ctx.request.body.password;
  let driver = new Driver({
    username: username,
    phone: phone,
    password: password
  });
  driver.save()
  ctx.body = JSON.stringify(driver);
})

router.post('/driver/login', async (ctx, next) => {
  let phone = ctx.request.body.phone;
  let password = ctx.request.body.password;
  let driver = await Driver.findOne({phone: phone, password: password});
  if (driver) {
    let data = {
      status: 1,
      msg: user,
    }
    ctx.body = JSON.stringify(data);
  } else {
    let data = {
      status: 0,
      msg: '未查到目标用户',
    }
    ctx.body = JSON.stringify(data);
  }
})

router.post('/driver/setPosition', async (ctx, next) => {
  let phone = ctx.request.body.phone;
  let position = ctx.request.body.position;
  let driver = await Driver.updateOne({phone: phone}, {'$set': {position: position}})
  ctx.body = JSON.stringify(driver);
})

module.exports = router;
