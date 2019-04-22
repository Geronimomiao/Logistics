const router = require('koa-router')();
const User = require('../models/user')

router.post('/user/login', async (ctx, next) => {
  let name = ctx.request.body.username;
  let password = ctx.request.body.password;
  let user = await User.findOne({name: name, password: password});
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

module.exports = router;