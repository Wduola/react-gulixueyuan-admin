// 汇总redux中的所用内容

import subjectList from "./reducer";
import { getSubjectList, getSubSubjectList } from "./actions";

// 暴露数据
export {
  subjectList, // 状态数据
  getSubjectList, // 更新一级状态数据的方法
  getSubSubjectList, // 更新二级状态数据的方法
};
