Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: null,
    arcName:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    const openid = getApp().globalData.openid
    this.data.arcName=options.name
    console.log(this.data.arcName)
    db.collection('main').orderBy('time_borrow', 'asc').where({
      classroom:this.data.arcName,
      toShow:true
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

  order:function(){
    wx.redirectTo({
      url: '../detail/detail?name='+this.data.arcName,
    })
  }
})