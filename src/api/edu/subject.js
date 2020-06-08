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
