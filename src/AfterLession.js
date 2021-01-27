import React, { Component } from "react";
import { getResource } from "./util";
import "./AfterLession.css";
import {
  Button,
  Modal,
  Divider,
  Tabs,
  Select,
  Input,
  Pagination,
  Icon,
  Checkbox,
  Row,
  Col,
  Radio,
  Tooltip,
} from "antd";
class AfterLession extends React.Component {
  state = {
    visible: false,
    visible2: false,
    content1: 0,
    value1: "",
    content2: 0,
    value2: "",
    content3: 0,
    value2: "",
    LessionList: [],
  };
  handleContent1 = ({ target: { value } }) => {
    const nums = value.replace(/[，。！？、,\.\?!:;=\[\]]/g, "").length;
    this.setState({ content1: nums, value1: value });
  };
  handleContent2 = ({ target: { value } }) => {
    const nums = value.replace(/[，。！？、,\.\?!:;=\[\]]/g, "").length;
    this.setState({ content2: nums, value2: value });
  };
  handleContent3 = ({ target: { value } }) => {
    const nums = value.replace(/[，。！？、,\.\?!:;=\[\]]/g, "").length;
    this.setState({ content3: nums, value3: value });
  };
  //点击选框
  handleCheck = (index) => {
    const arrayList = this.state.LessionList;
    arrayList[index].checked = !arrayList[index].checked;
    this.setState({
      LessionList: arrayList,
    });
  };
  //init
  init = () => {
    getResource("/api/class/look-package-name", {
      id: this.props.classId,
    })
      .then((data) => {
        // console.log("data", data);
        const arrayList = data;
        arrayList.map((item, index) => {
          item.checked = false;
          item.homework_degree.map((items, indexs) => {
            items.checked = false;
          });
        });
        arrayList[arrayList.length - 1].checked = true;
        this.setState(
          {
            LessionList: arrayList,
          },
          () => {
            console.log("sss", this.state.LessionList);
          }
        );
      })
      .catch((data) => {
        // captureException(data);
        this.$message.error(data.message);
      });
  };
  //初始化
  componentDidMount = () => {
    this.init();
  };

