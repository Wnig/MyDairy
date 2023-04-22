//index.js
//获取应用实例
const app = getApp()

Page({
  onAddTap: function(event) {
  wx.navigateTo({
    url: '../write/write',
  })
  },
  smileTap: function (event) {
    wx.navigateTo({
      url: '../mynote/my-note',
    })
  },
})
