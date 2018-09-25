/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

//uat环境 
// var host = "https://test.meibocheng.ydm01.com";
//var server_host = "https://test.ydm01.com/ydmappweb/"; 

//图片、录音上传地址
// var fileUploadHost = "https://test.weixin.ydm01.com/mmdfile";
// ocr身份证、执照文字提取地址
// var ocrHost = 'http://mp.ydm01.cn'; 测试
//var ocrHost = 'https://mp.gogobeauty.com'; // 生产

//现网生产环境
var host = "https://meibocheng.ydm01.com"; // 正式服务
// var host = "https://meibocheng.ydm01.cn"; // 测试服务
var server_host = "https://b.app.ydm01.com/ydmappweb/" 
var supplier_host = "https://s.shop.ydm01.com" // 供应商的环境


// var host = "http://192.168.30.215:4100"; // 华德的服务
// var host ="http://192.168.30.203:4100"; // 成刚的服务 
// var host = "http://192.168.30.219:4100"; // 徐勇的服务


//图片、录音上传地址
var fileUploadHost = "https://imgmmd.ydm01.com";
// ocr身份证、执照文字提取地址
var ocrHost = 'https://mp.ydm01.com';


var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 身份证文字提取接口---请求方式: "POST",请求参数："imageUrl":xxx,"card_type": 0代表正面、1代表背面
    ocrIdUrl: `${ocrHost}/api/platform/IDcardRecognition`,
    // 营业执照文字提取接口---请求方式: "POST",请求参数："imageUrl":xxx
    ocrLicenseUrl: `${ocrHost}/api/platform/licenseRecognition`,

    /** 手机绑定接口 */
    phoneBindUrl: `${host}/api`,
    /** 获取图片验证码接口 */
    getVerificationCodeUrl: `${host}/api/app/verificationCodeService`,

    /** 定制付款 */
    mbcCustomizedPrepayUrl: `${host}/api/customized_mbc/mbcCustomizedPrepay`,



    //--------------------------------------首页数据接口-------------------------------------
    /** 首页数据接口 */
    getHomeDataUrl: `${host}/api/app/index`,

    /** 店铺搜索接口 */
    getShopListUrl: `${host}/api/app/getShopList`,

    /** 店铺主页数据接口 */
    getShopDetailHomeDataUrl: `${host}/api/app/supplierHead`,

    /** 店铺关注、取消关注接口 */
    supplierCollectUrl: `${host}/api/app/supplierCollect`,



    /** 店铺商品数据接口 */
    getShopGoodsDataUrl: `${host}/api/app/supplierGoods`,

    /** 店铺banner数据接口 */
    getShopBannersDataUrl: `${host}/api/app/querySupplierBanners`,

    /** 店铺banner详情数据接口 */
    getShopBannerDetailDataUrl: `${host}/api/app/querySupplierBannerInfo`,



    //--------------------------------------每日优惠数据接口-------------------------------------
    getDailyDealDataUrl: `${host}/api/app/hotgoodslist`,

    //--------------------------------------banner页数据接口-------------------------------------
    getBannerDataUrl: `${host}/api/app/queryAdsenseInfo`,

    //--------------------------------------订单数据接口-------------------------------------
    getOrderDataUrl: `${host}/api/app/getOrderListNew`, //订单列表
    getOrderDetailsDataUrl: `${host}/api/app/getOrderMessageNew`, //订单详情
    getOrderCancelData: `${host}/api/app/ordercancel`, //取消订单
    getOrderSurelData: `${host}/api/app/ordersure`, //确认订单
    getOrderEvaluateData: `${host}/api/app/orderEvaluate`, //评价订单
    buyAginGoodsDataUrl: `${host}/api/app/buyAgain`,//重新购买

    //--------------------------------------搜索数据接口-------------------------------------
    getSearchDataUrl: `${host}/api/app/search`, //搜索信息
    getHotSearchDataUrl: `${host}/api/app/queryHotSearch`, //热门搜索

    //--------------------------------------优惠券数据接口-------------------------------------
    /** 优惠券列表数据接口 */
    getCouponsListDataUrl: `${host}/api/app/queryCouponList`,
    /** 领取优惠券接口 */
    getCouponsDataUrl: `${host}/api/app/addCustomerCoupon`,
    /** 下单对应优惠券列表接口 */
    queryCalcCustomerCouponListDataUrl: `${host}/api/app/queryCalcCustomerCouponList`,
    /** 优惠券使用接口 */
    updateCustomerCouponUrl: `${host}/api/app/updateCustomerCoupon`,


    //--------------------------------------物流数据接口-------------------------------------
    getLogisticsDataUrl: `${host}/api/express/findCargoStatus`,

    //--------------------------------------购物车商品数量数据接口-------------------------------------
    getShopCarGoodsNumDataUrl: `${host}/api/app/getCartProductCount`,

    /** 商品详情数据接口 */
    getGoodsDetailDataUrl: `${host}/api/app/goods_detail`,
    /** 商品收藏，取消收藏数据接口 */
    goodFavorOptionUrl: `${host}/api/app/favor_addProductNew`,

    /** 加入购物车接口 */
    addShopCartUrl: `${host}/api/app/cart_addProduct`,

    /** 商品评价数据接口 */
    getGoodsCommentDataUrl: `${host}/api/app/product_comment`,

    /** 商品评价点赞数据接口 */
    goodsCommentFavorUrl: `${host}/api/app/product_comment_favor`,

    /** 提交商品评价接口 */
    commitGoodEvaluateUrl: `${host}/api/app/orderEvaluate`,

    /** 商品评论详情(新加)接口 */
    getCommentReplyDataUrl: `${host}/api/app/productCommentDetail`,

    /** 商品评论添加回复(新加)接口 */
    commitCommentReplyUrl: `${host}/api/app/productCommentAddReply`,
    // 商品转售的接口
    productResaleUrl: `${host}/api/app/productResale`,
    //参数
    // customerId=84090 & orderId=100057&evaluates=[{ "goodsId": 1161, "starLevel": 5, "content": "sdf", "pictures": "" }]


    /** 同店推荐数据接口 */
    getSameShopGoodDataUrl: `${host}/api/app/product_same_shop`,



    //--------------------------------------分类数据接口-------------------------------------
    /** 分类主页面一级分类数据接口 */
    getSubClassDataUrl: `${host}/api/app/queryEffectiveFirstCategory`,
    /** 分类主页面二级分类数据接口 */
    getSonClassDataUrl: `${host}/api/app/queryEffectiveSecondCategory`,
    /** 分类主页面三级分类数据接口 */
    getGrandSonClassDataUrl: `${host}/api/app/queryEffectiveThirdCategory`,

    //http://test.meibocheng.ydm01.com/api/app/queryEffectiveThirdCategory?categoryId=785


    /** 分类商品列表数据接口 */
    getClassGoodsDataUrl: `${host}/api/app/queryProductNew`,


    //--------------------------------------小店数据接口-------------------------------------
    // 小店信息
    getMyShopMessageDataUrl: `${host}/api/app/getMyShopMessage`,
    // 小店设置
    modifyMyShopMessageDataUrl: `${host}/api/app/modifyMyShopMessage`,
    // 小店历史总收益
    getIncomeListDataUrl: `${host}/api/app/getIncomeList`,
    // 转售商品删除/恢复
    productResaleDeleteUrl: `${host}/api/app/productResaleDelete`,
    //小店头像的上传
    updateShopImgUrl: `${host}/api/app/updateShopImgUrl`,

    //获取用户转售标记
    getUserSellStatusUrl: `${host}/api/gogo_sell/getUserSellStatus`,

    //是否可转售校验
    checkProductSellStatusUrl: `${host}/api/gogo_sell/checkProductSellStatus`,

    //获取品牌名称
    getBrandUrl: `${host}/api/gogo_sell/getBrand`,

    //商品转售操作
    addProductSellUrl: `${host}/api/gogo_sell/addProductSell`,   



    //--------------------------------------我的数据接口-------------------------------------
    loginUrl: `${host}/api/wx_center/wx_mbc_miniprogram_login`, //登入接口
    getRoles: `${host}/api/wx_center/wx_mbc_miniprogram_unionid_enter`,// 进入我的页面获得用户的身份

    buyerAuthCodeUrl: `${host}/api/wx_mini_register/wx_mini_cus_register_sms`, // 采购商或普通用户获得验证码
    providerAuthCodeUrl: `${host}/api/wx_mini_register/wx_mini_sup_register_sms`, //供应商 获得验证码
    supplierRegisterICUrl: `${host}/api/wx_mini_register/wx_register_supplier_bind_check`, // 供应商提交验证码并验证
    commonRegisterUrl: `${host}/api/wx_mini_register/wx_register_cus_bind_check`, // 普通用户绑定
    bindShopUrl: `${host}/api/wx_mini_register/wx_register_pur_bind_check`, // 采购商点击绑定获得可供绑定的店铺
    sureShopUrl: `${host}/api/wx_mini_register/wx_register_pur_bind_check_sel_res`, // 确定选择的店铺
    // drpCountFlag: `${host}/api/app/mySmallShop`, // 判断我的小店数量
    // optionalShopUrl:`${host}/api/wx_mini_register/wx_register_pur_sel`, // 身份切换---可供选择的店铺


    getRolesItemUrl: `${host}/api/wx_mini_register/wx_register_individual_types_ret`, // 得到可供选择的身份
    sureRolesChangeShopUrl: `${host}/api/wx_mini_register/wx_register_individual_sel`, // 确定身份后店铺切换
    sureOptionalShopUrl: `${host}/api/wx_mini_register/wx_register_individual_sel_res`, // 店铺切换点击确定

    submitBuyerInformation: `${host}/api/wx_mini_register/wx_register_purchaser`, // 采购商入驻提交资料
    submitProviderInformation: `${host}/api/wx_mini_register/wx_register_supplier`, // 供应商入驻提交资料

    submitBuyerUpgradeInformation: `${host}/api/wx_mini_register/wx_register_purchaser_upgrade`, // 普通用户采购商升级提交资料
    submitProviderUpgradeInformation: `${host}/api/wx_mini_register/wx_register_supplier_upgrade`, // 普通用户供应商升级提交资料
    upgradeProvider: `${host}/api/wx_mini_register/wx_register_supplier_check_dup`, // 普通用户、采购商升级供应商
    getPurchaserInfo: `${host}/api/wx_mini_register/wx_register_purchaser_query`, // 得到采购商的资料
    getSupplierInfo: `${host}/api/wx_mini_register/wx_register_supplier_query`, // 得到供应商的资料
    collectGoods: `${host}/api/app/mycollectobjectNew`, // 商品收藏的列表
    collectShop: `${host}/api/app/mycollectsever`, // 店铺收藏列表
    joinShopCar: `${host}/api/app/addProductToCart`, // 收藏页面将商品加入购物车
    purchaseAloneUrl: `${host}/api/app/purchaseAloneNew`, // 购物车列表
    goodsCarDeleteNumUrl: `${host}/api/app/purchaseDeleteNumNew`, // 购物车删除商品
    editGoodsNum: `${host}/api/app/purchaseEditNumNew`, // 修改购物车数量
    changeGoodsNum: `${host}/api/app/purchaseChangeNumNew`, // 增减购物车里面的商品
    goToPay: `${host}/api/app/queryOrderProductMessConfirmNew`, //确认订单页面，查询要购买的商品
    getFeightUrl: `${host}/api/app/getTransportFeeNew`, // 获得运费
    creatOrderNoUrl: `${host}/api/app/creatOrderNoFC`, // 去支付
    queryCouponMsg: `${host}/api/app/queryCouponMsg`, // 消息-- 平台公告
    orderMessageUrl: `${host}/api/app/getSystemNotificationList`, // 消息 -- 交易信息



    //confirmPay: `${host}/api/wx_center/testPrepay`, // 确认支付 测试
    confirmPay: `${host}/api/wx_center/orderPrepay`, // 确认支付 正式

    listAddressUrl: `${host}/api/app/listAddr`,  // 收货地址
    deletedAddressUrl: `${host}/api/app/delAddr`, // 删除地址
    editAddrUrl: `${host}/api/app/editAddr`, // 新增或编辑地址
    setDefaultAddress: `${host}/api/app/editAddressDefault`, // 设置为默认地址
    getAddrDetailUrl: `${host}/api/app/getAddrDetail`, // 编辑地址时获得地址详情
    queryCouponListUrl: `${host}/api/app/queryCustomerCouponList`, // 卡券列表
    //appid	是	小程序唯一标识
    //secret	是	小程序的 app secret
    //js_code	是	登录时获取的 code
    //grant_type	是	填写为 authorization_code

    //小程序唯一标识
    appid: "wx0a8fcfcfbca8417f",
    //小程序的 app secret 
    secret: "32d763c062496fa0793bfb01c011dd8d",
    //填写为 authorization_code
    grant_type: "authorization_code",


    //每页加载多少行数据
    pageCount: "10",

    fileUploadUrl: `${fileUploadHost}/api/file_service/uploadFile_wx_miniprogram`

};

module.exports = config