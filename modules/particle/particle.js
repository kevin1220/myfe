/**
 * 原理：
 * 1.通过getImageData获取到所有的像素，考虑到浏览器的性能问题，可是间隔一定的像素取点
 * 2.通过透明度是否大于128来判断是否有颜色，把符合条件的点的坐标保存到预设的数组dots中
 * 3.动画：
 *  a.通过初始坐标和目的坐标算出全程运动的加速度vx，vy.
 *  b.通过运动公式算出每一帧的坐标变化
 *  c.判断当前坐标是否和目的坐标重合，如果是则粒子运动停止
 * @return {[type]}          [description]
 */
// 定义粒子化对象的引用
var particle;
var tools = require('../common/utils.js');
var Particle = function(selector) {
    this.aniopt = {};
    this.canvas = document.querySelector(selector);
    particle = this;
};
Particle.prototype.draw = function(obj) {
    var canvas = this.canvas;
    var context = canvas.getContext('2d');
    if (context) {
        context.arc(this.posx, this.posy, this.rad, this.start, this.end, this.diretion);
        context.fillStyle = 'rgba(0,0,0,1)';
        context.fill();
        context.stroke();
    } else {
        console.log('get the context failed')
    }
}
Particle.prototype.drawtext = function(text) {
    var particle = this;
    var canvas = particle.canvas;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, particle.canvas.width, particle.canvas.height);
    if (context) {
        context.font = "46px 宋体";
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillStyle = 'blue';
        context.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width);
    } else {
        console.log('get the context failed')
    }
    return particle;
};

Particle.prototype.drawimg = function(imgsrc, cb) {
    var particle = this;
    var canvas = this.canvas;
    var context = canvas.getContext('2d');
    var img = new Image();
    img.onload = function() {
        if (context) {
            context.drawImage(img, 0, 0);
            tools.execCB(cb, null, particle);

        } else {
            console.log('get the context failed')
        }
    }

    img.src = imgsrc;
    return particle;

};
/**
 * 动画
 *model:0是分散，1是聚合
 */
Particle.prototype.animate = function(options) {
    particle.aniopt.time = options.time || 10;
    particle.aniopt.pertime = options.pertime || 0.3;
    particle.aniopt.radius = options.radius || 1;
    particle.aniopt.space = options.space || 1;
    particle.aniopt.model = options.model; //model:0是分散，1是聚合
    particle.aniopt.shape = options.shape || "square";
    particle.aniopt.disappear = options.disappear;
    initAnimate(getDots());
};


function initAnimate(dots) {
    var model = particle.aniopt.model;
    console.log(dots.length);
    dots.map(function(dot) {
        //初始化粒子
        if (model === 1) {
            dot.x2 = Math.random() * particle.canvas.width;
            dot.y2 = Math.random() * particle.canvas.height;
        } else if (model === 0) {
            dot.x2 = dot.x1;
            dot.y2 = dot.y1;
            dot.x1 = Math.random() * particle.canvas.width;
            dot.y1 = Math.random() * particle.canvas.height;
        } else {
            return;
        }
        dot.paint();
    });
    animate(dots);

}

function animate(dots) {
    var model = particle.aniopt.model;
    var context = particle.canvas.getContext('2d');
    var t = particle.aniopt.time; //总的运动时间
    var t1 = particle.aniopt.pertime; //每帧的时间间隔
    context.clearRect(0, 0, particle.canvas.width, particle.canvas.height);
    dots.map(function(dot) {
        if (model == 1) {
            dot.vx = (dot.x1 - dot.x2) / t;
            dot.vy = (dot.y1 - dot.y2) / t;
            //这里需要控制每个点的停止和运动
            if (dot.pause === true) {
                dot.x2 = dot.x1;
                dot.y2 = dot.y1;
            }
            dot.x2 += dot.vx * t1;
            dot.y2 += dot.vy * t1;
            if (Math.abs(dot.x1 - dot.x2) < 0.01 && Math.abs(dot.y1 - dot.y2) < 0.01) {
                dot.pause = true;
            }
        } else if (model == 0) {
            dot.vx = (dot.x1 - dot.x2) / t;
            dot.vy = (dot.y1 - dot.y2) / t;
            //这里需要控制每个点的停止和运动
            if (dot.pause === true) {
                dot.x2 = dot.x1;
                dot.y2 = dot.y1;
            }
            dot.x2 -= dot.vx * t1;
            dot.y2 -= dot.vy * t1;
            if (Math.abs(dot.x1 - dot.x2) < 100 && Math.abs(dot.y1 - dot.y2) < 100 &&particle.aniopt.disappear) {
                dot.pause = true;
            }
        }

        dot.paint();

    })
    requestAnimationFrame(function() {
        animate(dots);
    })

}

function getDots() {
    var dots = [];
    var space = particle.aniopt.space; //每间隔一定个像素取一点
    var canvas = particle.canvas;
    var context = canvas.getContext('2d');
    var imgdata = context.getImageData(0, 0, particle.canvas.width, particle.canvas.height).data;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var y = 0; y < canvas.height; y += space) {
        for (var x = 0; x < canvas.width; x += space) {
            var i = (y * canvas.width + x) * 4; //先从左到右取点，再从上到下去点，*4是因为rgba。
            if (imgdata[i + 3] > 128) { //根据透明度判断是否有绘画
                var dot = new Dot();
                dot.x1 = x;
                dot.y1 = y;
                dot.r = imgdata[i];
                dot.g = imgdata[i + 1];
                dot.b = imgdata[i + 2];
                dot.a = imgdata[i + 3];
                dots.push(dot);
            }
        }
    }
    return dots;
}

var Dot = function(x1, y1, x2, y2, vx, vy) {
    this.x1 = x1; //目标坐标
    this.y1 = y1;
    this.x2 = x2; //初始坐标
    this.y2 = y2;
    this.vx = vx; //加速度
    this.vy = vy;
    this.radius = particle.aniopt.radius;
}
Dot.prototype.paint = function() {
    var shape = particle.aniopt.shape;
    var canvas = particle.canvas;
    var context = canvas.getContext('2d');
    context.save();
    context.beginPath();
    context.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    if (shape == "square") {
        context.fillRect(this.x2, this.y2, 1, 1);
    } else if (shape == "circle") {
        context.arc(this.x2, this.y2, this.radius, 0, Math.PI, false);
    }
    context.fill();
    context.restore();
}
module.exports = Particle;
