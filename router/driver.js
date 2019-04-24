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
      msg: '未查到目标',
    }
    ctx.body = JSON.stringify(data);
  }
})

router.post('/driver/setPosition', async (ctx, next) => {
  let list_id = ctx.request.body.list_id;
  let position = ctx.request.body.position;
  let driver = await Driver.updateOne({list_id: list_id}, {'$set': {position: position}})
  ctx.body = JSON.stringify(driver);
})

router.post('/driver/getPosition', async (ctx, next) => {
  let list_id = ctx.request.body.list_id;
  console.log(list_id)
  let driver = await Driver.findOne({list_id: list_id})
  ctx.body = JSON.stringify(driver);
})

router.post('/driver/setSealPic', async (ctx, next) => {
  let list_id = ctx.request.body.list_id;
  let pic = ctx.request.body.pic;
  let driver = await Driver.updateOne({list_id: list_id}, {'$set': {pic_seal: pic}})
  ctx.body = JSON.stringify(driver);
})

router.post('/driver/setBoxPic', async (ctx, next) => {
  let list_id = ctx.request.body.list_id;
  let pic = ctx.request.body.pic;
  let driver = await Driver.updateOne({list_id: list_id}, {'$set': {pic_box_num: pic}})
  ctx.body = JSON.stringify(driver);
})


module.exports = router;
