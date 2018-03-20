let path = require('path')
let express = require('express')
let app = express();
let bodyParser = require('body-parser')
let fs = require('fs')
let formidable = require('formidable')
let form = new formidable.IncomingForm()

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
form.encoding = 'utf-8'; // 编码
form.keepExtensions = true; // 保留扩展名
form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
// form.uploadDir = 'C:/Users/Administrator/Downloads'  // 存储路径

app.post('/uploader', (req, res, next) => {
    let formData = req.body
    // res.send(formData)
    form.parse(req, function (err, fields, files) {
        console.log(files.file)

        let imgPath = files.file.path // 获取文件路径
        let imgName = "./test." + files.file.name // 修改之后的名字
        let data = fs.readFileSync(imgPath) // 同步读取文件

        fs.writeFile(imgName, data, function (err) { // 存储文件

            if (err) { return console.log(err) }

            fs.unlink(imgPath, function () { }) // 删除文件
            res.json({
                code: 1,
                files:files.file
            })
        })


    })

});

app.listen(2000);