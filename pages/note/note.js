//my-note.js
var util = require('../../utils/util.js'); 
const app = getApp()

Page({
  data: {
    time: '',
    heightCon: '',
    notes: {},
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          heightCon: (res.windowHeight - 130) * 2
        })
      }
    });

    var getId = options.getId;

    wx.request({
      url: 'http://mywxpro.duapp.com/pages/php/dairy.php?action=detail',
      method: 'POST',
      data: { 'd_id': getId },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          notes: res.data,
          time: res.data[0].d_time.substring(0, 4) + '.' + res.data[0].d_time.substring(5, 7) + '.' + res.data[0].d_time.substring(8, 10)
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '操作失败',
          icon: 'fail',
          duration: 1000,
          mask: true
        })
      },
      complete: function (res) {
      }
    })
  },
  backTap: function (e) {
    wx.navigateBack({
      delta: 1
    });
  }
})