import React, { Component } from "react";
import { getResource } from "./util";
import "./Baiban.css";
import { Button, Modal, Tabs, Select, Input, Pagination, Icon } from "antd";
class Baiban extends React.Component {
  state = {
    visible: false,
    folderCategory: "upload", //点击课件变色按钮
    folderList: [], //选择课件筛选
    courseList: [], //课件数据
    // 种类列表
    categoryList: [
      { val: "upload", name: "已上传课件" },
      { val: "bought", name: "已购课件" },
    ],
    //选中课件
    chooseList: [],
    //课件搜索关键词
    courseKey: "",
    folderId: null,
    selectedIndex: null,
    pageIndex: 1,
    totalPage: 1,
    current: 1,
    subjectMap: {
      语文: "chinese",
      数学: "math",
      英语: "english",
      历史: "history",
      地理: "geography",
      政治: "politics",
      物理: "physics",
      化学: "chemistry",
      生物: "biology",
      通用技术: "technology",
    },
    previewCoursewareId: null,
  };
  //展示弹框
  showModal = () => {
    this.setState({ visible: true });
  };

  //确定，提交数据
  handleOk = () => {};
  //头部展示选项
  changeCategory = (item) => {
    this.setState({ folderCategory: item, chooseList: [] }, () => {
      this.getFolderList();
      this.getCourseList();
    });
  };
  //点击下拉课件
  handleChange = (value) => {
    // console.log(`selected ${value}`);
    // console.log('value',value);
    this.setState({
      folderId: value,
    });
  };
  //下拉课件筛选项
  getFolderList = () => {
    return new Promise((resolve, reject) => {
      getResource("/api/courseware-favorite/list", {
        category: this.state.folderCategory,
      })
        .then((data) => {
          this.setState(
            {
              folderList: data,
            },
            () => {
              // console.log('folderList',this.state.folderList);
            }
          );
          resolve(data);
        })
        .catch((data) => {
          // captureException(data);
          this.$message.error(data.message);
        });
    });
  };

  //下方所有数据筛选
  getCourseList = () => {
    let url;
    switch (this.state.folderCategory) {
      case "upload":
        url = "/api/user/courseware";
        break;
      case "bought":
        url = "/api/courseware-sharing/bought-list";
        break;
      default:
        break;
    }
    getResource(url, {
      title: this.state.courseKey,
      favorite_id: this.state.folderId,
      courseware_id: this.state.previewCoursewareId,
      page_size: 5,
      page: this.state.pageIndex,
      // page: this.pageIndex,
    })
      .then((data) => {
        let courseList = [
          {
            id: 0,
            name: "不使用课件",
            subject: "technology",
            selectAuth: false,
          },
        ];
        let selectedIndex = null;
        // this.courseList = data.list;
        this.setState({
          totalPage: data.total_count,
          current: data.page_count,
        });
        if (this.state.folderCategory === "upload") {
          data.list.forEach((item) => {
            courseList.push({
              id: item.id,
              name: item.title,
              subject: "",
              selectAuth: false,
            });
          });
          const chooseList = this.state.chooseList;
          // console.log('chooseList111',chooseList);
          // console.log('chooseList111length',chooseList.length);

          if (chooseList.length > 0) {
            courseList.map((items) => {
              if (items.id == chooseList[0].id) {
                items.selectAuth = true;
              }
            });
            this.setState(
              {
                courseList: courseList,
              },
              () => {
                // console.log('courseList222',this.state.courseList);
                // console.log('chooseList333',chooseList);
              }
            );
          } else {
            this.setState({
              courseList: courseList,
            });
          }
        }
        if (this.state.folderCategory === "bought") {
          data.list.forEach((item) => {
            courseList.push({
              id: item.courseware_id,
              name: item.coursewareSharing.courseware_name,
              subject: item.coursewareSharing.subject,
              shotId: item.id,
              selectAuth: false,
            });
          });
          const chooseList = this.state.chooseList;
          if (chooseList.length > 0) {
            courseList.map((items) => {
              if (items.id == chooseList[0].id) {
                items.selectAuth = true;
              }
            });
            this.setState({
              courseList: courseList,
            });
          } else {
            this.setState({
              courseList: courseList,
            });
          }
          // this.setState({
          //   courseList:courseList
          // })
        }
        // courseList.forEach((item, index) => {
        //     this.$set(item, 'order', index);
        // });

        // this.totalPage = data.page_count ? data.page_count : 1;
        // let totalPage =  Math.ceil(courseList.length / 6) ? Math.ceil(courseList.length / 6) : 1;
        // this.setState({
        //   courseList:courseList,
        //   totalPage:totalPage,
        // })
        // if (this.state.previewCoursewareId) {
        //     const slide = courseList.find(slide => (this.state.folderCategory === 'bought' ? slide.shotId : slide.id) === this.state.previewCoursewareId);

        //     this.setState({
        //       previewCoursewareId:null
        //     })
        //     this.sureClick(slide)
        // }
      })
      .catch((data) => {
        // captureException(data);
        this.$message.error(data.message);
      });
  };

