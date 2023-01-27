// pages/course/course.js
Page({
  data: {
    courseData: {}
  },
  onLoad(options) {
    const courseId = options.id
    const courseUrl = "https://www.fastmock.site/mock/3a01e0b34befd7cef6fcbfd3ab97ccf8/wechat/course/getCourse/courseId/" + courseId
    const that = this
    wx.request({
      url: courseUrl,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        that.setData({
          courseData: res.data.data
        })
      }
    })
  },
})