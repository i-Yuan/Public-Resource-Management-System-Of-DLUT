// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        getApp().globalData.openid = res.result.openid
        const db = wx.cloud.database()
        db.collection('arc').get({
          success: res => {
            this.setData({
              result: res.data
            })
            console.log('[数据库] [查询记录] 成功: ', res)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        }),
        console.log(getApp().globalData.openid)


          db.collection('users').where({
            _openid: getApp().globalData.openid
          }).get({
            success: res => {
              if (res.data.length === 0) {
                wx.navigateTo({
                  url: '../register/register',
                })
              } else {
                getApp().globalData.name = res.data[0].student_name
                getApp().globalData.id = res.data[0].student_id
                getApp().globalData.phone = res.data[0].phone
                getApp().globalData.vip = res.data[0].vip
              }
              console.log('[数据库] [查询记录] 成功: ', res)
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
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })

  

  
  },

  moveToDetail(event){
    const db = wx.cloud.database()
    db.collection('users').where({
      _openid: getApp().globalData.openid
    }).get({
      success: res => {
        if (res.data.length === 0) {
          wx.navigateTo({
            url: '../register/register',
          })
        } else {
          wx.navigateTo({
            url: '../arcOrder/arcOrder' + '?name=' + event.currentTarget.id,
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
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

  }
})