# myfe
my font-end modules，自己写的一些前端工具，基于pure构建
##### 项目安装和使用
1. git clone https://github.com/kevin1220/myfe.git
2. cd myfe
3. npm install
4. pure server start
5. 所有的测试demo都在/modules/demo文件夹里面


***特别说明***：

``1. 所有调用该模块的页面都需要先引入lib/mod.js文件才能使用
2. 本项目的所有模块都可是直接通过html的script标签引用``

## canvas模块
> 多边形的创建

###### 使用说明：
> ```require(draw)```调用draw模块

> 支持回调函数，绘画完成之后调用



###### 创建代码：
```

/**
 * 初始化
 * @param  {对象} options 初始化的参数
 * @return {draw对象}         [返回draw对象的引用]
 */

var draw = require('draw').prop();
```

```

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

draw.lines({
    selector: '.box',
    vertices: [
        [20, 50],
        [20, 80],
        [50, 30],
    ],
    strokeStyle: {
        color: 'blue',
        lineWidth: 5
    },
    fillColor: 'red',
    isFill: true,
    isClose: true
});
```
## 粒子化模块
### api
1. drawtext(text)，绘制需要粒子化的文本内容，传入需要粒子化的文本内容
2. drawimg(img),img,绘制需要粒子化的图片内容，需要粒子化的图片的文件路径
3. animate(options),添加粒子化效果，传入粒子化的运动效果的模式，0是分散，1是聚合
    * model:传入粒子化的运动效果的模式，0是分散，1是聚合
    * vx:粒子的X轴上的加速度
    * vy:粒子的Y轴上的加速度
    * r:粒子的半径大小
    * time:粒子化的总时间
    * pertime:粒子每帧的时间间隔
    * space:每间隔一定个像素取一点
    * shape:粒子形状，目前支持square(方形),circle(圆形)。

> 文本内容的粒子化
### 缺陷
1. 此模块目前只能操作一个canvas对象。
###### 使用说明：
1. 实例化粒子化实例。
2. 调用particle对象的对应绘制的api
3. 调用animate方法来执行动画

代码如下：
```new Particle("#canvas1").drawtext(text).animate(1);```