  //搜索
  selectCourse = (value) => {
    this.setState(
      {
        pageIndex: 1,
        courseKey: value,
        chooseList: [],
      },
      () => {
        this.getCourseList();
      }
    );
  };
  //点击页码
  selectChange = (page) => {
    // console.log('page',page);
    this.setState(
      {
        pageIndex: page,
      },
      () => {
        this.getCourseList();
      }
    );
  };
  //点击
  choose(item) {
    let courseList = this.state.courseList;
    let folderCategory = this.state.folderCategory;
    let arrayList = [];

    // courseList.map((enter)=>{
    //   enter.selectAuth=false
    // })

    courseList.map((entry) => {
      if (item.id == entry.id) {
        entry.selectAuth = true;
        arrayList[0] = entry;
      } else {
        entry.selectAuth = false;
      }
    });
    this.setState({
      courseList: courseList,
      chooseList: arrayList,
    });
    // console.log('courseList',courseList);
    // console.log('item',item);
    // console.log('arrayList',arrayList);
  }
  //初始化
  componentDidMount() {
    // console.log('ssssaaa',this.state.chooseList);
    this.getFolderList();
    this.getCourseList();
  }

  render() {
    const { TabPane } = Tabs;
    const { Option } = Select;
    const { Search } = Input;
    const { visible, folderCategory } = this.state;
    const { name, type, size } = this.props;
    return (
      <div>
        <Button type={type} onClick={this.showModal} size={size}>
          {name}
        </Button>
        <Modal
          title="选择课件"
          visible={visible}
          closable={false}
          width={820}
          footer={[
            // 重点：定义右下角
            <Button
              key="submit"
              type="primary"
              onClick={this.handleOk}
              disabled={this.state.chooseList.length == 1 ? false : true}
            >
              确认
            </Button>,
          ]}
        >
          <div>
            <div>
              <Button
                onClick={() => {
                  this.changeCategory("upload");
                }}
                style={{
                  marginRight: "20px",
                  backgroundColor:
                    folderCategory == "upload" ? "black" : "white",
                  color: folderCategory == "upload" ? "white" : "black",
                }}
              >
                已上传课件
              </Button>
              <Button
                onClick={() => {
                  this.changeCategory("bought");
                }}
                style={{
                  backgroundColor:
                    folderCategory == "bought" ? "black" : "white",
                  color: folderCategory == "bought" ? "white" : "black",
                }}
              >
                已购课件
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div style={{ width: "20%" }}>
                <Select
                  defaultValue={null}
                  style={{ width: 120 }}
                  onChange={this.handleChange}
                >
                  <Option value={null}>全部课件</Option>
                  {this.state.folderList.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div style={{ width: "70%" }}>
                <Search
                  placeholder="输入课件名称搜索课件"
                  enterButton="搜索"
                  onSearch={(value) => {
                    this.selectCourse(value);
                  }}
                />
              </div>
            </div>
            {/* 内容展示 */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {this.state.courseList.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: "31%",
                    height: 100,
                    marginTop: "3.5%",
                    position: "relative",
                  }}
                  onClick={() => {
                    this.choose(item);
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: 100,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      backgroundImage: `url(https://static.yi-you.org/project/user-center/image/cover-${
                        this.state.subjectMap[item.subject]
                          ? this.state.subjectMap[item.subject]
                          : "technology"
                      }.png)`,
                    }}
                  >
                    <div>{item.name}</div>
                  </div>
                  {item.selectAuth == true ? (
                    <div>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#666666",
                          opacity: 0.7,
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      >
                        <Icon
                          type="check-circle"
                          style={{ fontSize: "50px", color: "#27D2D0" }}
                        />
                        {/* <Icon type="check-circle" /> */}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            {/* 分页 */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              {/* <Pagination current={this.state.current} pageSize={6} showQuickJumper={true}   defaultPageSize={6} onChange={this.selectChange} total={this.state.totalPage} /> */}
              <Pagination
                defaultPageSize={5}
                onChange={this.selectChange}
                total={this.state.totalPage}
              />
              {/* <Pagination defaultCurrent={6} total={500} /> */}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Baiban;
