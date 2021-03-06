const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverSchema = new Schema({
  list_id: String,    // 序号
  username: String,   // 姓名
  car_num: String,    // 车号
  order_id: {
    type: String,
    default: 'null'
  },                  // 提单号
  box_num: {
    type: String,
    default: 'null'
  },                  // 箱号
  boat_name: String,  // 船名/航次
  car_phone: String,  // 司机电话
  destination: String, // 目的港
  location_detail: String, // 详细装货地点
  position: {},        // 司机位置
  // pic: []           // 司机到达位置后 拍摄照片
  pic_box_num: '',     // 箱号图片地址
  pic_seal: ''         // 铅封号图片地址
})

module.exports = mongoose.model('Driver', driverSchema)
