// 云函数入口文件
const cloud = require('wx-server-sdk')
var AipImageClassifyClient = require("baidu-aip-sdk").ocr;

cloud.init()

// 设置APPID/AK/SK
var APP_ID = "21513445";
var API_KEY = "SMMouqxkVebCIfQjceEGtzqS";
var SECRET_KEY = "g0n6EQP2LvG7a0fMBrWXfw1vuAPolVUZ";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

// 如果有可选参数
var options = {};
options["detect_direction"] = "true";
options["accuracy"] = "normal";

// 云函数入口函数
exports.main = async (event, context) => {
  let flower = await AIflower();
  // console.log(flower);
  return{
    flower
  }

  // 定义AIflower函数
  // event.img图片必须是base64编码的
  function AIflower(){
    return new Promise((resolve,reject) => {
      // 带参数调用植物识别
      client.vehicleLicense(event.img, options)
      .then((res) => {
        resolve(res);
      //  resolve(JSON.stringify(res));
      })
      .catch((err) => {
        // 如果发生网络错误
        reject(err);
      });
    })
  }
}