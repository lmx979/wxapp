// index.js
// 获取应用实例
const app = getApp();
Page({
  data: {
    currentNavName: "recommend", // 当前导航栏tab的名称
    currentId: 0, // 当前轮播图id
    swiperImgUrl: [], // 轮播图片地址数据
    recommendItemData: [], // 实战推荐信息数据
    searchResultArr: [], // 定义数组，用来存储搜索的结果
    // 导航栏数据
    navData: [{
        name: "recommend",
        text: "推荐",
        url: "../../resources/recommend.png",
        className: "nav-recommend"
      },
      {
        name: "project",
        text: "实战",
        url: "../../resources/project.png",
        className: "nav-project"
      },
      {
        name: "path",
        text: "路经",
        url: "../../resources/path.png",
        className: "nav-path"
      },
      {
        name: "activity",
        text: "活动",
        url: "../../resources/activity.png",
        className: "nav-activity"
      },
    ],
    activityData: [], // 活动页数据
  },
  // 导航栏点击切换
  navTab(e) {
    this.setData({
      currentNavName: e.currentTarget.dataset.name,
    })
  },
  // 轮播图切换时触发
  swiperChange(e) {
    this.setData({
      currentId: e.detail.currentItemId,
    });
  },
  // 搜索框输入时触发
  inputChange(e) {
    const inputValue = e.detail.value
    this.setData({
      searchResultArr: this.data.recommendItemData.filter((obj) => {
        const titleString = obj.content.title
        return (
          titleString.toUpperCase().includes(inputValue.toUpperCase()) || titleString.toLowerCase().includes(inputValue.toLowerCase())
        )
      })
    })
  },
  onLoad() {
    const that = this
    // 请求获取轮播图接口
    wx.request({
      url: 'https://www.fastmock.site/mock/3a01e0b34befd7cef6fcbfd3ab97ccf8/wechat/index/getSwiperData',
      header: {
        "content-type": "application/json",
      },
      success(res) {
        that.setData({
          swiperImgUrl: res.data.data.imgUrls,
        })
      }
    })
    // 请求获取实战推荐信息接口
    wx.request({
      url: 'https://www.fastmock.site/mock/3a01e0b34befd7cef6fcbfd3ab97ccf8/wechat/index/getRecommendItemData',
      header: {
        "content-type": "application/json",
      },
      success(res) {
        that.setData({
          recommendItemData: res.data.data.recommendItemData,
          searchResultArr: res.data.data.recommendItemData,
        })
      }
    })
    // 请求获取活动页数据接口
    wx.request({
      url: 'https://www.fastmock.site/mock/3a01e0b34befd7cef6fcbfd3ab97ccf8/wechat/index/getActivityData',
      header: {
        "content-type": "application/json",
      },
      success(res) {
        that.setData({
          activityData: res.data.data.urls
        })
      }
    })
  }
})