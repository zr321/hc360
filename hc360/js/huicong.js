"use strict";
+function(){
	$("li.d1").mouseover(function(){
		$("div.d3").css({opacity:1,width:"780px"})
	});
	$("li.d1").mouseout(function(){
		$("div.d3").css({opacity:0,width:0})
	});

	$("div.search").mouseover(function(){
		$("div.search div.renSou").css({opacity:1,height:"100px"})
	});
	$("div.search").mouseout(function(){
		$("div.search div.renSou").css({opacity:0,height:0})
	});

	$("div.fixeds>ul>li:nth-child(1)").mouseover(function(){
		$("div.fixeds>ul>li>span").css({opacity:1,width:"96px"})
	});
	$("div.fixeds>ul>li:nth-child(1)").mouseout(function(){
		$("div.fixeds>ul>li>span").css({opacity:0,width:0})
	});


	
	//=========广告轮播=========================


	var imgs=[
	"my/mater/images/huicongxp1.jpg",
	"my/mater/images/huicongxp2.jpg",                           
	"my/mater/images/huicongxp3.jpg",
	"my/mater/images/huicongxp4.jpg",
	"my/mater/images/huicongxp5.jpg",
	"my/mater/images/huicongxp6.jpg"
];
+function(){
	//获得id为slider的容器的宽作为每个LI的宽
	var LIWIDTH=parseFloat($("#slider").css("width"));
	
	//保存id为imgs和id为indexs的ul
	var $ulImgs=$("#imgs"),$ulIdxs=$("#indexs");
	var n=0;//定义n保存当前正在显示的图片下标
	var SPEED=500;//定义speed保存自动轮播的速度
	var WAIT=2000;//定义WAIT保存自动轮播间的等待时间
	var canAuto=true;//定义标记变量标记能否自动轮播
	var timer=null;//定义一次性定时器的序号
	+function(){//初始化$ulImgs和$ulIdxs的内容
		//遍历imgs数组,生成html代码片段
		for(var i=0,htmlImgs="",htmlIdxs="";
				i<imgs.length;
				i++){
			htmlImgs+="<li><img src='"+imgs[i]+"'></li>";
			htmlIdxs+="<li>"+(i+1)+"</li>";
		}
		//将代码片段填充到ul中
		$ulImgs.html(htmlImgs);
		$ulIdxs.html(htmlIdxs);
		//修改$ulImgs的宽
		$ulImgs.css("width",LIWIDTH*(imgs.length+1));
		//复制$ulImgs的第一个元素，再追加到结尾
		$ulImgs.append(
			$ulImgs.children(":first").clone()
		);
		//设置$ulIdxs中第一个li默认为hover
		$ulIdxs.children(":first").addClass("hover");
	}();
	function autoMove(){//启动自动轮播 
		timer=setTimeout(function(){
			n++;//将当前图片的下标+1
			//延迟WAIT毫秒,再启动动画,将$ulImgs的left移动到-n*LIWIDTH的位置
			$ulImgs.animate({
				left:-n*LIWIDTH
			},SPEED,function(){//动画结束后
				//如果是最后一张(n等于imgs的length)
				if(n==imgs.length){
					n=0;//将n改回0
					$ulImgs.css("left",0);//将$ulImgs的left归0
				}
				//设置$ulIdxs中n位置的li为hover，清除其它hover
				$ulIdxs
					.children(":eq("+n+")").addClass("hover")
					.siblings().removeClass("hover");	
				//如果可以自动轮播时,才启动
				if(canAuto) autoMove();//再次启动自动轮播
			});
		},WAIT);
	};
	autoMove();
	//实现手动轮播
	//为$ulIdxs添加鼠标进入事件委托,只允许li响应
  $ulIdxs.on("mouseover","li",function(){
		//停止&ulImgs上的一切动画
		$ulImgs.stop(true);
		//修改n为当前li的下标: 
		n=$("#indexs>li").index(this);
		//让$ulImgs移动到-n*LIWIDTH的位置
		$ulImgs.animate({
			left:-n*LIWIDTH
		},SPEED,function(){
			//设置$ulIdxs中n位置的li为hover，清除其它hover
			$ulIdxs
				.children(":eq("+n+")").addClass("hover")
				.siblings().removeClass("hover");	
		});
	});
	//鼠标进入slider区域，修改标记禁止继续自动轮播
	$("#slider").mouseenter(function(){
		canAuto=false;
		clearTimeout(timer);
	}).mouseleave(function(){//鼠标离开,重启自动轮播
		canAuto=true;//修改标记允许继续自动轮播
		autoMove();
	});
}();

}();



