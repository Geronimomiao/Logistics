const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dataSchema = new Schema({
  list_id: String,     // 序号
  date: String,        // 日期
  principal: String,   // 委托人
  contact: String,     // 公司联系人
  location: String,    // 地点
  location_detail: String, // 详细装货地点
  box_type: String,    // 箱型量
  carrier: String,     // 承运人
  boat_name: String,   // 船名/航次
  order_id: String,    // 提单号
  box_num: String,     // 箱号
  seal_num: String,    // 封号
  box_weight: String,  // 皮箱重量
  destination: String, // 目的港
  suitcase_time: String,   // 提箱时间
  suitcase_location: String, // 提箱位置
  status: String,       // 状态
  port_time: String,    // 集港时间
  port: String,         // 码头
  car_num: String,      // 车牌号
  car_phone: String,    // 司机电话
  recv_suitcase_location: String,  // 回箱位置
  in_out: String,       // 进出

  main_driver: [{       // 应付司机
    freight: String,    // 运费
    transport_recv: String, // 运抵
    over_kg: String,    // 过磅
    port: String,       // 直集港
    inverted_box: String, // 倒箱
    location: String,    // 两三地
    east_port: String,   // 东疆堤
    lost_box_cost: String, // 落箱费
    car_cost: String,     // 压车费
    other: String,        // 其他
    total: String,        // 应付合记
  }],

  change_order: [{
    change_order_cost: String, // 换单费
    had_pay: String, // 已付
    person: String,  // 收款人
  }],

  other_cost: [{    // 其他垫付
    cost: String,   // 金额
    person: String, // 经办人
  }],

  other_info: String, // 情况说明

  password: {'type':String,'default':'123456'},  // 默认密码
  createdtime:  {
    type: Date,
    default: Date.now()
  },
})

module.exports = mongoose.model('Data', dataSchema)
