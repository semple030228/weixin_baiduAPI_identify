// miniprogram/pages/find/find.js
Page({

  GoToshenfenzheng(){
    wx.navigateTo({
      url: '/pages/shenfenzheng/shenfenzheng',
    })
  },

  GoTojiashizheng(){
    wx.navigateTo({
      url: '/pages/jiashizheng/jiashizheng',
    })
  },
  GoToxingshizheng(){
    wx.navigateTo({
      url: '/pages/xingshizheng/xingshizheng',
    })
  },
  GoTochepaihao(){
    wx.navigateTo({
      url: '/pages/chepaihao/chepaihao',
    })
  }
  
})