  render() {
    const { visible, visible2, LessionList } = this.state;
    const { TextArea } = Input;
    const { classId } = this.props;
    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            this.setState({ visible: true });
          }}
        >
          课后评价
        </Button>

        <Modal
          title="课后评价"
          visible={visible}
          closable={false}
          width={"80%"}
          footer={[
            // 重点：定义右下角
            <Button
              onClick={() => {
                this.setState({ visible2: true });
              }}
            >
              取消
            </Button>,
            <Button type="primary">提交评价</Button>,
            <Button type="primary">提交评价并前往作业</Button>,
          ]}
        >
          <div style={{ display: "flex", width: "100%", height: "500px" }}>
            {/* 左侧栏 */}
            <div style={{ width: "59%" }}>
              <div>
                温馨提示：为了学生和家长能及时收到课程反馈，建议老师在课程结束后15分钟内填写课程报告，
                <span style={{ color: "blue", cursor: "pointer" }}>
                  点击查看
                </span>
                具体扣罚！
              </div>
              <div style={{ marginTop: "10px" }}>课时数：1</div>
              <div style={{ width: "100%", paddingRight: "10%" }}>
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <span>这节课讲解的内容：</span>
                      {this.state.content1 < 15 ? (
                        <span style={{ color: "red" }}>
                          至少 15 字，还需{15 - this.state.content1}
                          字，不包含标点符号。
                        </span>
                      ) : null}
                    </div>

                    <Tooltip
                      placement="topLeft"
                      title="  请输入本节课所讲解的内容。例如：这节课讲解完型填空答题技巧，其间穿插考察学生英语词汇、短语、语法以及逻辑能力。"
                    >
                      <span style={{ color: "blue", cursor: "pointer" }}>
                        查看示例
                      </span>
                    </Tooltip>
                  </div>
                  <TextArea
                    placeholder="请输入本节课所讲解的内容，包括知识点、题目等"
                    onChange={this.handleContent1}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <span>这节课掌握情况及问题：</span>
                      <span style={{ color: "red" }}>
                        {this.state.content2 < 15 ? (
                          <span style={{ color: "red" }}>
                            至少 15 字，还需{15 - this.state.content2}
                            字，不包含标点符号。
                          </span>
                        ) : null}
                      </span>
                    </div>
                    <Tooltip
                      placement="topLeft"
                      title="  请输入学生对知识点的理解情况和运用情况。例如：这节课完成两篇完型填空,主要是带着学生精读。学生从中体会到了“完型填空”这样一种题型的出题，常考知识点,以及如何在不会做的情况下选择答案。"
                    >
                      <span style={{ color: "blue", cursor: "pointer" }}>
                        查看示例
                      </span>
                    </Tooltip>
                  </div>
                  <TextArea
                    placeholder="请请输入学生对知识点的理解情况和运用情况"
                    onChange={this.handleContent2}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <span>希望学生改进的地方：</span>
                      <span style={{ color: "red" }}>
                        {this.state.content3 < 15 ? (
                          <span style={{ color: "red" }}>
                            至少 15 字，还需{15 - this.state.content3}
                            字，不包含标点符号。
                          </span>
                        ) : null}
                      </span>
                    </div>
                    <Tooltip
                      placement="topLeft"
                      title="    请输入学生学习态度、计算能力、理解能力、语言表达能力等其他需要改进的地方。例如：学生的词汇量偏低，对于英语基本句型不太了解。但是学生的逻辑理解能力非常强，是一个一点就透的小伙子，平时在做题时可能会不细心,导致题目做错，建议学生自行建立错题本，详细记录错题原因。另外，学习需有计划和条理性，建议学生在每门科目的学习中制定相应的学习计划和提分目标，这样才能有备无患。"
                    >
                      <span style={{ color: "blue", cursor: "pointer" }}>
                        查看示例
                      </span>
                    </Tooltip>
                  </div>
                  <TextArea
                    placeholder="请输入学生学习态度、计算能力、理解能力、语言表达能力等其他需要改进的地方"
                    onChange={this.handleContent3}
                  />
                </div>
              </div>
            </div>

            <Divider type="vertical" style={{ height: "100%" }} />

            {/* 右侧教学包 */}
            <div style={{ width: "39%", paddingLeft: "2%" }}>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <p>布置课后作业：</p>
                <p style={{ fontSize: "12px", color: " #ccc" }}>
                  (系统将自动布置教学包中对应难度的作业)
                </p>
              </div>
              <div>
                {LessionList.map((item, index) => (
                  <Row key={index} style={{ marginTop: "15px" }}>
                    <Checkbox
                      checked={item.checked}
                      value={item.id}
                      onChange={() => {
                        this.handleCheck(index);
                      }}
                    >
                      {item.name}
                    </Checkbox>
                    <div>
                      {item.checked == true ? (
                        <Radio.Group defaultValue={1}>
                          {item.homework_degree.map((it, indexT) => (
                            <Radio key={indexT} value={it.id}>
                              {it.name}
                            </Radio>
                          ))}
                        </Radio.Group>
                      ) : null}
                    </div>
                  </Row>
                ))}
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          title="取消评价提醒"
          visible={visible2}
          closable={false}
          width={"50%"}
          footer={[
            // 重点：定义右下角
            <Button
              onClick={() => {
                this.setState({
                  visible: false,
                  visible2: false,
                  content1: 0,
                  value1: "",
                  content2: 0,
                  value2: "",
                  content3: 0,
                  value2: "",
                });
              }}
            >
              取消,晚点评价
            </Button>,
            <Button
              type="primary"
              onClick={() => {
                this.setState({ visible2: false });
              }}
            >
              继续填写评价
            </Button>,
          ]}
        >
          为了学生和家长能及时收到课程反馈，建议老师在课程结束后15分钟内填写课程报告
        </Modal>
      </div>
    );
  }
}
export default AfterLession;
