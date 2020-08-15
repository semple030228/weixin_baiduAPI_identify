// // miniprogram/pages/shenfenzheng/shenfenzheng.js

Page({
  data:{
    imagePath:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
  },
  ChooseImg(){
    let that = this
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
        that.jiashizhengCloud(imgbase);
        that.setData({
          imagePath:path
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },


  jiashizhengCloud(imgbase){
    let that=this
    wx.cloud.callFunction({
      name:'jiashizheng',
      data:{
        img:imgbase
      },
      success(res){
        console.log("识别成功",res)
        console.log(typeof res)
        console.log(typeof res.result.flower.words_result)
        console.log(JSON.stringify(res).indexOf(JSON.stringify(res.result.flower.words_result)))
        if(JSON.stringify(res).indexOf(JSON.stringify(res.result.flower.words_result))==-1){
          console.log("失败执行")
          that.setData({
            xingming:"",
            idcard:"",
            zhunjiachexing:"",
            youxiaoqizhi:"",
            tishi:"识别失败，失败提示："+res.result.flower.error_msg
          })
          // 进行动态的操作
        }
        // console.log("姓名",res.result.flower.words_result['姓名'].words)
        if(JSON.stringify(res).indexOf(JSON.stringify(res.result.flower.words_result))== 69){
          console.log("成功执行")
          that.setData({
            xingming:res.result.flower.words_result['姓名'].words,
            idcard:res.result.flower.words_result['证号'].words,
            zhunjiachexing:res.result.flower.words_result['准驾车型'].words,
            youxiaoqizhi:res.result.flower.words_result['至'].words,
            tishi:"识别成功"
          })
          // 进行动态的操作
        }
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

