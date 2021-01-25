import React, { Component } from 'react';
import Baiban from './Baiban'
import{Button,Modal, Tabs,Select,Input,Pagination,Icon } from 'antd';
 class App extends React.Component {
   state={
   
   }
 
  render() {
    return (      
      <Baiban name={'请选择课件'} type={"primary"} size={"large"}></Baiban>
    )
  }
}
export default App;