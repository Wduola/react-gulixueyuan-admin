import request from "@utils/request";

// 模块请求公共前缀
const BASE_URL = "/admin/edu/subject";

// mock地址
const MOCK_BASE_URL = `http://localhost:8888${BASE_URL}`;

// 获取一级分类分页列表数据
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${MOCK_BASE_URL}/${page}/${limit}`,
    methods: "GET",
  });
}

// 获取二级分类分页列表数据
export function reqGetSubSubjectList(parentId) {
  return request({
    url: `${MOCK_BASE_URL}/get/${parentId}`,
    methods: "GET",
  });
}

// 添加课程分类
export function reqAddSubject(title, parentId) {
  return request({
    url: `${MOCK_BASE_URL}/save`,
    method: "POST",
    data: { title, parentId },
  });
}
