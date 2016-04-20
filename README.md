# myfe
my font-end modules，自己写的一些前端工具，基于pure构建

## canvas模块
> 多边形的创建

###### 使用说明：
> 所有调用该模块的页面都需要先引入lib/mod.js文件才能使用
> ```require(draw)```调用draw模块

> 支持回调函数，绘画完成之后调用



###### 创建代码：
~~~~

/**
 * 初始化
 * @param  {对象} options 初始化的参数
 * @return {draw对象}         [返回draw对象的引用]
 */

var draw = require('draw').prop();
~~~~

~~~~

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




