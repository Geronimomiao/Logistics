const router = require('koa-router')();
const Driver = require('../models/driver');


router.post('/driver/info', async (ctx, next) => {
  let list_id = ctx.request.body.list_id;
  let driver = await Driver.findOne({list_id: list_id});
  if (driver) {
    let data = {
      status: 1,
      msg: driver,
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
