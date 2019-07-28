function check_task_finished(task_text, button_text) {
    log(task_text, button_text);
    task_button = null;
    _elements = null;
    if (text(task_text).findOne(5000)) {
        _centery = text(task_text).findOne(5000).bounds().centerY();
        _elements = text(button_text).find();
    }

    if (_elements) {
        for (let _e of _elements) {
            _tmp_centery = _e.bounds().centerY();
            if (Math.abs(_centery - _tmp_centery) < 200) {//如果中心点不大于250，表示两个图标在同一个框
                task_button = _e;
                break;
            }
        }
    }
    if (!task_button) {
        toastLog(task_text + '  已完成');
        sleep(2000);
    }
    return task_button;
}

module.exports = check_task_finished;
