/**
 * 初始化
 * @param  {对象} options 初始化的参数
 * @return {draw对象}         [返回draw对象的引用]
 */
exports.prop = function(options) {
    this.utils = require('common/utils');
    var options = options || {};
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    return this;
}

/**
 * [lines description]
 * @param  {selector} options   canvas图形的容器，可以兼容css3中的选择器
 * @param  {vertices} options   多边形的顶点坐标，数据类型是二位数组，如三角形的话，可以这样定义[[20,50],[20,80],[50,30]]
 * @param  {strokeColor} options   多边形的填充颜色，字符串类型，可以接受英文单词，如red，或者是16进制的颜色值，如#f00，#000fff
 * @param  {stroke.lineWidth} options   描边的粗细
 * @param  {stroke.fillColor} options   描边的颜色
 * @param  {isFill} options Boolean类型，多边形是否填充颜色，默认是false
 * @param  {isClose} options Boolean类型，多边形是否封闭，默认是false
 * @param  {function} _callback 回调函数
 * @return {draw对象}           draw对象的引用
 */

exports.lines = function(options, _callback) {
    var utils = this.utils;
    var options = options || {};
    var selector = options.selector;
    var vertices = options.vertices;
    var strokeStyle = options.strokeStyle;
    var strokeColor = strokeStyle.color;
    var lineWidth = strokeStyle.lineWidth || 1;
    var isFill = options.isFill;
    var isClose = options.isClose;
    var fillColor = options.fillColor;
    var firstIMG = options.firstIMG || false;
    var canvas = this.canvas;
    var container = document.querySelector(selector);
    if (firstIMG) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    var context = this.context;
    if (context) {
        context.beginPath();
        context.moveTo(vertices[0][0], vertices[0][1]);
        for (var i = 1; i < vertices.length; i++) {
            context.lineTo(vertices[i][0], vertices[i][1]);
        }

        if (isClose) {
            context.closePath();
        }

        if (isFill) {
            context.fillStyle = fillColor;
            context.fill();
        }
        if (strokeStyle) {
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeColor;
            context.stroke();
        }

        if (_callback) {

            utils.execCallBack(_callback);
        }
    } else {
        alert('the brower is not surpport canvas');
    }
    if (!container.contains(this.canvas)) {
        container.appendChild(this.canvas);
    }
    return this;
}

exports.arc = function(options) {
    var options = options || {};
    var selector = options.selector;
    var x = options.x;
    var y = options.y;
    var radius = options.radius;
    var startAngle = options.startAngle || 0;
    var endAngle = options.endAngle || Math.PI * 2;
    var anticlockwise = options.anticlockwise || false;
    var isFill = options.isFill || false;
    var firstIMG = options.firstIMG || false;
    var strokeStyle = options.strokeStyle;
    var fillColor = options.fillColor;
    var strokeColor = strokeStyle.color;
    var lineWidth = strokeStyle.lineWidth || 1;
    var context = this.context;
    var canvas = this.canvas;
    var container = document.querySelector(selector);
    if (firstIMG) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    if (context) {
        context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        if (isFill) {
            context.fillStyle = fillColor;
            context.fill();
        }
        if (strokeStyle) {
            context.strokeStyle = strokeColor;
            context.lineWidth = lineWidth
            context.stroke();
        }
    } else {
        alert('the brower is not surpport canvas');
    }

    if (!container.contains(canvas)) {
        container.appendChild(canvas);
    }
    return this;
}
