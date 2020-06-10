import React, { Component } from "react"; // 引入Antd的按钮组件
import { Button, Table } from "antd"; // 引入Antd的图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getSubjectList, getSubSubjectList } from "./redux";
import "./index.less"; // 引入样式

@connect(
  (state) => ({ subjectList: state.subjectList }), // 状态数据
  {
    // 更新状态数据的方法
    getSubjectList,
    getSubSubjectList,
  }
)
class Subject extends Component {
  state = {
    expandedRowKeys: [], //展开项
  };

  componentDidMount() {
    //  上一次请求第一页的数据
    this.props.getSubjectList(1, 10);
  }

  // 点击展开一级菜单
  handleExpandedRowsChange = (expandedRowKeys) => {
    const length = expandedRowKeys.length;
    // 如果最新长度大于之前的长度，说明就是展开~
    if (length > this.state.expandedRowKeys.length) {
      const lastKey = expandedRowKeys[length - 1];
      // 发送请求，请求要展开菜单的二级菜单数据
      this.props.getSubSubjectList(lastKey);
    }
    // 更新state --> 告诉Table哪个子菜单需要展开
    this.setState({
      expandedRowKeys,
    });
  };

  // 点击按钮新建
  showAddSubject = () => {
    this.props.history.push("/edu/subject/add");
  };

  render() {
    const { subjectList, getSubjectList } = this.props;
    const { expandedRowKeys } = this.state;
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
        <Button type="primary" className="subject-btn" onClick={this.showAddSubject}>
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns} // 决定列头
          // expandable={{
          //   expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          //   rowExpandable: (record) => record.name !== "Not Expandable",
          // }}
          expandable={{
            // 内部默认会使用children作为展开的子菜单
            expandedRowKeys,
            // 展开行触发的方法
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          dataSource={subjectList.items} // 决定每一行显示的数据
          rowKey="_id"
          pagination={{
            total: subjectList.total, // 数据总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: getSubjectList, //控制每页显示数量
          }}
        />
      </div>
    );
  }
}

export default Subject;
