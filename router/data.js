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

// 展示指定用户 数据
router.post('/show/data', async (ctx, next) => {
  let contact = ctx.request.body.contact;
  let data = await Data.aggregate([
    {$match:{contact: contact}},
    { $group:{  _id: "$order_id", date: {$push: "$date"}, status: {$push: "$status"} } }
  ]);

  // let data = await Data.find({contact: contact});
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

// 修改提单状态
router.post('/show/update/status', async (ctx, next) => {
  let list_id = ctx.request.body.list_id;
  let status = ctx.request.body.status;
  let data = await Data.updateOne({list_id: list_id}, {'$set': {status: status}})
  ctx.body = JSON.stringify(data);
})

module.exports = router;