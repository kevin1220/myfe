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
HTMLElement.prototype.css = function(styles) {
    for (style in styles) {
        this.style.setProperty(style, styles[style]);
    }
};