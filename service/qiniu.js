let qiniu = require('qiniu')
let key = {
  AK: 'lRmwPc09-KJC33Uhz_FJnVzgazdZBwJXag4XJCRT',
  SK: 'GdtB7hli0WFE0MB4povVfmoshn80PEgolpj4bZxL'
}
qiniu.conf.ACCESS_KEY = key.AK
qiniu.conf.SECRET_KEY = key.SK


// 上传后 返回一个 token 值 传给客户端
exports.uptoken = function (key) {
  // 上传空间名
  var bucket = 'reddot'
  var putPolicy = new qiniu.rs.PutPolicy({scope: bucket+":"+key});
  return putPolicy.uploadToken();
}