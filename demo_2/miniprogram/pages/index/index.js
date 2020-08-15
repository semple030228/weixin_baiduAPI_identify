// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    answer:[],
    isShow:false,
    baikedata:'',
    animation:false,
    hidden:true,
    btnShow:false,
    noplant:false,
    noflowers:''
  },

  // 函数定义
  selectImage(){
    wx.chooseImage({
      count:1,
      // 指定只能上传压缩图
      sizeType: ['compressed'],
      sourceType: ['album','camera'],
      success: (res) => {
        // console.log(res);
        const path = res.tempFilePaths[0];
        // 解码图片base64
        var imgbase = wx.getFileSystemManager().readFileSync(path,"base64");
        // console.log(imgbase);
        // 调用云函数
        this.flowerCloud(imgbase);
        this.setData({
          imagePath:path,
          animation:true,
          btnShow:true,
          hidden:true,
          noplant:false
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  baikeShow(event){
    // console.log(event.currentTarget.dataset.itemdes);
    const baikedata = event.currentTarget.dataset.itemdes;
    this.setData({
      isShow:true,
      baikedata: baikedata
    })
  },

  cancelShow(){
    this.setData({
      isShow:false
    })
  },

  toshare(){
    let share_img = this.data.imagePath;
    let share_name = this.data.answer[0].name;
    wx.navigateTo({
      url: '../poster/poster?share_img=' + share_img + '&share_name=' + share_name,
    })
  },

  // 定义调用云函数的函数flowerCloud
  flowerCloud(imgbase){
    wx.cloud.callFunction({
      name:'flowers',
      data:{
        img:imgbase
      },
      success(res){
        console.log("识别成功",res)
      },
      fail(res){
        console.log("识别失败",res)
      }
    })
    // .then((res) => {
    //   // console.log(res);
    //   // // 将json字符串转换成json对象
    //   // let answer1 = JSON.parse(res.result.flower).result;
    //   // // map遍历
    //   // let answer = answer1.map((item) => {
    //   //   const name = item.name;
    //   //   const score = (item.score*100).toFixed(2) + '%';
    //   //   const baike = item.baike_info;
    //     return {
          
    //     }
    //   })
      // console.log(answer);
      // 判断是否为植物
    //   if((answer[0].name).indexOf('非植物') != -1){
    //     this.setData({
    //       animation:false,
    //       hidden:true,
    //       btnShow:false,
    //       noplant:true,
    //       noflowers:'没有识别到植物'
    //     })
    //   }else{
    //     this.setData({
    //       answer,
    //       animation: false,
    //       hidden: false,
    //       btnShow: false,
    //       noplant:false
    //     })
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   // 请求出现错误提示
    //   this.setData({
    //     animation: false,
    //     hidden: true,
    //     btnShow: false,
    //     noplant: true,
    //     noflowers: '网络错误 请重新上传'
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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