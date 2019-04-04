const router = require('koa-router')();
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

router.post('/upload',
  // 保存用户上传文件
  async (ctx, next) => {
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
    }
    ctx.body = JSON.stringify(data);
  },

  // 解析用户上传文件数据
  async (ctx, next) => {
    const filePath = ctx.state.filePath;
    const datas = []; //可能存在多个sheet的情况
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames; // 返回 ['sheet1', ...]

    for (const sheetName of sheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
      datas.push(data);
    }
    console.log(filePath)
    // ctx.body = JSON.stringify(datas);
    // console.log(ctx.state.datas)
  });

router.get('/', async (ctx, next) => {

  const workbook = xlsx.parse('/Users/wsm/WebstormProjects/Logistics/public/upload/数据源3月24.xlsx');
  for (let i = 2; workbook[0].data[i][3]; i++) {

  }
  ctx.body = JSON.stringify(workbook);
})

module.exports = router;