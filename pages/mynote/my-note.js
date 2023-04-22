//my-note.js
const app = getApp()

Page({
  data: {
    artList: [],
    artCon: [],
    getYArry: [],
    getMArry: [],
    getMArrys: [],
    getDayArry: [],
    getDayArrys: [],
    editIndex: 0,
    delBtnWidth: 11//删除按钮宽度单位（rpx）
  },
  onLoad: function (options) {
     this.showData();
  },
  showData: function(e) {
    var that = this;
    wx.request({
      url: 'http://mywxpro.duapp.com/pages/php/dairy.php?action=list',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var getYArry = [];
        var getMArrys = [];
        var cons = [];

        for (var i = 0; i < res.data.length; i++) {
          getYArry[i] = res.data[i].d_time.substring(0, 4);
          getMArrys[i] = res.data[i].d_time.substring(0, 7);
          cons[i] = res.data[i].d_con.replace(/\n/g, " ");
        };

        //去重
        Array.prototype.unique = function () {
          var rest = [];
          var json = {};
          for (var i = 0; i < this.length; i++) {
            if (!json[this[i]]) {
              rest.push(this[i]);
              json[this[i]] = 1;
            }
          }
          return rest;
        }

        that.setData({
          artList: res.data,
          yearList: getYArry.unique(),
          monthLists: getMArrys.unique(),
          artCon: cons
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
  touchS: function (e) { //手指刚放到屏幕触发
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX //记录触摸起始位置的X坐标
      });
    }
  },
  touchM: function (e) { //触摸时触发，手指在屏幕上每移动一次，触发一次
    var that = this;
    if (e.touches.lenght == 1) {
      var moveX = e.touches[0].clientX; //记录触摸点位置的X坐标
      var disX = that.data.startX - moveX; //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var delBtnWidth = that.data.delBtnWidth; //delBtnWidth 为右侧按钮区域的宽度
      var txtStyle = '';
      var delStyle = '';

      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = 'margin-left: 0%';
        delStyle = 'z-index: -1';
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "margin-left: 0%";
        delStyle = 'z-index: -1';
        if (disX >= delBtnWidth) {
          txtStyle = "margin-left: -" + delBtnWidth + "%"; //控制手指移动距离最大值为删除按钮的宽度
          delStyle = 'z-index: 1';
        }
      }

      //获取手指触摸的是哪个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.artList;
      console.log(list);
      list[index].txtStyle = txtStyle; //将拼接好的样式设置到当前item中
      list[index].delStyle = delStyle;
      this.setData({ //更新列表的状态
        artList: list
      });
    }
  },
  touchE: function(e) {
    var that = this;
    if(e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX; //手指移动结束后触摸点位置的X坐标
      var disX = that.data.startX - endX; //触摸开始与结束，手指移动的距离
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = disX > delBtnWidth / 2 ? "margin-left: -" + delBtnWidth + "%" : "margin-left: 0%"; //如果距离小于删除按钮的1/2，不显示删除按钮
      var delStyle = disX > delBtnWidth / 2 ? "z-index: 1" : "z-index: -1"; //如果距离小于删除按钮的1/2，不显示删除按钮
      //获取手指触摸的是哪个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.artList;
      list[index].txtStyle = txtStyle; //将拼接好的样式设置到当前item中
      list[index].delStyle = delStyle;
      this.setData({ //更新列表的状态
        artList: list
      });
    }
  },
  delSel: function(e) {
    var that = this;
    wx.request({
      url: 'http://mywxpro.duapp.com/pages/php/dairy.php?action=del',
      method: 'POST',
      data: {'d_id': e.currentTarget.dataset.id},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.showData();
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
  inNote: function(e) {
    var getId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../note/note?getId=' + getId
    });
  },
  cancelTap: function(e) {
    wx.navigateBack({
      delta: 1
    });
  }
})