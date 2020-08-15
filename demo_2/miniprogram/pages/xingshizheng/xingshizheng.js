// // miniprogram/pages/shenfenzheng/shenfenzheng.js

Page({
  data:{
    imagePath:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
  },
  ChooseImg(){
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
        this.xingshizhengCloud(imgbase);
        this.setData({
          imagePath:path
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  xingshizhengCloud(imgbase){
    let that=this
    wx.cloud.callFunction({
      name:'xingshizheng',
      data:{
        img:imgbase
      },
      success(res){
        console.log("识别成功",res)
        // console.log("姓名",res.result.flower.words_result['姓名'].words)
        that.setData({
          xingming:res.result.flower.words_result['所有人'].words,
          idcard:res.result.flower.words_result['号牌号码'].words,
          leixing:res.result.flower.words_result['车辆类型'].words,
          tishi:"识别成功"
        })
      },
      fail(res){
        console.log("识别失败",res)
        that.setData({
          tishi:"识别有误，请选择清晰照片"
        })
      }
    })
  }

})

