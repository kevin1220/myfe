module.exports = {
    /**
     * 传入一个回调函数名,和参数，判断是否是函数，如果是，则回调
     * @param  {String} a 函数名
     * @param  {字符串,也可以是json字符串} b 回调函数的参数
     * @return {[type]}   [description]
     */
    execCallBack: function(a, b) {
        var params = b || {};
        if (this.isfun(a)) {
            a.call(this, params);
        }
    },
    execCB: function(a, err, b) {
        var params = b || {};
        if (this.isfun(a)) {
            a.call(this, err, params);
        }
    },
    isfun: function(a) {
        if (typeof a === 'function') {
            return true;
        }
    },
    guid: function() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    },
    getVerifyCode: function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(8).substring(2);
    },
}
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息   
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad    
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
        };
    },
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    isMobile: function() {
        if (browser.versions().mobile || browser.versions().ios || browser.versions().android ||
            browser.versions().iPhone || browser.versions().iPad) {
            return true;
        }else{
            return false;
        }
    }
};
HTMLElement.prototype.css = function(styles) {
    for (style in styles) {
        this.style.setProperty(style, styles[style]);
    }
};
HTMLImageElement.prototype.move = function(){

}

