import React, { Component } from "react";
import InputList from "./component/InputList.js";
import { Button, Modal, Tabs, Select, Pagination, Icon } from "antd";
class TestAfter extends React.Component {
  state = {
    value1: "",
    value2: "",
    value3: "",
    visible: false,
  };
  onchange1(msg) {
    //把子组件传递过来的值赋给this.state中的属性
    this.setState({
      value1: msg,
    });
  }
  onchange2(msg) {
    //把子组件传递过来的值赋给this.state中的属性
    this.setState({
      value2: msg,
    });
  }
  onchange3(msg) {
    //把子组件传递过来的值赋给this.state中的属性
    this.setState({
      value3: msg,
    });
  }
  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button
          onClick={() => {
            this.setState({ visible: true });
          }}
        >
          点击课后评价
        </Button>
        <Modal
          title="课后评价"
          visible={visible}
          closable={false}
          width={"60%"}
          footer={[
            // 重点：定义右下角
            <Button
              onClick={() => {
                this.setState({ visible: false });
              }}
            >
              取消
            </Button>,
            <Button type="primary">提交评价</Button>,
          ]}
        >
          <div style={{ width: "100%", height: "400px" }}>
            <div>
              温馨提示：为了学生和家长能及时收到课程反馈，建议老师在课程结束后15分钟内填写课程报告，
              <span style={{ color: "blue", cursor: "pointer" }}>点击查看</span>
              具体扣罚！
            </div>
            <div style={{ marginTop: "10px" }}>课时数：1</div>
            <InputList
              onchange1={this.onchange1.bind(this)}
              title={"这节课讲解的内容："}
              content={
                "请输入本节课所讲解的内容。例如：这节课讲解完型填空答题技巧，其间穿插考察学生英语词汇、短语、语法以及逻辑能力。"
              }
              placeholder={"请输入本节课所讲解的内容，包括知识点、题目等"}
              text={15}
            ></InputList>

            <InputList
              onchange1={this.onchange2.bind(this)}
              title={"这节课掌握情况及问题："}
              content={
                "请输入学生对知识点的理解情况和运用情况。例如：这节课完成两篇完型填空,主要是带着学生精读。学生从中体会到了“完型填空”这样一种题型的出题，常考知识点,以及如何在不会做的情况下选择答案。"
              }
              placeholder={"请请输入学生对知识点的理解情况和运用情况"}
              text={15}
            ></InputList>

            <InputList
              onchange1={this.onchange3.bind(this)}
              title={"希望学生改进的地方："}
              content={
                " 请输入学生学习态度、计算能力、理解能力、语言表达能力等其他需要改进的地方。例如：学生的词汇量偏低，对于英语基本句型不太了解。但是学生的逻辑理解能力非常强，是一个一点就透的小伙子，平时在做题时可能会不细心,导致题目做错，建议学生自行建立错题本，详细记录错题原因。另外，学习需有计划和条理性，建议学生在每门科目的学习中制定相应的学习计划和提分目标，这样才能有备无患。"
              }
              placeholder={
                "请输入学生学习态度、计算能力、理解能力、语言表达能力等其他需要改进的地方"
              }
              text={15}
            ></InputList>
          </div>
        </Modal>
      </div>
    );
  }
}
export default TestAfter;
