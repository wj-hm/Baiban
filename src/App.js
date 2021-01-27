import React, { Component } from "react";
import Baiban from "./Baiban";
import AfterLession from "./AfterLession";
import { Button, Modal, Tabs, Select, Input, Pagination, Icon } from "antd";
class App extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Baiban name={"请选择课件"} type={"primary"} size={"large"}></Baiban>
        <div>----------------------分割线</div>
        <AfterLession classId={397190}></AfterLession>
      </div>
    );
  }
}
export default App;
