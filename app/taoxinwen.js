let check_task_finished = require('../lib/util.js');

function fenhong() {//分红金币领取
    if (textMatches("待领\\d+金币").findOne(1000)) {
        click(530, 2169);//分红矩形框[498,2145][582,2190]
        sleep(3000);
    }
    text("收益金币").find().forEach(function (_e) {
        click(_e.bounds().centerX(), _e.bounds().centerY());
        sleep(1000);
    });

}

function lungqu() {//任务大厅领取
    click(756, 2169);//任务矩形框[686,2145][826,2190]
    sleep(3000);

    if (text("晒一晒").findOne(3000)) {
        click(915, 741);//叉叉的矩形框[879,705][951,777]
        sleep(2000);
    }

    if (text("领取").findOne(3000)) {
        text("领取").findOne(3000).click();
        sleep(2000);
    }
}

function read(total_time) {
    click(563,283);//视频矩形框
    sleep(2000);
    // _icon = text("去阅读").findOne(5000);
    // if (!_icon) {
    //     toast("[阅读文章或视频]已完成");
    //     sleep(2000);
    //     return;
    // }
    // _icon.click();
    // sleep(3000);
    //
    // videos = text("视频").find();
    // for (let v of videos) {
    //     sleep(1000);
    //     if (v.bounds().centerY() * 2 < device.height) {
    //         click(v.bounds().centerX(), v.bounds().centerY());
    //         sleep(2000);
    //     }
    // }

    while (total_time > 0) {
        click(280, 2200);//首页矩形框[0,2148][216,2190]，刷新新闻
        sleep(5000);
        click(500, 1300);//第一条视频矩形框
        sleep(35000);
        total_time = total_time - 35000;
        back();
        sleep(2000);
        continue;

        click(540, 487);//第一条新闻矩形框[45,399][1035,535]
        sleep(3000);

        quanwen = text("展开全文").findOne(5000);
        tuijian = text("相关推荐").findOne(3000);
        if (!quanwen || !tuijian) {
            back();
            sleep(random(1000, 3000));
            continue;
        }

        tuijian_y = tuijian.bounds().centerY();
        quanwen_flag = true;
        while (tuijian_y + 1000 > device.height) {
            tuijian_y = text("相关推荐").findOne(3000).bounds().centerY();

            swipe(random(300, 500), random(1500, 1800), random(300, 500), random(400, 700), random(500, 1500));
            sleep(random(2000, 4000));//模拟阅读N秒
            if (quanwen_flag) {
                _y = text("展开全文").findOne(5000).bounds().centerY() + 40;
                if (_y + 200 < device.height) {
                    click(540, _y);
                    sleep(random(1000, 3000));
                    quanwen_flag = false;   //已点击展开全文按钮
                }
            }

            up_time = 0;
            if (random() < 0.1) {
                swipe(300, 700, 500, 1500, 1000);
                sleep(random(1000, 3000));
                up_time = 3000;
            }
            total_time = total_time - 6000 - up_time;
        }
        back();
        sleep(random(1000, 3000));
    }
}

function zhuanpan() {//疯狂大转盘
    click(756, 2169);//任务矩形框[648,2148][864,2190]
    sleep(1000);
    text("日常任务").waitFor();

    task_button = check_task_finished("疯狂的大转盘", "去抽奖");
    if (!task_button) return;
    task_button.click();
    sleep(3000);

    choujiang_flag = false;
    while (true) {
        count_0 = text("0").findOne(2000);//剩余抽奖次数0次
        if (count_0) break;

        click(540, 1225); //领取金币坐标
        sleep(2000);
        choujiang_flag = true;

        //5秒广告
        ad = id("close").findOne(8000);
        if (ad) {
            ad.click();//(990,155)
            sleep(1000);
            continue;
        }
        //看视频翻倍
        doub = text("观看视频 领取翻倍卡").findOne(8000);
        if (doub) {
            doub.click();
            xx = id("com.coohua.xinwenzhuan:id/tt_video_ad_close").findOne(35000);
            if (xx) {
                xx.click();
            } else {
                //点击左上角的xx, className("android.widget.ImageView")
                click(100, 180);
            }
            sleep(1000);
            continue;
        }

        back();
        sleep(1000);

        // //立即领取金币
        // get_now = text("立即领取").findOne(8000);
        // if (get_now) {
        //     get_now.click();
        //     sleep(1000);
        //     continue;
        // }
    }
    back();
    sleep(random(1000, 3000));

    //领取额外奖励
    if (choujiang_flag) {
        ["20金币", "40金币", "80金币", "100金币"].forEach(function (_e) {
            jinbi = text(_e).findOne(2000);
            if (jinbi) {
                jinbi.click();
                //立即领取金币
                get_now = text("立即领取").findOne(2000);
                if (get_now) {
                    get_now.click();
                    sleep(1000);
                }
            }
        })
    }

    back();
    sleep(random(1000, 3000));
}

function toutiao() {
    const app_name = "com.coohua.xinwenzhuan";
    return {
        exec: function (total_time) {
            launch(app_name);
            sleep(6000);
            text("我的钱包").waitFor();
            read(total_time);
            fenhong();
            lungqu();
            //zhuanpan();
            back();
            back();
            sleep(2000);
        }
    }
}

module.exports = toutiao;
