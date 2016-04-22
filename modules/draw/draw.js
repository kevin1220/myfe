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
        var isClose = options.isClose || false;
        var fillColor = options.fillColor;
        var firstIMG = options.firstIMG || false;
        var newobj = options.newobj || false;
        var container = document.querySelector(selector);
        var canvas = this.canvas;
        var context = this.context;
        if (context) {
            draw();


            if (_callback) {

                utils.execCallBack(_callback);
            }
        } else {
            alert('the brower is not surpport canvas');
        }
        if (!container.contains(this.canvas)) {
            container.appendChild(this.canvas);
        }

        function draw() {
            if (!newobj) {
                if (firstIMG) {
                    context.beginPath();
                    context.moveTo(vertices[0][0], vertices[0][1]);

                } else {
                    context.lineTo(vertices[0][0], vertices[0][1]);

                }
            } else {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                context.beginPath();
                context.moveTo(vertices[0][0], vertices[0][1]);

            }

            for (var i = 1; i < vertices.length; i++) {
                context.lineTo(vertices[i][0], vertices[i][1]);
            }
            if (isClose) {
                console.log('close多边形');
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
        }
        return this;
    }
    /**
     * 画圆
     * @param  {selector} options 容器的选择器，可以接受CSS3的选择器
     * @param  {x,y} options 分别是圆心的x,y坐标
     * @param  {radius} options 半径
     * @param  {startAngle} options 开始的弧度，默认0°
     * @param  {endAngle} options 结束的弧度，默认Math.PI * 2，即360°
     * @param  {anticlockwise} options 顺时针or逆时针画圆弧，默认是false，顺时针
     * @param  {isFill} options 是否给圆弧填充颜色，默认不填充
     * @param  {fillColor} options 填充的颜色
     * @param  {strokeStyle} options 圆弧描边样式
     * @param  {strokeStyle.color} options 圆弧描边颜色
     * @param  {strokeStyle.lineWidth} options 圆弧描边的粗细
     * @param  {startx，starty} options 画图起点的x,y坐标
     * @param  {newobj} options 表示是否是一个新的draw对象，默认是false,此时，再判断firstIMG，进而判断起点是否和上一个图的终点连接
     * @param  {firstIMG} options 是否是第一个图，默认是false，此时，起点和上一个图的终点连接，如果为true,起点不会和上一个图的终点连接
     * @return {draw对象}           draw对象的引用
     */
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
    var isClose = options.isClose || false;
    var strokeStyle = options.strokeStyle;
    var strokeColor = strokeStyle.color;
    var lineWidth = strokeStyle.lineWidth || 1;
    var fillColor = options.fillColor;
    var startx = options.startx;
    var starty = options.starty;
    var firstIMG = options.firstIMG || false;
    var newobj = options.newobj || false;
    var context = this.context;
    var canvas = this.canvas;
    var container = document.querySelector(selector);
    if (context) {
        if (newobj) {
            if (firstIMG) {
                context.beginPath();
                context.moveTo(startx, starty);
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }
        }
        context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        if (isClose) {
            console.log('close圆');
            context.closePath();
        }
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
};
exports.bezier = function() {
    var container = document.querySelector('.box');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    function draw() {
        setTimeout(function() {
            var cp1x = Math.random() * 50;
            var cp1y = Math.random() * 50;
            var x = Math.random() * 50;
            var y = Math.random() * 50;
            if (ctx) {
                ctx.clearRect(0, 0, 500, 500);
                ctx.beginPath();
                ctx.moveTo(50, 10);
                ctx.quadraticCurveTo(cp1x, cp1y, x, y);
            }
            ctx.stroke();
            requestAnimationFrame(draw);
        }, 500)
    }
    requestAnimationFrame(draw);
    container.appendChild(canvas);

};
exports.ani = function(){
    function change(draw){

        requestAnimationFrame(change);
    }
    var ani = requestAnimationFrame(change);
}
