// miniprogram/pages/init/init.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    student_name: '',
    student_number: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  

    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('users').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        if (res.data.length === 0)
          console.log('请注册')
        else {
          console.log('[数据库] [查询记录] 成功: ', res)
          wx.navigateTo({
            url: '../index/index',
          })
        }
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  regeist: function(e) {
    student_name = e.value.student_name,
      student_id = e.value.student_id
    const db = wx.cloud.database()
    db.collection('users').add({
      data: {
        student_name: student_name,
        student_id: student_id
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id

        wx.showToast({
          title: '注册成功',
        })
        wx.navigateTo({
          url: '',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  queryOrder: function(event) {
    current_id: event.target.id
    const db = wx.cloud.database()
    db.collection('main').where({
      classroom: current_id,
      state: "预约中" || "已批准"
    }).get({
      success: res => {
        this.setData({

          queryResult: res.data
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
    })
  },

  queryUsers: function() {
    const db = wx.cloud.database()
    db.collection('main').orderBy('classroom,asc').orderBy('time_borrow', 'asc').where({
      state: "预约中"
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data
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
    })
  },

  order: function(event) {
    const db = wx.cloud.database()
    current_id: event.target.id
    db.collection('main').add({
      data: {
        classroom: current_id

      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  allow: function(event) {
    const db = wx.cloud.database()
    order_id: event.target.id
    db.collection('main').doc(order_id).update({
      data: {
        state: "已批准"
      },
      success: res => {},
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  deny: function(event) {
    const db = wx.cloud.database()
    order_id: event.target.id
    db.collection('main').doc(order_id).update({
      data: {
        state: "已拒绝"
      },
      success: res => {},
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  }


})