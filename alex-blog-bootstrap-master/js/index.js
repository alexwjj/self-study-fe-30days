$(function () {
    /*动态轮播图*/
    banner();
    /*移动端页签*/
    initMobileTab();
    /*初始工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
    /*初始化弹框提示*/
    $('[data-toggle="popover"]').popover();
});
var banner = function () {

    var getData = function (callback) {

        if (window.data) {
            callback && callback(window.data);
        } else {

            $.ajax({
                type: 'get',
                url: 'js/data.json',
                dataType: 'json',
                data: '',
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    }
    var render = function () {
        getData(function (data) {
            var isMobile = $(window).width() < 768 ? true : false;
            var pointHtml = template('pointTemplate', {
                list: data
            });
            var imageHtml = template('imageTemplate', {
                list: data,
                isMobile: isMobile
            });

            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    }
    $(window).on('resize', function () {
        render();

    }).trigger('resize');

    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {

        if (isMove && Math.abs(distanceX) > 50) {

            if (distanceX < 0) {

                $('.carousel').carousel('next');
            } else {

                $('.carousel').carousel('prev');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
}
var initMobileTab = function () {

    var $navTabs = $('.alex_experience .nav-tabs');
    var width = 0;
    $navTabs.find('li').each(function (i, item) {
        var $currLi = $(this);

        var liWidth = $currLi.outerWidth(true);
        width += liWidth;
    });
    $navTabs.width(width);

    new IScroll($('.nav-tabs-parent')[0], {
        scrollX: true,
        scrollY: false,
        click: true
    });
}