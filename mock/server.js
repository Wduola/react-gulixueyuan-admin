// mock 课程分类管理数据

const express = require("express");
const Mock = require("mockjs");
const app = express(); // 创建App应用对象
const Random = Mock.Random; // 随机类
Random.ctitle(); // 随机中文标题

app.use(express.json()); // 使用解析POST/PUT请求的请求体参数的中间件

// 中间件 app.use()
// 解决cors 跨域
app.use((req, res, next) => {
  // 设置响应头：将来作为相应数据返回给客户端
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type, token");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next(); // 触发下一个中间件/路由
});

// Subject 新建添加 http://47.103.203.152/admin/edu/subject/save   POST
app.post("/admin/edu/subject/save", (req, res, next) => {
  // 默认express不解析请求参数
  const { title, parentId } = req.body;
  // 返回响应
  res.json({
    code: 20000, // 成功状态码
    success: true, // 成功
    data: {
      // 成功的具体数据
      _id: Date.now(),
      title,
      parentId,
    },
    message: "", // 失败原因
  });
});

// 模拟请求  并返回数据
// 获取二级分类数据：http://47.103.203.152/admin/edu/subject/get/:parentId GET
app.get("/admin/edu/subject/get/:parentId", (req, res, next) => {
  // 获取请求参数params
  const { parentId } = req.params; //获取一级id
  // 以某个范围取一个随机整数
  const total = Random.integer(1, 5);
  // 定义模拟数据
  const data = Mock.mock({
    total,
    [`items|${total}`]: [
      {
        "_id|+1": 100,
        title: "@ctitle(2,5)",
        parentId,
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

// 获取一级分类数据： http://47.103.203.152/admin/edu/subject/:page/:limit GET
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
