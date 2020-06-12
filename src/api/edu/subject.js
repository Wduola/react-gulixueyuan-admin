import request from "@utils/request";

// 模块请求公共前缀
const BASE_URL = "/admin/edu/subject";

// mock地址
// const MOCK_BASE_URL = `http://localhost:8888${BASE_URL}`;

// 获取一级分类分页列表数据  http://47.103.203.152/admin/edu/subject/:page/:limit  GET
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    methods: "GET",
  });
}

// 获取二级分类分页列表数据  http://47.103.203.152/admin/edu/subject/get/:parentId   GET
export function reqGetSubSubjectList(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    methods: "GET",
  });
}

// 添加课程分类  http://47.103.203.152/admin/edu/subject/save   POST
export function reqAddSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: { title, parentId },
  });
}

// 更新课程分类 http://47.103.203.152/admin/edu/subject/update  PUT
export function reqUpdateSubject(title, id) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      // 请求参数
      title,
      id,
    },
  });
}

// 删除课程分类  http://47.103.203.152/admin/edu/subject/remove/:id  DELETE
export function reqDelSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}
