// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      result:null,
  },

jumptodetail(event){
  wx.navigateTo({
    url: '../admdetail/admdetail?id='+event.currentTarget.id
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('main').orderBy('classroom','asc').orderBy('time_borrow', 'asc').where({
      state: "预约中"
    }).get({
      success: res => {
        this.setData({
          result: res.data
        })
        console.log('test', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  allow: function (event) {
    const db = wx.cloud.database()
    const order_id= event.currentTarget.id
    db.collection('main').doc(order_id).update({
      data: {
        state: "已批准",
        toShow:true
      },
      success: res => {this.refresh() },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  deny: function (event) {
    const db = wx.cloud.database()
    const order_id= event.currentTarget.id
    db.collection('main').doc(order_id).update({
      data: {
        state: "已拒绝",
        toShow:false
      },
      success: res => {this.refresh() },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  refresh:function(){
    const db = wx.cloud.database()
    db.collection('main').orderBy('classroom', 'asc').orderBy('time_borrow', 'asc').where({
      state: "预约中"
    }).get({
      success: res => {
        this.setData({
          result: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }
})