let check_task_finished = require('../lib/util.js');

function read(total_time) {
    click(756, 2169);//任务矩形框[648,2148][864,2190]
    sleep(1000);
    text("元").waitFor();

    task_button = check_task_finished("阅读文章或视频", "去阅读");
    if (!task_button) return;
    task_button.click();
    sleep(3000);

    videos = text("视频").find();
    for (let v of videos) {
        sleep(1000);
        if (v.bounds().centerY() * 2 < device.height) {
            click(v.bounds().centerX(), v.bounds().centerY());
            sleep(2000);
        }
    }

    while (total_time > 0) {
        click(108, 2169);//首页矩形框[0,2148][216,2190]，刷新新闻
        sleep(5000);

        click(540, 600);//第一条视频矩形框
        sleep(60000);
        total_time = total_time - 60000;
        continue;

        click(540, 487);//第一条新闻矩形框[45,399][1035,535]
        sleep(3000);

        swipe_count = random(5, 8);//随机向下滑动N次
        while (swipe_count > 0) {
            swipe(random(300, 500), random(1500, 1800), random(300, 500), random(400, 700), random(500, 1500));
            sleep(random(1000, 3000));//模拟阅读N秒
            up_time = 0;
            if (random() < 0.1) {
                swipe(300, 700, 500, 1500, 1000);
                sleep(random(1000, 3000));
                up_time = 3000;
            }
            total_time = total_time - 3000 - up_time;
            swipe_count--;
        }
        back();
        sleep(random(1000, 3000));
    }
}

function search() {
    click(756, 2169);//任务矩形框[648,2148][864,2190]
    sleep(1000);
    text("元").waitFor();

    task_button = check_task_finished("搜索内容5次", "去搜索");
    if (!task_button) return;
    task_button.click();
    sleep(3000);

    _count = 5;
    while (_count > 0) {
        click(1000, 165);//搜索矩形框[918,123][1080,207]
        sleep(random(3000, 5000));
        _count--;
    }
    //返回首页
    back();
    sleep(1000);
    back();
    sleep(1000);
}

function share() {
    click(756, 2169);//任务矩形框[648,2148][864,2190]
    sleep(1000);
    text("元").waitFor();

    task_button = check_task_finished("晒收入", "去分享");
    if (!task_button) return;
    task_button.click();
    sleep(3000);

    _count = 3;
    while (_count > 0) {
        click(557, 1286); //微信图标矩形框[507,1215][603,1356]
        sleep(2000);
        click(913, 614);
        sleep(2000);
        _count--;
    }
    click(945, 340);
    sleep(2000);
}

function recommend() {
    click(756, 2169);//任务矩形框[648,2148][864,2190]
    sleep(1000);
    text("元").waitFor();

    task_button = check_task_finished("点击搜索框推荐词", "查看示例");
    if (!task_button) return;

    _count = 5;
    while (_count > 0) {
        click(108, 2169);//首页矩形框[0,2148][216,2190]，刷新新闻
        sleep(5000);
        click(534, 165);//搜索框[234,111][834,219]
        sleep(2000);
        click(270, 311);//第一搜索词矩形框[0,254][540,368]
        sleep(2000);
        click(78, 165);//返回矩形框[42,129][114,201]
        sleep(1000);
        click(78, 165);//返回矩形框[42,129][114,201]
        sleep(1000);
        _count--;
    }
}


function box() {
    click(756, 2169);//任务矩形框[648,2148][864,2190]
    sleep(1000);
    text("元").waitFor();
    _icon = textStartsWith("0时").findOne(5000);
    if (_icon) {
        toastLog("[宝箱]冷却中");
        return;
    }
    text("开宝箱得金币").findOne(5000).click();
    sleep(3000);

    click(550, 1510);//看完视频再领900金币
    sleep(20000);
    text("关闭广告").findOne(10000).click();//关闭广告矩形框[792,159][1059,255]
    sleep(2000);
}

function sleeping() {
    click(756, 2169);//任务矩形框[648,2148][864,2190]
    sleep(1000);
    text("元").waitFor();

    let _time = new Date();
    _hour = _time.getHours();
    if (_hour > 10 && _hour < 20) {//大于10点必然保证睡满十个小时了，可以收取能量
        task_button = check_task_finished("睡觉赚金币 可领", "去领取");
        if (!task_button) return;
        task_button.click();
        sleep(3000);

        shuixing = text("我睡醒了").findOne(5000);
        if (shuixing) {
            shuixing.click();
            sleep(2000);
        }
        lingqu = textMatches("领取\\d+金币").findOne(5000);
        log("领取金币", lingqu);
        if (lingqu) {
            lingqu.click();
            sleep(2000);
        }
        back();
        sleep(2000);
    }
    if (_hour > 20 || _hour < 2) {//在20:00-2:00时间段开始睡觉
        task_button = check_task_finished("睡觉赚金币", "去领取");
        if (!task_button) return;
        task_button.click();
        sleep(3000);

        text("我要睡了").findOne(5000).click();
        sleep(2000);
        back();
        sleep(2000);
    }
}


function walking() {
    let _time = new Date();
    _hour = _time.getHours();
    if (_hour < 21) return;//9点以后再收取

    click(756, 2169);//任务矩形框[648,2148][864,2190]
    sleep(1000);
    text("元").waitFor();

    task_button = check_task_finished("走路赚金币", "去查看");
    if (!task_button) return;
    task_button.click();
    sleep(3000);

    click(550, 1056);//领取980金币矩形框[150,1014][930,1098]
    sleep(2000);
    back();
    sleep(2000);
}


function toutiao() {
    const app_name = "com.ss.android.article.lite";
    return {
        exec: function (total_time) {
            launch(app_name);
            sleep(6000);
            text("首页").waitFor();
            read(total_time);
            box();
            search();
            share();
            recommend();
            sleeping();
            walking();
            back();
            back();
            sleep(2000);
        }
    }
}

module.exports = toutiao;
