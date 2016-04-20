# myfe
my font-end modules，自己写的一些前端工具，基于pure构建

## canvas模块
> 多边形的创建
###### 创建代码：
```
var draw = require('draw');
    draw.lines({
        selector: '.box',
        vertices:[[20,50],[20,80],[50,30]],
        strokeColor: 'blue',
        isFill:true,
        isClose:true
    });
```
###### 参数说明
- [ selector ]  canvas图形的容器，可以兼容css3中的选择器
- [ vertices ]  多边形的顶点坐标，数据类型是二位数组，如三角形的话，可以这样定义[[20,50],[20,80],[50,30]]
- [ strokeColor ]   多边形的填充颜色，字符串类型，可以接受英文单词，如red，或者是16进制的颜色值，如#f00，#000fff
- [ isFill ]    Boolean类型，多边形是否填充颜色，默认是false
- [ isClose ]   Boolean类型，多边形是否描边，默认是false
- [ stroke] json类型，多边形的描边样式

        属性  | 说明
        ---|---
        lineWidth | 描边的粗细
        color | 描边的颜色

