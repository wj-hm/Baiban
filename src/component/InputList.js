import React, { Component } from "react";
import "./InputList.css";
import { Input, Tooltip } from "antd";
class InputList extends React.Component {
  state = {
    content1: 0,
    value1: "",
  };
  handleContent1 = ({ target: { value } }) => {
    const nums = value.replace(/[，。！？、,\.\?!:;=\[\]]/g, "").length;
    this.setState({ content1: nums, value1: value }, () => {
      this.props.onchange1(this.state.value1);
    });
  };

  render() {
    const { TextArea } = Input;
    return (
      <div style={{ width: "100%", paddingRight: "10%", marginTop: "20px" }}>
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div>
              <span>{this.props.title}</span>
              {this.state.content1 < this.props.text ? (
                <span style={{ color: "red" }}>
                  至少 {this.props.text} 字，还需
                  {this.props.text - this.state.content1}
                  字，不包含标点符号。
                </span>
              ) : null}
            </div>

            <Tooltip placement="topLeft" title={this.props.content}>
              <span style={{ color: "blue", cursor: "pointer" }}>查看示例</span>
            </Tooltip>
          </div>
          <TextArea
            placeholder={this.props.placeholder}
            onChange={this.handleContent1}
          />
        </div>
      </div>
    );
  }
}
export default InputList;
