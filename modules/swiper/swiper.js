/**
 * 触屏模块
 * @return {[type]} [description]
 * 
 */
var Swiper = function() {
    'use strict';
    var m = this;
    var startPoint = {};
    var currentPoint = {};
    var endPoint = {};
    var start, move, end;
    var events = {};
    var options = {};
    var browser = require('common/browser');
    var utils = require('common/utils');
    var activeIndex = 0;

    var moveHandle_PC = function(e) {
        currentPoint.x = e.pageX;
        currentPoint.y = e.pageY;
        document.querySelector('.info').innerHTML = "current-->(" + currentPoint.x + "," + currentPoint.y + ")";
        if (m.direction == "horizontal" && m.flowmouse) {
            m.swiper.style.Left = currentPoint.x - startPoint.x + "px";
        } else if (m.direction == "vertical" && m.flowmouse) {
            m.swiper.style.Top = currentPoint.y - startPoint.y + "px";
        } else {
            return;
        }
    }
    var moveHandle_MOBILE = function(e) {
        currentPoint.x = e.changedTouches[0].pageX;
        currentPoint.y = e.changedTouches[0].pageY;
        if (m.direction == "horizontal") {
            m.swiper.style.Left = currentPoint.x - startPoint.x + "px";
        } else if (m.direction == "vertical") {
            m.swiper.style.Top = currentPoint.y - startPoint.y + "px";
        } else {
            return;
        }
        document.querySelector('.info').innerHTML = "current-->(" + currentPoint.x + "," + currentPoint.y + ")";
    }
    if (browser.isMobile()) {
        events.start = "touchstart";
        events.move = "touchmove";
        events.end = "touchend";
    } else {
        events.start = "mousedown";
        events.move = "mousemove";
        events.end = "mouseup";
    }
    m.config = function(_callback) {
        var selector = m.selector;
        // 设置默认激活的slider
        m.container = document.querySelector(selector);
        m.width = m.container.clientWidth;
        m.height = m.container.clientHeight;
        m.swiper = document.querySelector(selector + " .swiper");

        m.sliders = document.querySelectorAll(selector + " .slider");
        m.length = m.sliders.length;
        [].slice.call(m.sliders).map(function(slider) {
            slider.style.height = m.height + 'px';
            slider.style.width = m.width + 'px';
        });

        if (m.direction == "horizontal") {
            m.swiper.style.width = m.width * (m.length + 1) + 'px';
        } else if (m.direction == "vertical") {
            m.swiper.style.height = m.height * (m.length + 1) + 'px';
        }
        //开始滑动
        var swiper = m.swiper;
        swiper.addEventListener(events.start, function(e) {
            e.preventDefault();
            if (browser.isMobile()) {
                startPoint.x = e.changedTouches[0].pageX;
                startPoint.y = e.changedTouches[0].pageY;

            } else {
                startPoint.x = e.pageX;
                startPoint.y = e.pageY;

                swiper.addEventListener(events.move, moveHandle_PC, false);
            }
            document.querySelector('.info').innerHTML = "start-->(" + startPoint.x + "," + startPoint.y + ")";
        }, false);
        //移动滑动
        if (browser.isMobile()) {
            swiper.addEventListener(events.move, moveHandle_MOBILE, false);
        }
        //滑动结束
        swiper.addEventListener(events.end, function(e) {
            if (browser.isMobile()) {
                endPoint.x = e.changedTouches[0].pageX;
                endPoint.y = e.changedTouches[0].pageY;
            } else {
                endPoint.x = e.pageX;
                endPoint.y = e.pageY;
                swiper.removeEventListener(events.move, moveHandle_PC, false);
            }
            document.querySelector('.info').innerHTML = "end-->(" + endPoint.x + "," + endPoint.y + ")";
            utils.execCallBack(_callback);
        }, false);
    };
    m.swipe = function(options) {
        m.selector = options.selector;
        m.direction = options.direction;
        m.flowmouse = options.flowmouse;
        m.loop = options.loop;
        m.autoPlay = options.autoPlay;
        if(m.autoPlay){
            setInterval(function(){
                m.next();
            }, m.autoPlay)
        }
        var threshold = options.threshold || 50;
        var handle = options.handle || function() {};
        m.config(function() {
            var x = endPoint.x - startPoint.x;
            var y = endPoint.y - startPoint.y;
            if (x >= threshold && m.direction === "horizontal") {
                //swipeRight
                m.prev();
            } else if (x < -threshold && m.direction === "horizontal") {
                //swipeLeft
                m.next();
            } else if (y >= threshold && m.direction === "vertical") {
                //swipeDown
                m.prev();
            } else if (y < -threshold && m.direction === "vertical") {
                //swipeUp
                m.next();
            }
        });
    };
    m.next = function() {
        activeIndex += 1;
        if (activeIndex >= m.length) {

            if (!m.loop) {
                activeIndex -= 1;
            } else {
                activeIndex = 0;
            }
        }

        m.goTo(activeIndex);
    }
    m.prev = function() {
        activeIndex -= 1;
        if (activeIndex < 0) {
            if (!m.loop) {
                activeIndex += 1;
            } else {
                activeIndex = m.length - 1;
            }

        }
        m.goTo(activeIndex);
    }
    m.goTo = function(index) {
        if (m.direction == "horizontal") {
            m.swiper.style.left = index * -1 * m.width + 'px';

        } else if (m.direction == "vertical") {
            m.swiper.style.top = index * -1 * m.height + 'px';
        } else {
            return;
        }
    }
}

module.exports = new Swiper();
