# a-backend-proj
write api to query data from mockdata,after building nodejs platform.
nodejs+koa,配合静态文件```/router/data/user.json```，发送api请求
### how to start
> change host information.
> search keyword:createConnection
```
git start
```
### how to use
```
// postman
GET http://localhost:3006/user
GET http://localhost:3006/user/1
POST http://localhost:3006/user {"id":5,name:"Linda"}
PUT http://localhost:3006/user/5 {"id":5,name:"Lily"}
DELETE http://localhost:3006/user/5 

```
### reference
- [基于Koa(nodejs框架)对json文件进行增删改查](https://blog.csdn.net/weixin_34336292/article/details/88611230)

- [深入Node.js的模块加载机制，手写require函数](https://segmentfault.com/a/1190000023828613)
- [手写require函数代码](https://github.com/dennis-jiang/Front-End-Knowledges/blob/master/Examples/Node.js/Module/MyModule/index.js)
