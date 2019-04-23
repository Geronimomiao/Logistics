const router = require('koa-router')();
const Admin = require('../models/admin');
const Data = require('../models/data');

router.post('/admin/login', async (ctx, next) => {
  let name = ctx.request.body.username;
  let password = ctx.request.body.password;
  let user = await Admin.findOne({name: name, password: password});
  if (user) {
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

// 展示用户 数据
router.post('/admin/show/data', async (ctx, next) => {

  let data = await Data.aggregate([
    { $group:{  _id: "$order_id", date: {$push: "$date"}, status: {$push: "$status"} } }
  ]);

  // let data = await Data.find({contact: contact});
  let res = {
    status: 1,
    msg: data,
  }
  ctx.body = JSON.stringify(res);

});


module.exports = router;