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

    var moveHandle_PC = function(e) {
        currentPoint.x = e.pageX;
        currentPoint.y = e.pageY;
        document.querySelector('.info').innerHTML = "current-->(" + currentPoint.x + "," + currentPoint.y + ")";
        if (m.direction == "horizontal") {
            m.currentNode.style.marginLeft = currentPoint.x - startPoint.x + "px";
        } else if (m.direction == "vertical") {
            console.log(currentPoint.y - startPoint.y)
            m.currentNode.style.marginTop = currentPoint.y - startPoint.y + "px";
        } else {
            return;
        }
    }
    var moveHandle_MOBILE = function(e) {
        currentPoint.x = e.changedTouches[0].pageX;
        currentPoint.y = e.changedTouches[0].pageY;
        if (m.direction == "horizontal") {
            m.currentNode.style.marginLeft = currentPoint.x - startPoint.x + "px";
        } else if (m.direction == "vertical") {
            console.log(currentPoint.y - startPoint.y)
            m.currentNode.style.marginTop = currentPoint.y - startPoint.y + "px";
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
        var sliders = document.querySelectorAll(selector + " .slider");

        if (sliders.length > 0) {
            sliders[0].className = sliders[0].getAttribute("class") + " active";
            m.currentNode = document.querySelector('.active');
            if (m.currentNode.previousElementSibling) {
                m.prevNode = m.currentNode.previousElementSibling;
                m.prevNode.className = m.prevNode.getAttribute("class") + " prev";
            } else {
                m.prevNode = sliders[sliders.length - 1];
                m.prevNode.className = m.prevNode.getAttribute("class") + " prev";
            }
            if (m.currentNode.nextElementSibling) {
                m.nextNode = m.currentNode.nextElementSibling;
                m.nextNode.className = m.nextNode.getAttribute("class") + " next";
            } else {
                m.nextNode = sliders[0];
                m.nextNode.className = m.nextNode.getAttribute("class") + " next";
            }
        }
        var ele = document.querySelector(selector + " .active");
        //开始滑动
        ele.addEventListener(events.start, function(e) {
            e.preventDefault();
            if (browser.isMobile()) {
                startPoint.x = e.changedTouches[0].pageX;
                startPoint.y = e.changedTouches[0].pageY;

            } else {
                startPoint.x = e.pageX;
                startPoint.y = e.pageY;

                ele.addEventListener(events.move, moveHandle_PC, false);
            }
            document.querySelector('.info').innerHTML = "start-->(" + startPoint.x + "," + startPoint.y + ")";
        }, false);
        //移动滑动
        if (browser.isMobile()) {
            ele.addEventListener(events.move, moveHandle_MOBILE, false);
        }
        //滑动结束
        ele.addEventListener(events.end, function(e) {
            if (browser.isMobile()) {
                endPoint.x = e.changedTouches[0].pageX;
                endPoint.y = e.changedTouches[0].pageY;
            } else {
                endPoint.x = e.pageX;
                endPoint.y = e.pageY;
                ele.removeEventListener(events.move, moveHandle_PC, false);
            }
            document.querySelector('.info').innerHTML = "end-->(" + endPoint.x + "," + endPoint.y + ")";
            utils.execCallBack(_callback);
        }, false);


    };
    m.swipe = function(options) {
        m.selector = options.selector;
        m.direction = options.direction;
        var threshold = options.threshold || 50;
        var handle = options.handle || function() {};
        m.config(function() {
            var x = endPoint.x - startPoint.x;
            var y = endPoint.y - startPoint.y;
            console.log(x + "---" + y);
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
        if (m.direction == "horizontal") {
            console.log('swipeleft')
        } else if (m.direction == "vertical") {
            console.log('swipeup');
            m.currentNode = document.querySelector('.active');
            m.prevNode = document.querySelector('.prev');
            m.nextNode = document.querySelector('.next');
            m.nextNode.className = m.nextNode.getAttribute('class').slice(0, -5) + ' active';
            m.nextNode.nextElementSibling.className = m.nextNode.nextElementSibling.getAttribute('class') + ' next';
            m.currentNode.style.marginTop = "-100%";
            m.currentNode.className = m.currentNode.getAttribute('class').slice(0, -7) + ' prev';
            m.prevNode.className = m.currentNode.getAttribute('class').slice(0, -5);
        }
    }
    m.prev = function() {
        if (m.direction == "horizontal") {
            console.log('swiperight')
        } else if (m.direction == "vertical") {
            console.log('swipedown');
        }
    }

}

module.exports = new Swiper();
