//write.js
//获取应用实例
// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js'); 
const app = getApp()

Page({
  data: {
    con: '',
    maxLen: 140,
    nowLen: 140,
  },
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime2(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });
  },
  bindText: function(e) {
    var textLen = e.detail.value.length;
    var nowLen = this.data.maxLen - textLen;
    this.setData({
      nowLen: nowLen,
      con: e.detail.value
    });
  },
  finish: function(e) {
    if (this.data.con != '') {
      wx.request({
        url: 'http://mywxpro.duapp.com/pages/php/dairy.php?action=dairys',
        data: { 'd_con': this.data.con, 'd_cons': this.data.con.replace(/\n/g, "<br />")},
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          if (res.data == 'success') {
            wx.navigateBack({
              delta: 1
            });
          } else {
            wx.showToast({
              title: '操作失败',
              icon: 'fail',
              duration: 1000,
              mask: true
            })
          };
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
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
})
