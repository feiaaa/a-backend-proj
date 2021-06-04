var express = require('express');
var cors = require('cors');
var router=require('./router');
var app = express();
const port='3006';
// sql相关 
const mysql = require('mysql');
const bodyParser = require('body-parser');/*支持post方法*/

app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({ extended: false }));

// 允许接口跨域  这里指定允许所有接口跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//sql参数配置相关 start
var con = mysql.createConnection({
  host: "your host or localhost",
  port:'port number',
  user: "username",
  password: "password",
  database:'database name'
  });
  
  con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
 });
//sql参数配置相关 end
//查询语句
const showSql = 'SELECT * FROM word limit 0,10'


// 服务器响应请求 当前端发起 /list 接口的请求后，会触发这个逻辑
app.get('/list', (req, res) => {
  con.query(showSql, function (err, result) {
    if (err) {  // 操作失败报错
      console.log('[SELECT ERROR]:', err.message);
      res.send({code:'005000',message:'失败'})
    }
    res.send({code:'000000',data:result,message:'成功'})  // 将查询结果返回给页面
  });
})

app.use('/', cors(), router);

if (!module.parent) {
  app.listen(port, function () {
    console.log("服务开启了");
  });
}
module.exports = app;

// hello world项目
// var express = require('express');
// var cors = require('cors');
// var router=require('./router');
// var app = express();

// app.use('/', cors(), router);

// if (!module.parent) {
//   app.listen('3006', function () {
//     console.log("服务开启了");
//   });
// }
// module.exports = app;
