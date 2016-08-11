var utils = require('../common/utils.js');
var Board = function() {
    this.status = false;
};
var Brush = function() {

};

Board.prototype.ganerate = function(w, h, id, el) {
    var canvas = this.canvas = document.createElement("canvas");
    var parent = this.parent = document.querySelector(el);
    canvas.width = w;
    canvas.height = h;
    canvas.id = id;
    canvas.css({
        "border": "1px solid #000"
    });
    parent.appendChild(canvas);
    return this;
};
// background:画板背景
Board.prototype.start = function(options) {
    // 生成画板对象
    var board = this.ganerate(options.width || 300, options.height || 300, options.background || "#fff", options.id, options.el);
    //配置画板的属性
    var canvas = board.canvas;

    // 获取画笔的属性
    var brushpro = options.brushpro || {};
    // 生成画笔
    board.brush = new Brush();
    //设置画笔属性
    board.brush.setBrush(brushpro);
    canvas.addEventListener("mousedown", function(e) {
        board.status = true;
        e.preventDefault();
        brush.startX = e.pageX;
        brush.startY = e.pageY;
        console.log(brush.startX + "," + brush.startY);

    });

    canvas.addEventListener('mousemove', function(e) {
        if (board.status) {
            e.preventDefault();
            brush.endX = e.pageX;
            brush.endY = e.pageY;
            console.log(brush.endX + "," + brush.endY);
        }
    });

    canvas.addEventListener('mouseup', function(e) {
        e.preventDefault();
        board.status = false;
    });
    draw(board);
};
// color:画笔颜色,weight:画笔的大小,mode:画笔的功能(画图或者是擦拭)
var Brush = function() {};
//配置画笔的属性
Brush.prototype.setBrush = function(options) {
    this.color = color || "#000";
    this.weight = weight || "3";
    this.mode = mode || "draw";
    //配置橡皮擦的颜色
    if (this.mode) {
        this.color = "#fff";
    }
};




module.exports = new Board();
