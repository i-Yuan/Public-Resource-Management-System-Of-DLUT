// pages/detail/detail.js
Page({
    data: {
  index: 0,
  date: '2019-09-01',
  time_start: '08:00',
  time_end:'22:00',
  classroom:null,
  timeEnd:null
},
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time_start: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time_end: e.detail.value
    })
  },

  onLoad(option){
    this.setData({
      classroom:option.name
    })
  },

  formSubmit:function(event){
    const text=event.detail.value.text
    const timeEnd=new Date(this.data.date+' '+this.data.time_end)
    const db = wx.cloud.database()
    const student_id=getApp().globalData.id
    const student_name=getApp().globalData.name
    const phone=getApp().globalData.phone
    const borrow_time=new Date()
    db.collection('main').add({
      data: {
        classroom: this.data.classroom,
        time_start:this.data.time_start,
        time_end:this.data.time_end,
        date:this.data.date,
        student_id:student_id,
        student_name:student_name,
        phone:phone,
        borrow_time:borrow_time,
        timeEnd:timeEnd,
        state:"预约中",
        text:text,
        toShow:true
      },
      success: res => {
        wx.redirectTo({
          url: '../arcOrder/arcOrder?name='+this.data.classroom,
        })
        wx.showToast({
          title: '预定成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
});
 