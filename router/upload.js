const router = require('koa-router')();
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const Data = require('../models/data')
const Driver = require('../models/driver')
const User = require('../models/user')

router.post('/upload',
  // 保存用户上传文件
  async (ctx, next) => {
    // 删除之前数据
    const rm = await Data.remove({})

    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    const filePath = path.join(__dirname, '../public/upload/') + `${file.name}`;
    ctx.state.filePath = filePath
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);


    upStream.once("close", () => {
      next()
    })

    // ctx.body = JSON.stringify(datas);
    let data = {
      status: 1,
      msg: '上传成功',
      rm,
    }
    ctx.body = JSON.stringify(data);
  },

  // 解析用户上传文件数据
  async (ctx, next) => {
    const filePath = ctx.state.filePath;
    const workbook = xlsx.parse(filePath);
    const pre_datas = workbook[0].data  // 处理前的数据

    for (let i = 2; i < pre_datas.length - 1; i++) {
      let data = new Data({
        list_id: pre_datas[i][0],
        date: new Date(1900, 0, pre_datas[i][1] - 1).toLocaleString(),
        principal: pre_datas[i][2],   // 委托人
        contact: pre_datas[i][3],     // 公司联系人
        location: pre_datas[i][4],    // 地点
        location_detail: pre_datas[i][5], // 详细装货地点
        box_type: pre_datas[i][6],    // 箱型量
        carrier: pre_datas[i][7],     // 承运人
        boat_name: pre_datas[i][8],   // 船名/航次
        order_id: pre_datas[i][10],    // 提单号
        box_num: pre_datas[i][11],     // 箱号
        seal_num: pre_datas[i][12],    // 封号
        box_weight: pre_datas[i][13],  // 皮箱重量
        destination: pre_datas[i][14], // 目的港
        suitcase_time: pre_datas[i][15],   // 提箱时间
        suitcase_location: pre_datas[i][16], // 提箱位置
        status: pre_datas[i][17],       // 状态
        port_time: pre_datas[i][18],    // 集港时间
        port: pre_datas[i][19],         // 码头
        car_num: pre_datas[i][20],      // 车牌号
        car_phone: pre_datas[i][21],    // 司机电话
        recv_suitcase_location: pre_datas[i][22],  // 回箱位置
        in_out: pre_datas[i][23],       // 进出

        main_driver: [{       // 应付司机
          freight: pre_datas[i][24],    // 运费
          transport_recv: pre_datas[i][25], // 运抵
          over_kg: pre_datas[i][26],    // 过磅
          port: pre_datas[i][27],       // 直集港
          inverted_box: pre_datas[i][28], // 倒箱
          location: pre_datas[i][29],    // 两三地
          east_port: pre_datas[i][30],   // 东疆堤
          lost_box_cost: pre_datas[i][31], // 落箱费
          car_cost: pre_datas[i][32],     // 压车费
          other: pre_datas[i][33],        // 其他
          total: pre_datas[i][34],        // 应付合记
        }],

        change_order: [{
          change_order_cost: pre_datas[i][35], // 换单费
          had_pay: pre_datas[i][36], // 已付
          person: pre_datas[i][37],  // 收款人
        }],

        other_cost: [{    // 其他垫付
          cost: pre_datas[i][38],   // 金额
          person: pre_datas[i][39], // 经办人
        }],

        other_info: pre_datas[i][40], // 情况说明
      })
      data.save()
    }

    for (let i = 2; i < pre_datas.length - 1; i++) {

      let driver = new Driver({
        username: pre_datas[i][7],   // 姓名
        car_num: pre_datas[i][20],    // 车号
        order_id: pre_datas[i][10],        // 提单号
        box_num: pre_datas[i][11],         // 箱号
        boat_name: pre_datas[i][8],        // 船名/航次
        car_phone: pre_datas[i][21],       // 司机电话
        destination: pre_datas[i][14],     // 目的港
        location_detail: pre_datas[i][5],  // 详细装货地点
        position: {}        // 司机位置
      })
      driver.save()
    }


    ctx.body = JSON.stringify(pre_datas);
    // ctx.body = JSON.stringify(datas);
    // console.log(ctx.state.datas)
  }
);


router.post('/upload/user',
  // 保存用户上传文件
  async (ctx, next) => {
    // 删除之前数据
    const rm = await User.remove({})

    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    const filePath = path.join(__dirname, '../public/upload/') + `${file.name}`;
    ctx.state.filePath = filePath
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);


    upStream.once("close", () => {
      next()
    })

    // ctx.body = JSON.stringify(datas);
    let data = {
      status: 1,
      msg: '上传成功',
      rm,
    }
    ctx.body = JSON.stringify(data);
  },

  // 解析用户上传文件数据
  async (ctx, next) => {
    const filePath = ctx.state.filePath;
    const workbook = xlsx.parse(filePath);
    const pre_datas = workbook[0].data  // 处理前的数据
    console.log(pre_datas)
    for (let i = 1; i < pre_datas.length - 1; i++) {
      console.log(pre_datas[i][0])
      let user = new User({
        name: pre_datas[i][0],
        right: pre_datas[i][2],
        company: pre_datas[i][4],
        password: pre_datas[i][3]
      })
      user.save()
    }

  }
);

module.exports = router;