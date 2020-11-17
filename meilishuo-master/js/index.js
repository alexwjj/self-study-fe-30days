/**
 * 控制全部商品下拉选择
 * @authors Phelps Chou
 * @date    2016-11-09 19:57:05
 * @version $Id$
 */

 $(function(){
 	$(".nav-box-bar li.list").on('mouseenter', function(){
 		$(this).find('.nav-list').css('display', 'block');
 		$(this).addClass('active');
 	});
 	$(".nav-box-bar li.list").on('mouseleave', function(){
 		$(this).find('.nav-list').css('display', 'none');
 		$(this).removeClass('active');
 	});
 });

