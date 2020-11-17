/**
 * 回到顶部插件
 * @authors Phelps Chou
 * @date    2016-11-10 12:28:31
 * @version $Id$
 */

$(function(){
	var GoTop = {
		inint: function(){
			if( $(".go-top").length ){  //检查页面中是否已经存在这个元素，避免重复绑定
				return;
			}
			var $goTop = $('<li class="go-top"><a href="javascript: void(0)"><i class="iconfont icon-huidaodingbu"></i></a></li>');
			$("#side-bar ul").append($goTop); 
			this.$go = $goTop;  //给GoTop对象绑定属性，下面的bind函数才可以使用
			this.bind();  //调用gotop对象的方法
		},
		bind: function(){
			var goSelf = this;
			$(window).on('scroll', function(){
 			var scrollTop = $(window).scrollTop();
 			if(scrollTop>100){
 				goSelf.$go.show();  //这里面不能写this，代表的是window，我们要得到GoTop对象里面的
 			}else{
 				goSelf.$go.hide();
 			}
 		});
 		this.$go.on('click', function(){  //这里面就可以
 			$(window).scrollTop(0);
 		});
		}
	}
	GoTop.inint();  //直接调用即可
});