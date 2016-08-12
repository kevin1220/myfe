var utils = require('../common/utils.js');
var Board = function() {
    this.status = false;
};
var Brush = function() {

};

Board.prototype.ganerate = function(w, h, id, parentel, background) {
    var canvas = this.canvas = document.createElement("canvas");
    var parent = this.parent = document.querySelector(parentel);
    canvas.width = w;
    canvas.height = h;
    canvas.id = id;
    canvas.css({
        "border": "1px solid #000",
        "background": background
    });
    parent.appendChild(canvas);
    return this;
};
// background:background of drawing Board
Board.prototype.start = function(options) {
    // ganerate the instance of board
    var board = this.ganerate(options.width || 300, options.height || 300, options.id, options.parent, options.background || "#fff");
    //set board's properties
    var canvas = board.canvas;

    function draw(board) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = board.brush.color;
        if (board.status) {
            ctx.moveTo(board.brush.startx, board.brush.starty);
        }
        for (var i = 0; i < board.brush.points.length; i++) {
            ctx.lineTo(board.brush.points[i].x, board.brush.points[i].y);
        }
        ctx.stroke();
    }
    // get brush's properties
    var brushpro = options.brush || {};
    // ganerate the brush
    board.brush = new Brush();
    //set the brush's properties
    board.brush.setBrush(brushpro);
    canvas.addEventListener("mousedown", function(e) {
        board.status = true;
        e.preventDefault();
        board.brush.startx = e.pageX;
        board.brush.starty = e.pageY;

    });

    canvas.addEventListener('mousemove', function(e) {
        if (board.status) {
            e.preventDefault();
            x = e.pageX;
            y = e.pageY;
            board.brush.points.push({ x: x, y: y });
            setTimeout(function() {

                draw(board);
            }, 1000 / 60);
        }
    });

    canvas.addEventListener('mouseup', function(e) {
        e.preventDefault();
        board.brush.points = [];
        board.status = false;
    });

};
// color:画笔颜色,weight:画笔的大小,mode:画笔的功能(画图或者是擦拭)
var Brush = function() {};
//配置画笔的属性
Brush.prototype.setBrush = function(options) {
    this.points = [];
    this.color = options.color || "#000";
    this.weight = options.weight || "3";
    // 1:draw,0:clear
    this.mode = options.mode || 1;
    //配置橡皮擦的颜色
    if (!this.mode) {
        this.color = "#fff";
    }
};
// Converts canvas to an image
Board.prototype.convertCanvasToImage = function() {
    var that = this;
    var canvas = this.canvas;
    var image = new Image();
    image.onload = function() {
        that.parent.removeChild(canvas);
        that.parent.appendChild(image);
    }
    image.src = canvas.toDataURL("image/png");
};
// clear the board
Board.prototype.clear = function() {
    var canvas = this.canvas;
    var ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
};



module.exports = new Board();
