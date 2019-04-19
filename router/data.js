// 注意require('koa-router')返回的是函数:

const router = require('koa-router')();
const mongoose = require('mongoose')
const Data = require('../models/data')

mongoose.connect('mongodb://127.0.0.1:27017/abr')
mongoose.connection.on("connected", function () {
  console.log("MongoDB Connected success")
})
mongoose.connection.on("error", function () {
  console.log("MongoDB Connected fail")
})
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB Connected disconnected")
})

// 展示所有 数据
router.post('/show/data', async (ctx, next) => {
  let data = await Data.find();
  let res = {
    status: 1,
    msg: data,
  }
  ctx.body = JSON.stringify(res);

});

// 展示 一条数据
router.post('/show/dataDetail', async (ctx, next) => {
  let order_id = ctx.request.body.order_id;
  let data = await Data.findOne({order_id: order_id});
  let res = {
    status: 1,
    msg: data,
  };
  ctx.body = JSON.stringify(res);
});

// 根据提单号 查询对应的信息
router.post('/show/orderDetail', async (ctx, next) => {
  let order_id = ctx.request.body.order_id;
  let data = await Data.find({order_id: order_id});
  let res = {
    status: 1,
    msg: data,
  };
  ctx.body = JSON.stringify(res);
})

// 删除所有数据
router.post('/show/del', async (ctx, next) => {
  let data = await Data.remove({})
  let res = {
    status: 1,
    msg: data,
  }
  ctx.body = JSON.stringify(res);
})

module.exports = router;