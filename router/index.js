const Router = require('koa-router');
const user = require('./user');

const router = new Router(); // 创建路由，支持传递参数

// 指定一个url匹配
router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world!</h1>';
})

router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;