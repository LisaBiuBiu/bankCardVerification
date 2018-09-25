/**
 * 开发公共类
 * 1，服务端数据获取
 * 2，页面跳转
 * 参数解析
 * getData:type-请求方式，url-接口请求地址，dataJson-请求参数json封装（config参数，mbcSuc()，mbcError()）
 * href:url-跳转url
 */
let util = require('../utils/util.js');
let config = require('./config.js');
var common = {
    getData: (type, url, dataJson) => {
        wx.request({  // 请求数据
            url: url,
            method: type,
            data: dataJson.config,
            header: {
                "Content-Type": "application/json"
            },
            success: function (data) {
                //请求成功处理（公用）
                dataJson.mbcSuc(data);
            },
            fail: function (xhr) {

                //请求失败处理(公用)
                if (dataJson.mbcError) {
                    var errorThrown = '';
                    dataJson.mbcError(xhr, type, errorThrown);
                }
            }
        })
    },
    newAccredit(e) { // 新的授权
        wx.login({
            success: res => {
                wx.setStorageSync('jsCode', res.code);
                console.log(e);
                if (e.detail.userInfo) {
                    let requestData = {
                        js_code: res.code,
                        rawData: e.detail.rawData,
                        signature: e.detail.signature,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv
                    }
                    wx.setStorageSync('nickname', e.detail.userInfo.nickName);
                    wx.setStorageSync('headimgurl', e.detail.userInfo.avatarUrl);
                    wx.setStorageSync('isAccredit', true);
                    wx.setStorageSync('requestData', requestData);
                    common.requestData();
                    var pages = getCurrentPages();
                    console.log("pages", pages.length)
                    var currPage = pages[pages.length - 1];  //当前页面
                    currPage.refreshPage();
                } else {
                    common.againAccredit();
                }
            }


        })
    },
    getJsCode() { // 获得jscode
        let jsCode = '';
        wx.login({  // 获取jscode
            success: res => {
                jsCode = res.code;
                wx.setStorageSync('jsCode', res.code);
            }
        })
    },
    firstAccredit() { // 第一次授权
        common.getJsCode();
        let jsCode = wx.getStorageSync('jsCode');
        // 获取用户信息
        wx.getSetting({
            success: (res) => {
                console.log("res===============");
                console.log(res);
                wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        wx.setStorageSync('nickname', res.userInfo.nickName);
                        wx.setStorageSync('headimgurl', res.userInfo.avatarUrl);
                        let requestData = {
                            js_code: jsCode,
                            rawData: res.rawData,
                            signature: res.signature,
                            encryptedData: res.encryptedData,
                            iv: res.iv
                        }
                        wx.setStorageSync('isAccredit', true);
                        wx.setStorageSync('requestData', requestData);
                        common.requestData();
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                        }

                        var pages = getCurrentPages();
                        console.log("pages", pages.length)
                        var currPage = pages[pages.length - 1];  //当前页面
                        currPage.refreshPage();
                    },
                    fail: res => {
                        // 调用微信弹窗接口
                        wx.showModal({
                            title: '警告',
                            content: '您进行了拒绝授权操作，将不能体验美博城小程序的相关功能。点击【确定】按钮进行用户信息授权。',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    wx.openSetting({
                                        success: function (res) {
                                            if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                                                wx.getUserInfo({
                                                    success: res => {
                                                        // 可以将 res 发送给后台解码出 unionId
                                                        wx.setStorageSync('nickname', res.userInfo.nickName);
                                                        wx.setStorageSync('headimgurl', res.userInfo.avatarUrl);
                                                        let requestData = {
                                                            js_code: jsCode,
                                                            rawData: res.rawData,
                                                            signature: res.signature,
                                                            encryptedData: res.encryptedData,
                                                            iv: res.iv
                                                        }
                                                        wx.setStorageSync('isAccredit', true); // 授权成功
                                                        wx.setStorageSync('requestData', requestData);
                                                        common.requestData();
                                                        console.log("再次授权成功，获取相应用户信息！");
                                                    },
                                                    fail: (res) => {
                                                        wx.setStorageSync('isAccredit', false);  // 授权失败
                                                    }
                                                })
                                            }
                                        },
                                        fail: (res) => {
                                            wx.setStorageSync('isAccredit', false);
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    },
    requestData() { // 从后台请求接口获得unionId
        let host = require('./config.js').host;
        let url = `${host}/api/wx_center/wx_mbc_miniprogram_login`;
        let requestData = wx.getStorageSync('requestData');
        requestData.js_code = wx.getStorageSync('jsCode');
        common.getData("POST", url, {
            config: requestData,
            mbcSuc: (res) => {

                if (res.data.status === 100) {
                    wx.setStorageSync('loginData', res.data)
                    wx.setStorageSync('openId', JSON.parse(res.data.data).openId)
                    wx.setStorageSync('userId', JSON.parse(res.data.data).userId)
                    let data = JSON.parse(res.data.data);
                    data.status === '4' ? wx.setStorageSync('blacklist', true) : wx.setStorageSync('blacklist', false);
                    data.status === '5' && data.userType === '1' ? wx.setStorageSync('terminator', true) : wx.setStorageSync('terminator', false)
                    data.status === '5' && data.userType === '2' ? wx.setStorageSync('supplier', true) : wx.setStorageSync('supplier', false)
                } else if (res.data.status === 101) {
                    wx.setStorageSync('loginData', res.data)
                    wx.setStorageSync('terminator', false)
                    wx.setStorageSync('blacklist', false)
                    wx.setStorageSync('supplier', false)
                } else {
                    util.showToast('服务异常,请稍后重试！', 'none', 2000);
                    wx.setStorageSync('terminator', false)
                    wx.setStorageSync('terminator', false)
                    wx.setStorageSync('supplier', false)
                }

                var pages = getCurrentPages();
                console.log(pages[0].route);
                if (pages[0].route === 'pages/home/home' || pages[0].route === 'pages/my/my') {
                    var currPage = pages[pages.length - 1];  //当前页面
                    currPage.refreshPage();
                }

            },
            mbcError: function (xhr) {
                console.log(xhr)
            }
        })
    },
    againAccredit(callback) { // 再次授权
        common.getJsCode();
        let js_code = wx.getStorageSync('jsCode');
        wx.showModal({
            title: '警告',
            content: '您进行了拒绝授权操作，将不能体验美博城小程序的相关功能。点击【确定】按钮进行用户信息授权。',
            showCancel: false,
            success: (res) => {
                if (res.confirm) {
                    wx.openSetting({
                        success: (res) => {
                            console.log(res);
                            wx.getUserInfo({
                                success: (res) => {
                                    let requestData = {
                                        js_code: js_code,
                                        rawData: res.rawData,
                                        signature: res.signature,
                                        encryptedData: res.encryptedData,
                                        iv: res.iv
                                    }
                                    if (callback) {
                                        callback(res.userInfo.avatarUrl, res.userInfo.nickName)
                                    }
                                    wx.setStorageSync('isAccredit', true);
                                    wx.setStorageSync('nickname', res.userInfo.nickName);
                                    wx.setStorageSync('headimgurl', res.userInfo.avatarUrl);
                                    wx.setStorageSync('requestData', requestData);
                                    common.requestData()

                                }
                            })
                        },
                        fail: (res) => {
                            util.showToast('您拒绝了授权');
                            wx.setStorageSync('isAccredit', false);
                        }

                    })
                } else if (res.cancel) {
                    util.showToast('您拒绝了授权');
                    wx.setStorageSync('isAccredit', false);
                }
            }
        })
    },
    againRequestLogin(callback) { // enter接口，更新身份
        let loginData = wx.getStorageSync('loginData')
        if (loginData.data) {
            let unionId = JSON.parse(loginData.data).unionId;
            common.getData('POST', config.getRoles, {
                config: {
                    unionId: unionId
                },
                mbcSuc: (res) => {
                    util.hideToast();
                    if (res.data.status == 101 || res.data.status === 100) {
                        wx.setStorageSync('loginData', res.data)  // 替换login的状态值
                        wx.setStorageSync('userId', JSON.parse(res.data.data).userId)
                    } else {
                        util.showToast(this.data.loginData.msg || '服务异常,请稍后重试！', 'none', 2000);
                    }
                    if (callback) {
                        callback();
                    } else {
                        return
                    }

                },
                mbcError: function (xhr) {
                    util.hideToast();
                    util.showDalogNoCancel("网络异常");
                    console.log(xhr)
                }
            })
        }
    },
    //文件上传
    uploadFile: function (data) {

        var that = this;
        var fileName = data.filePath;
        console.log('fileName:' + fileName);

        var fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
        console.log('fileType:' + fileType);

        var userId = wx.getStorageSync("userId");


        var i = data.i ? data.i : 0,
            success = data.success ? data.success : 0,
            fail = data.fail ? data.fail : 0;
        wx.uploadFile({
            url: data.url,
            filePath: data.filePath,
            name: 'fileData',
            formData: {
                filename: fileName,
                filetype: fileType,
                userid: userId
            },
            header: {
                "Content-Type": "multipart/form-data"
            },
            success: (res) => {
                success++;
                data.fileUploadSuc(res);
            },
            fail: (res) => {
                fail++;
                data.fileUploadFail(res);
                console.log('fail:' + i + "fail:" + fail);
            },
        })
    },

    href: function (url) { // 跳转
        var pages = getCurrentPages();
        var len = pages.length;
        console.log("当前页面层级=====" + len)
        if (pages && len && len == 5) {
            wx.redirectTo({
                url: url
            })
        } else {
            wx.navigateTo({
                url: url
            })
        }

    },

    //获取购物车商品数量
    getShopCarGoodsNum: function (callback) {
        let currentUserId = wx.getStorageSync("userId");
        if (currentUserId == 98989898989898 || !currentUserId) {
            return;
        }
        let host = require('./config.js').host;
        let that = this;
        let requestUrl = `${host}/api/app/getCartProductCount`;

        // wx.showLoading({
        //     title: '请求中',
        // })

        that.getData('GET', requestUrl, {
            config: {
                userId: wx.getStorageSync("userId"),
            },
            mbcSuc: (res) => {
                console.log(res);
                wx.hideLoading();
                // return;
                if (res.data.status == 100) {
                    callback(res)
                } else {
                    util.showDalogNoCancel(res.data.msg);
                }
            },
            mbcError: function (xhr) {
                wx.hideLoading();
                util.showDalogNoCancel("网络异常");
                console.log(xhr)
            }
        })
    }
}
module.exports = {
    COMMON: common
}