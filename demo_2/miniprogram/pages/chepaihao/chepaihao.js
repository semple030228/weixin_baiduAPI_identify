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
        this.chepaihaoCloud(imgbase);
        this.setData({
          imagePath:path
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  chepaihaoCloud(imgbase){
    let that=this
    wx.cloud.callFunction({
      name:'chepaihao',
      data:{
        img:imgbase
      },
      success(res){
        console.log("识别成功",res)
        // console.log("姓名",res.result.flower.words_result['姓名'].words)
        that.setData({
          chepaihao:res.result.flower.words_result[0].number,
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

