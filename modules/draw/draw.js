exports.line = function(options, _callback) {
    var utils = require('common/utils');
    var options = options || {};
    this.selector = options.selector;
    var startx = options.startx;
    var starty = options.starty;
    var endx = options.endx;
    var endy = options.endy;
    var strokeColor = options.strokeColor;
    if (!this.canvas) {
        this.canvas = document.createElement('canvas');
    }
    if (!this.container) {
        this.container = document.querySelector(this.selector);
    }
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.moveTo(startx, starty);
        this.ctx.lineTo(endx, endy);
        this.ctx.strokeStyle = strokeColor;
        this.ctx.stroke();
        if (_callback) {
            utils.execCallBack(_callback);
        }
    } else {
        alert('the brower is not surpport canvas');
    }
    if (!this.container.contains(this.canvas)) {
        this.container.appendChild(this.canvas);
    }
}
exports.triangle = function(options) {
    var that = this;
    var options = options || {};
    var xa = options.xa;
    var ya = options.ya;
    var xb = options.xb;
    var yb = options.yb;
    var xc = options.xc;
    var yc = options.yc;
    var ctx = that.ctx;
    that.selector = options.selector;
    var fillColor = options.fillColor;
    var strokeColor = options.strokeColor;
    ctx.beginPath();
    t
}
