# weixin_baiduAPI_identify
微信小程序调用百度API实现身份证，车牌号，驾驶证，转移证识别
首先申请去百度智能云平台账户，开通创建通用文字识别的应用
将创造的appid，api_key,secret_key配置到云函数

// 云函数入口文件
const cloud = require('wx-server-sdk')
var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

cloud.init()

// 设置APPID/AK/SK
var APP_ID = "你的APP_ID";
var API_KEY = "你的API_KEY";
var SECRET_KEY = "你的SECRET_KEY";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

// 如果有可选参数
var options = {};
options["baike_num"] = "5";
