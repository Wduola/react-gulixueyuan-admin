// mock 课程分类管理数据

const express = require("express");
const Mock = require("mockjs");
// 创建App应用对象
const app = express();

// 随机类
const Random = Mock.Random;
// 随机中文标题
Random.ctitle();

// 中间件 app.use()
// 解决cors 跨域
app.use((req, res, next) => {
  // 设置响应头：将来作为相应数据返回给客户端
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type, token");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next(); // 触发下一个中间件/路由
});

// 模拟请求  并返回数据
// http://47.103.203.152/admin/edu/subject/:page/:limit get
app.get("/admin/edu/subject/:page/:limit", (req, res, next) => {
  // 获取请求参数params
  const { page, limit } = req.params;

  // 模拟数据
  const data = Mock.mock({
    // 确定数据的取值范围 Random.integer( min?, max? )
    total: Random.integer(+limit + 1, limit * 2),
    [`items|${limit}`]: [
      {
        "_id|+1": 1,
        title: "@ctitle(2,5)", //Random.ctitle( min?, max? )
        parentId: 0,
      },
    ],
  });

  // 返回相应数据
  res.json({
    code: 20000,
    success: true,
    data, //mock的数据
    message: "",
  });
});

// 监听端口号  启动服务
app.listen(8888, "localhost", (err) => {
  if (err) {
    console.log("服务启动失败", err);
    return;
  }
  console.log("服务启动成功");
});
