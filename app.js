const Koa = require('koa'); // 引入koa
const Router = require('koa-router'); // 引入koa-router
const json = require('koa-json')
const bodyParser = require('koa-bodyparser') // 否则body进不来

const app = new Koa(); // 创建koa应用

// 指定路由文件
const router = require('./router');

// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(router.routes());
app.use(router.allowedMethods({ 
    // throw: true, // 抛出错误，代替设置响应头状态
    // notImplemented: () => '不支持当前请求所需要的功能',
    // methodNotAllowed: () => '不支持的请求方式'
}));

// 启动服务监听本地3006端口
app.listen(3006, () => {
    console.log('应用已经启动，http://localhost:3006');
})