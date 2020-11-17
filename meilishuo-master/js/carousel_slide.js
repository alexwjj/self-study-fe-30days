/**
/**
 * 轮播插件
 * @authors Phelps Chou
 * @date    2016-11-09 20:21:30
 * @version $Id$
 */

$(function(){
	$.fn.carouselSlide = function(){
		var $me = $(this),
			$ct = $me.find(".img-ct"),
			$items = $ct.children(),
			$next = $me.find(".next"),
			$pre = $me.find(".pre"),
			$bullet = $me.find(".bullet"),
			imgWidth = $items.width(),
			imgCount = $items.length;

		$ct.prepend( $items.last().clone() );
		$ct.append( $items.first().clone() );
		var imgRealCount = imgCount+2;

		$ct.css({  //初始化图片位置的设置
			left: 0-imgWidth,
			width: imgRealCount*imgWidth
		});

		var curIdx = 0;  //设置当前图片对应的bullet指数
		var isAnimate = false;  //设置状态锁，防止连续点击副作用

		$next.on('click', function(){
			showNext();
		});
		$pre.on('click', function(){
			showPre();
		});
		$bullet.find('li').on('click', function(){
			var idx = $(this).index();
			if( idx>curIdx ){
				showNext(idx-curIdx);
			}else if( idx<curIdx ){
				showPre(curIdx-idx);
			}
		});

		function showNext(idxCount){
			var idxCount = idxCount || 1;  //有idx就用idx没有参数就自动轮播为1了
			if(!isAnimate){
				isAnimate = true;
				//核心代码
    			$ct.animate({left: '-='+(imgWidth*idxCount)},500,function(){
					curIdx = (curIdx + idxCount)%imgCount;  //关键是curIdx为3时候，当我点击下一页要让curIdx值为0，从而实现回到真实的图片的效果
					if(curIdx === 0){
						$ct.css({left: 0-imgWidth});
					}
					isAnimate = false;
					setBullet();
    			});
			}
		}
		function showPre(idxCount){
			var idxCount = idxCount || 1;
			if(!isAnimate){
				isAnimate = true;
				//核心代码
    			$ct.animate({left: '+='+(imgWidth*idxCount)},500,function(){
					curIdx = (imgCount+curIdx-idxCount)%imgCount;
					if(curIdx === (imgCount-1)){
						$ct.css({left: 0-imgWidth*imgCount});
					}
					isAnimate = false;
					setBullet();
    			});
			}
		}

		function setBullet(){
			$bullet.find('li').removeClass('active')
							  .eq(curIdx).addClass('active');
		}

		//自动轮播函数
		function autoShow(){
			clock = setInterval(function(){
				showNext();
			}, 4000);
		}
		function stopAuto(){
			clearInterval(clock);  //这个是用来扩展的，页面上可以设置一个按钮控制是否自动轮播
		}

		autoShow();  //调用自动轮播
	}
	
	//调用方法
	$(".carousel").each(function(){
		$(this).carouselSlide();
	});
});