let path = require('path')
let express = require('express')
let app = express();
let bodyParser = require('body-parser')
let fs = require('fs')
let formidable = require('formidable')
let form = new formidable.IncomingForm()
const serverIp = 'http://127.0.0.1'
const port = '2000'
app.use('/img_file', express.static(path.join(__dirname,'img_file')))
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
  else next();
});

app.use(bodyParser.urlencoded({ 
  extended: true
}));
// app.use(bodyParser.json())
// console.log( path.join(__dirname,'img_file'))
form.encoding = 'utf-8'; // 编码
form.keepExtensions = true; // 保留扩展名
form.maxFieldsSize = 10 * 1024 * 1024; // 文件大小
// form.uploadDir = path.join(__dirname,'img_file')  // 存储路径

app.get('/uploader', function (req, res, next) {
  res.send('<h1>test</h1>')
})
app.post('/uploader', (req, res, next) => {
  let formData = req.body
  // res.send(path.join(__dirname,'img_file'))
  form.parse(req, function (err, fields, files) {
    // console.log(files.file)

    let imgPath = files.file.path // 获取文件路径
    let newName = files.file.name.split('.');
    let imgtype = newName.splice(newName.length - 1, 1);
    newName = `${newName.join('')}_${+new Date()}.${imgtype}`;
    let imgName = path.join(__dirname, `img_file/${newName}`) // 修改之后的名字

    let data = fs.readFileSync(imgPath) // 同步读取文件
    // let img_name = imgName();
    // fs.appendFile(data,imgName,function(err){
    //     if (err) { return console.log(err) }
    //     fs.unlink(imgPath, function () { }) // 删除文件
    //     res.send({
    //         // code: 1,
    //         files: {
    //             path: `http://${serverIp}:${port}/img_file/${imgName}`
    //         }
    //     })
    // })
    fs.writeFile(imgName, data, function (err) { // 存储文件
      if (err) {
        return console.log(err)
      }

      fs.unlink(imgPath, function () {}) // 删除文件
      res.json({
        code: 1,
        files: {
          path: `${serverIp}:${port}/img_file/${newName}`
        }
      })
    })

  })

});

app.listen(port);
