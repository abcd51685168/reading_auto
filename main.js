/*
 * @Author: chy
 * @Last Modified by: chy
 * @Last Modified time: 2019-07-28 08:44:22
 * @Description: 自动阅读新闻赚金币
 */

/***********************
 * 初始化
 ***********************/
// 检查手机是否开启无障碍服务
auto();

// 请求截图权限
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

// 检查脚本是否重复运行
engines.all().slice(1).forEach(script => {
    if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
        toastLog("脚本正在运行中");
        engines.myEngine().forceStop();
    }
});

// 加载本地配置
let config = storages.create("ant_forest_config");
if (!config.contains("color_offset")) {
    toastLog("请完善配置后再运行");
    engines.execScriptFile("./config.js");
    engines.myEngine().forceStop();
}

//先解锁
let Automator = require("./lib/Automator.js");
let Unlock = require("./lib/Unlock.js");
let automator = Automator();
let unlock = Unlock(automator);
unlock.exec();

total_time = 5 * 60 * 1000;
require('./app/toutiao_lite.js')().exec(total_time);
require('./app/quwenkankan.js')().exec(total_time);
require('./app/taoxinwen.js')().exec(total_time);

let apps = files.listDir("./app");
// apps.forEach(function (_e) {
//     log('开始运行  ' + _e);
//     try {
//         let thread = threads.start(function () {
//             /*if (_e === "quwenkankan.js")*/ require('./app/' + _e)().exec(5 * 60 * 1000);
//         });
//         thread.join(10 * 60 * 1000);
//     } catch (e) {
//         log(e)
//     }
// });