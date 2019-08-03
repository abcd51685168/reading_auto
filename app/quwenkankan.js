let check_task_finished = require('../lib/util.js');

function yuedu(total_time) {
    click(130, 2200);//首页矩形框
    sleep(2000);
    swipe(500, 1700, 500, 700, 200);
    sleep(2000);
    while (total_time > 0) {
        swipe(500, 1700, 500, 700, 200);
        sleep(1000);
        swipe(500, 1700, 500, 700, 200);
        sleep(2000);
        click(500, 500);//第一条新闻矩形框

        for (let i = 0; i < random(3, 5); i++) {
            swipe(random(300, 500), random(1500, 1800), random(300, 500), random(400, 700), random(500, 1500));
            sleep(random(2000, 4000));//模拟阅读N秒
            up_time = 0;
            if (random() < 0.1) {
                swipe(300, 700, 500, 1700, 200);
                sleep(random(1000, 3000));
                up_time = 3000;
            }
            total_time = total_time - 4000 - up_time;
        }
        back();
        sleep(random(1000, 3000));
        back();
        sleep(random(1000, 3000));
    }
}


function shipin(total_time) {
    click(380, 2200);//视频矩形框
    sleep(2000);

    while (total_time > 0) {
        swipe(500, 1700, 500, 700, 200);
        sleep(2000);
        click(500, 500);//第一条新闻矩形框
        sleep(random(20000, 25000));
        total_time = total_time - 25000;

        back();
        sleep(random(1000, 3000));
    }
}

function share() {
    click(690, 2200);//任务矩形框
    sleep(2000);
    text("日常任务").waitFor();

    task_button = check_task_finished("打开小程序分享到微信群", "去打开");
    if (!task_button) return;
    task_button.click();
    sleep(10000);
    back();
    sleep(2000);
    back();
    sleep(2000);
}

function jilishipin() {
    click(690, 2200);//任务矩形框
    sleep(2000);
    text("日常任务").waitFor();

    if (text("5/5").findOne(3000)) return;
    task_button = check_task_finished("看激励视频", "去观看");
    if (!task_button) return;
    task_button.click();
    sleep(35000);
    id("tt_video_ad_close").findOne(5000).click();
    sleep(1000);
}

function search() {
    click(690, 2200);//任务矩形框
    sleep(2000);
    text("日常任务").waitFor();

    task_button = check_task_finished("搜索20次", "去搜索");
    if (!task_button) return;
    task_button.click();
    sleep(2000);

    click(980, 150);//搜索按钮
    sleep(3000);
    click(570, 670);
    sleep(3000);
    for (let i = 0; i < random(3, 5); i++) {
        swipe(random(300, 500), random(1500, 1800), random(300, 500), random(400, 700), random(500, 1500));
        sleep(random(2000, 4000));//模拟阅读N秒

    }
    back();
    sleep(2000);
    back();
    sleep(2000);
    back();
    sleep(2000);
}

function toutiao() {
    const app_name = "com.ironman.zzxw";
    return {
        exec: function (total_time) {
            launch(app_name);
            sleep(6000);
            back();
            text("我").waitFor();
            jilishipin();
            yuedu(total_time);
            shipin(total_time);
            share();
            back();
            back();
            sleep(2000);
        }
    }
}

module.exports = toutiao;
