const Router = require('koa-router');
const fs = require('fs')
const path = require('path')
const userPath="/data/user.json"
const router = new Router();

// query
let findJson = (url="",params={}) => {
    const {id}=params
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname, url),function(err,data){
            if(err){
                resolve({code: -1, msg: '查询失败' + err})
                return console.error(err);
            }
            let jsonData = data.toString();//将二进制的数据转换为字符串
            jsonData = JSON.parse(jsonData);//将字符串转换为json对象
            // 有id值=>单个 无id值=>全部
            if (id) {
                jsonData = jsonData.filter((item) => item.id === id);
                resolve({code: 0, data: jsonData})
            } else {
                resolve({code: 0, data: jsonData})
            }

        })
    })
}
// add ,update
let writeJson = (url="",params={}) => {
    const {id,param={}}=params;
    
    return new Promise((resolve,reject)=>{
    // fs模块读取json文件  对fs、path模块不熟悉的可以去查下官方文档
        fs.readFile(path.join(__dirname, url),function(err,data){
            if(err){
            // 报错返回
                resolve({code: -1, msg: '新增失败1' + err})
                return console.error(err);
            }
            let jsonData = data.toString();//将二进制的数据转换为字符串
            jsonData = JSON.parse(jsonData);//将字符串转换为json对象
            // 有id值=>修改 无id值=>新增
            if (id) {
                jsonData.splice(jsonData.findIndex(item => item.id === id), 1, param)
            } else {
                // 有重复 => 返回-1  无重复 => 将params加到json数组末尾
                let hasRepeat = jsonData.find((item) => item.id === param.id);
                hasRepeat ? resolve({code: -1, msg: '新增失败，有重复项目id'}) : jsonData.push(param);
        
            }
            //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            let str = JSON.stringify(jsonData);
            fs.writeFile(path.join(__dirname, userPath),str,function(err){
                if(err){
                    resolve({code: -1, msg: '新增失败' + err})
                }
                resolve({code: 0, msg: '新增成功'})
            })
        })
    })
}
// delete
let deleteJson = (url="",params={}) => {
    const {id}=params;
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname, url),function(err,data){
            if(err){
                resolve({code: -1, msg: '删除失败' + err})
                return console.error(err);
            }
            let jsonData = data.toString();//将二进制的数据转换为字符串
            jsonData = JSON.parse(jsonData);//将字符串转换为json对象
            // 过滤出所存item的id和前端传来id不等的 item ，下面提供了两种方法filter和splice
            jsonData = jsonData.filter((item) => item.id !== id);
            // jsonData.splice(jsonData.findIndex(item => item.id === id), 1)
            let str = JSON.stringify(jsonData);
            fs.writeFile(path.join(__dirname, '/data/project.json'),str,function(err){
                if(err){
                    resolve({code: -1, msg: '删除失败' + err})
                }
                resolve({code: 0, msg: '删除成功'})
            })
        })
    })
}

router.get("/", async (ctx) => {
    // console.log('查询参数', ctx.query);
    // ctx.body = '获取用户列表';
    ctx.body = await findJson(userPath,{})
})
    .get("/:id", async (ctx) => {
        const { id } = ctx.params
        // ctx.body = `获取id为${id}的用户`;
        ctx.body = await findJson(userPath,{id})
    })
    .post("/", async (ctx) => {
        // ctx.body = `创建用户`;
        let param = ctx.request.body;
        ctx.body = await writeJson(userPath,{param})
    })
    .put("/:id", async (ctx) => {
        const { id } = ctx.params
        // ctx.body = `修改id为${id}的用户`;
        let param = ctx.request.body.params
        ctx.body = await writeJson(userPath,{id,param})
    })
    .del("/:id", async (ctx) => {
        const { id } = ctx.params
        // ctx.body = `删除id为${id}的用户`;
        ctx.body = await deleteJson(userPath,{id})

        
    })
    // .all("/users/:id", async (ctx) => {
    //     ctx.body = ctx.params;
    // });

module.exports = router;