function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 在被引用的的js中要通过 module.exports={a:a}作为面向对象的变量输出函数如下： 
module.exports = {
    showToast: showToast,//要引用的函数 xx:xx 
    toast: toast,
    hideToast: hideToast,
    showDalogNoCancel: showDalogNoCancel,
    showDalog: showDalog,
    formatTime: formatTime,
    formatCurrency: formatCurrency,
    trim: trim,
    validatemobile: validatemobile,
    imageUtil: imageUtil,
}


//弹出toast提示框
function showToast(tips, icon, duration) {
    wx.showToast({
        title: tips,
        icon: icon,
        duration: duration
    })
}
function toast(tips) {
    wx.showToast({
        title: tips,
        icon: 'none',
        duration: 2000
    })
}
//取消toast提示框
function hideToast() {
    wx.hideToast()
}

/**
 * 弹出不带取消的对话框
 * */
function showDalogNoCancel(content) {
    wx.showModal({
        title: "提示",
        content: content,
        confirmText: "确定",
        confirmColor: "#ec6272",
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })
}
/**
 * 弹出带取消按钮的对话框
 */
function showDalog(content, callback) {
    wx.showModal({
        title: "提示",
        content: content,
        confirmText: "确定",
        cancelText: "取消",
        showCancel: true,
        success: function (res) {
            if (res.confirm) {
                callback(true);
            } else if (res.cancel) {
                callback(false);
            }
        }
    })
}

// 格式化金额
function formatCurrency(num) {
    if (num == null || num == '') {
        return '0.00';
    }
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}

//去空格
function trim(m) {

    while ((m.length > 0) && (m.charAt(0) == ' ')) {

        m = m.substring(1, m.length);
    }
    while ((m.length > 0) && (m.charAt(m.length - 1) == ' ')) {


        m = m.substring(0, m.length - 1);
    }
    return m;
}

function validatemobile(mobile) {
    if (mobile.length == 0) {
        showDalogNoCancel('请输入手机号！');
        return false;
    }
    if (mobile.length != 11) {
        showDalogNoCancel('手机号长度有误！');
        return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
        showDalogNoCancel('手机号有误！');
        return false;
    }
    wx.showToast({
        title: '校验通过！',
        icon: 'success',
        duration: 1000
    })
    return true;
}

function imageUtil(e) {
    var imageSize = {};
    var originalWidth = e.detail.width;//图片原始宽  
    var originalHeight = e.detail.height;//图片原始高  
    var originalScale = originalHeight / originalWidth;//图片高宽比  
    //console.log('originalWidth: ' + originalWidth)
    //console.log('originalHeight: ' + originalHeight)
    //获取屏幕宽高  
    wx.getSystemInfo({
        success: function (res) {
            var windowWidth = res.windowWidth;
            var windowHeight = res.windowHeight;
            var windowscale = windowHeight / windowWidth;//屏幕高宽比  
            //console.log('windowWidth: ' + windowWidth)
            //console.log('windowHeight: ' + windowHeight)
            if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
                //图片缩放后的宽为屏幕宽  
                imageSize.imageWidth = windowWidth;
                imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
            } else {//图片高宽比大于屏幕高宽比  
                //图片缩放后的高为屏幕高  
                imageSize.imageHeight = windowHeight;
                imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
            }

        }
    })
    return imageSize;
}  
