import React, { Component } from "react";
// 引入Antd的按钮组件
import { Button, Table } from "antd";
// 引入Antd的图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";

// 引入mock数据
import { reqGetSubjectList } from "@api/edu/subject";

// 引入样式
import "./index.less";

export default class Subject extends Component {
  state = {
    subjects: {
      total: 0,
      items: [],
    },
  };

  componentDidMount() {
    //  上一次请求第一页的数据
    this.getSubjectList(1, 10);
  }

  // 获取subject分页列表的数据
  getSubjectList = async (page, limit) => {
    // console.log(page, limit);
    // 发送请求
    const result = await reqGetSubjectList(page, limit);
    // console.log(result);
    // 更新数据
    this.setState({
      subjects: result,
    });
  };

  render() {
    const { subjects } = this.state;
    const columns = [
      {
        title: "分类名称",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: () => (
          <>
            <Button type="primary">
              <FormOutlined />
            </Button>
            <Button type="primary" className="subject-btn" danger>
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
    ];

    return (
      <div className="subject">
        <Button type="primary" className="subject-btn">
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns} // 决定列头
          expandable={{
            // 决定列是否可以展开
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
            // 决定行是否可以展开
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={subjects.items} // 决定每一行显示的数据
          rowKey="_id"
          pagination={{
            total: subjects.total, // 数据总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: this.getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: this.getSubjectList, //控制每页显示数量
          }}
        />
      </div>
    );
  }
}
