exports.lines = function(options, _callback) {
    var utils = require('common/utils');
    var options = options || {};
    var selector = options.selector;
    var vertices = options.vertices;
    // console.log(vertices.length);
    var strokeColor = options.strokeColor;
    var isFill = options.isFill||false;
    var isClose = options.isClose||false;
    var fillColor = options.fillColor;
    var canvas = document.createElement('canvas');
    var container = document.querySelector(selector);
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.beginPath();
        ctx.moveTo(vertices[0][0], vertices[0][1]);
        for (var i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i][0], vertices[i][1]);
        }
        if (isClose) {
            ctx.closePath();
        }
        if (isFill) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        if (_callback) {
            utils.execCallBack(_callback);
        }
    } else {
        alert('the brower is not surpport canvas');
    }
    if (!container.contains(canvas)) {
        container.appendChild(canvas);
    }
}
exports.triangle = function(options) {
    var options = options || {};
    var xa = options.xa;
    var ya = options.ya;
    var xb = options.xb;
    var yb = options.yb;
    var xc = options.xc;
    var yc = options.yc;
    var ctx = ctx;
    selector = options.selector;
    var fillColor = options.fillColor;
    var strokeColor = options.strokeColor;
    ctx.beginPath();

}
