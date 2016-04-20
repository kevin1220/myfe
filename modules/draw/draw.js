exports.lines = function(options, _callback) {
    var utils = require('common/utils');
    var options = options || {};
    var selector = options.selector;
    var vertices = options.vertices;
    // console.log(vertices.length);
    var strokeColor = options.strokeStyle.color;
    var lineWidth = options.strokeStyle.lineWidth || 1;
    var isFill = options.isFill || false;
    var isClose = options.isClose || false;
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
        ctx.lineWidth = lineWidth;
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
exports.rect = function(options) {
    
}
