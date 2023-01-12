// pages/rank/rank.js
Page({
  data: {
    currentCategory: "project", // 当前排行类别名称
    currentDate: "week", // 当前排序条件名称
    rankData: [], // 排行数据
  },
  // 排行种类切换
  categoryChange(e) {
    this.setData({
      currentCategory: e.currentTarget.id
    })
    // 记录用户的查看种类状态
    wx.setStorageSync('statusCategory', e.currentTarget.id)
    this.onLoad()
  },
  // 排行条件切换
  dateChange(e) {
    this.setData({
      currentDate: e.currentTarget.id,
    })
    // 记录用户的查看条件状态
    wx.setStorageSync('statusDate', e.currentTarget.id)
    this.onLoad()
  },
  onLoad() {
    const that = this
    // 获取用户之前记录的查看状态
    let statusCategory = wx.getStorageSync('statusCategory') || that.data.currentCategory
    let statusDate = wx.getStorageSync('statusDate') || that.data.currentDate
    this.setData({
      currentCategory: statusCategory,
      currentDate: statusDate
    })
    // 设置请求地址
    let apiUrl = ''
    if (statusCategory == 'project') {
      if (statusDate == 'week') {
        apiUrl = 'https://www.fastmock.site/mock/3a01e0b34befd7cef6fcbfd3ab97ccf8/wechat/rank/project/week'
      } else {
        apiUrl = 'https://www.fastmock.site/mock/3a01e0b34befd7cef6fcbfd3ab97ccf8/wechat/rank/project/month'
      }
    } else if (statusCategory == 'path') {
      if (statusDate == 'week') {
        apiUrl = 'https://www.fastmock.site/mock/3a01e0b34befd7cef6fcbfd3ab97ccf8/wechat/rank/path/week'
      } else {
        apiUrl = 'https://www.fastmock.site/mock/3a01e0b34befd7cef6fcbfd3ab97ccf8/wechat/rank/path/month'
      }
    }
    // 请求排行数据
    wx.request({
      url: apiUrl,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          rankData: res.data.data
        })
      }
    })
  }
})