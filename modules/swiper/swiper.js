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
    m.activeIndex = 0;
    m.startPosition = {};
    var moveHandle_PC = function(e) {
        currentPoint.x = e.pageX;
        currentPoint.y = e.pageY;
        // document.querySelector('.info').innerHTML = "current-->(" + currentPoint.x + "," + currentPoint.y + ")";
        if (m.direction == "horizontal" && m.flowmouse) {
            m.swiper.style.left = (m.startPosition.left.slice(0, -2) * 1 + currentPoint.x - startPoint.x) + "px";
        } else if (m.direction == "vertical" && m.flowmouse) {
            m.swiper.style.top = (m.startPosition.top.slice(0, -2) * 1 + currentPoint.y - startPoint.y) + "px";
        } else {
            return;
        }
    }
    var moveHandle_MOBILE = function(e) {
        currentPoint.x = e.changedTouches[0].pageX;
        currentPoint.y = e.changedTouches[0].pageY;
        if (m.direction == "horizontal" && m.flowmouse) {
            m.swiper.style.left = (m.startPosition.left.slice(0, -2) * 1 + currentPoint.x - startPoint.x) + "px";
        } else if (m.direction == "vertical" && m.flowmouse) {
            m.swiper.style.top = (m.startPosition.top.slice(0, -2) * 1 + currentPoint.y - startPoint.y) + "px";
        } else {
            return;
        }
        // document.querySelector('.info').innerHTML = "current-->(" + currentPoint.x + "," + currentPoint.y + ")";
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
        if (m.navigation) {
            m.createNav();
        }
        m.goto(m.activeIndex);
        //开始滑动
        var swiper = m.swiper;
        swiper.addEventListener(events.start, function(e) {
            e.preventDefault();
            m.startPosition.left = m.swiper.style.left;
            m.startPosition.top = m.swiper.style.top;
            if (browser.isMobile()) {
                startPoint.x = e.changedTouches[0].pageX;
                startPoint.y = e.changedTouches[0].pageY;

            } else {
                startPoint.x = e.pageX;
                startPoint.y = e.pageY;

                swiper.addEventListener(events.move, moveHandle_PC, false);
            }
            // document.querySelector('.info').innerHTML = "start-->(" + startPoint.x + "," + startPoint.y + ")";
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
            // document.querySelector('.info').innerHTML = "end-->(" + endPoint.x + "," + endPoint.y + ")";
            utils.execCallBack(_callback);
        }, false);
    };
    m.swipe = function(options) {
        m.selector = options.selector;
        m.direction = options.direction;
        m.flowmouse = options.flowmouse;
        m.loop = options.loop;
        m.autoPlay = options.autoPlay;
        m.navigation = document.querySelector(options.navigation);
        if (m.autoPlay) {
            setInterval(function() {
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
            } else {
                if (m.direction == "horizontal") {
                    m.swiper.style.left = m.startPosition.left;
                }
                if (m.direction == "vertical") {
                    m.swiper.style.top = m.startPosition.top;
                }
            }
        });
    };
    m.next = function() {
        m.activeNav = document.querySelector('#nav' + (m.activeIndex + 1));
        m.activeNav.style.boxShadow = "";
        m.activeIndex += 1;
        if (m.activeIndex >= m.length) {

            if (!m.loop) {
                m.activeIndex -= 1;
            } else {
                m.activeIndex = 0;
            }
        }
        m.goto(m.activeIndex);
    }
    m.prev = function() {
        m.activeNav = document.querySelector('#nav' + (m.activeIndex + 1));
        m.activeNav.style.boxShadow = "";
        m.activeIndex -= 1;
        if (m.activeIndex < 0) {
            if (!m.loop) {
                m.activeIndex += 1;
            } else {
                m.activeIndex = m.length - 1;
            }
        }
        m.goto(m.activeIndex);
    }
    m.goto = function(index) {
        m.activeIndex = index * 1;
        if (m.direction == "horizontal") {
            m.swiper.style.left = index * -1 * m.width + 'px';

        } else if (m.direction == "vertical") {
            m.swiper.style.top = index * -1 * m.height + 'px';
        } else {
            return;
        }

        m.activeNav = document.querySelector('#nav' + (m.activeIndex + 1));
        m.activeNav.style.boxShadow = "0 0 2px 4px";
    }
    m.createNav = function() {
        var opt = {};
        var navs = "";
        for (var i = 0; i < m.length; i++) {
            navs += "<div id='nav" + (i + 1) + "' class='nav' style='width:16px;height:16px'>" + (i + 1) + "</div>";
        }
        m.navigation.innerHTML = navs;
        var navElements = document.querySelectorAll('.nav');
        [].slice.call(navElements).map(function(navElement) {
            navElement.addEventListener('click', function() {
                m.activeNav = document.querySelector('#nav' + (m.activeIndex + 1));
                m.activeNav.style.boxShadow = "";
                m.goto(this.id.slice(3) - 1);
            }, false);
        });
    }
}

module.exports = new Swiper();
