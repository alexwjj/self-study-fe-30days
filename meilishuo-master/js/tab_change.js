/**
 * 选项卡切换
 * @authors Phelps Chou
 * @date    2016-11-10 12:40:42
 * @version $Id$
 */

$(function(){
	$(".search-bar>li").on('click', function(event){
		var $this = $(this),
			index = $(this).index();
		event.preventDefault();  //阻止点击时触发的a标签的默认行为
		$this.addClass('active');
		$this.siblings().removeClass('active');
		$this.parents('.search').find(".search-box").removeClass('active');
		$this.parents('.search').find(".search-box").eq(index).addClass('active');
	});
});
