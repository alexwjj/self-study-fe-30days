window.onload = function () {
    search();
    banner();
    downTime();
};
var search = function () {
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        
        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }
};
var banner = function () {
    /*轮播图*/
    var banner = document.querySelector('.jd_banner');
    /*屏幕宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');

    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }


    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*加过渡*/
        addTransition();
        /*做位移*/
        setTranslateX(-index * width);
    }, 1000);
    imageBox.addEventListener('transitionend', function () {
        /*自动滚动的无缝*/
        if (index >= 9) {
            index = 1;
            /*瞬间定位*/
            /*清过渡*/
            removeTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }
        /*滑动的时候也需要无缝*/
        else if (index <= 0) {
            index = 8;
            /*瞬间定位*/
            /*清过渡*/
            removeTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }
        /*根据索引设置点*/
        /*此时此刻  index  的取值范围  1-8（0,8--1,9）*/
        /*点索引  index - 1 */
        setPoint();
    });

    /*设置点的方法*/
    var setPoint = function () {
        /*index 1-8*/
        /*清除样式*/
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        /*给对应的加上样式*/
        points[index - 1].classList.add('now');
    }

    /*绑定事件*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart', function (e) {
        /*清除定时器*/
        clearInterval(timer);
        /*记录起始位置的X坐标*/
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        /*记录滑动过程当中的X坐标*/
        var moveX = e.touches[0].clientX;
        /*计算位移  有正负方向*/
        distanceX = moveX - startX;
        /*计算目标元素的位移  不用管正负*/
        /*元素将要的定位=当前定位+手指移动的距离*/
        var translateX = -index * width + distanceX;
        /*滑动--->元素随着手指的滑动做位置的改变*/
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend', function (e) {
        /*4.  5.  实现*/
        /*要使用移动的距离*/
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                /*吸附*/
                addTransition();
                setTranslateX(-index * width);
            } else {
                /*切换*/
                /*右滑动 上一张*/
                if (distanceX > 0) {
                    index--;
                }
                /*左滑动 下一张*/
                else {
                    index++;
                }
                /*根据index去动画的移动*/
                addTransition();
                setTranslateX(-index * width);
            }
        }
        /*最好做一次参数的重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }, 1000);
    });


}
var downTime = function () {
    /*1.每一秒改变当前的时间*/
    /*2.倒数计时  假设 4小时*/
    var time = 4 * 60 * 60;
    var spans = document.querySelectorAll('.time span');

    var timer = setInterval(function () {
        time --;
        /*格式化  给不同的元素html内容*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    }, 1000)

}