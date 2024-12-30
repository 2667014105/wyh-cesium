var paypraise = {};
paypraise.staticsURL = $(".pay-area").attr("data-static");
$(document).ready(function(){
  	paypraise.price = 2;
	paypraise.pename = kn.pename;
	paypraise.kename = kn.kename;

	startload();
	$(".project-sq-btnarea a").on("click",function(){
		openpaywin();
	});
	$(".pay-tip-close").on("click",function(){
		closepaywin();
	});
	// $(".pay-tip-paytype img").on("click",function(){
	// 	$(this).prev().attr("checked","checked");
	// });
	$(".pay-tip-btn").on("click",function(){
		$(".pay-tip-btn").removeClass("pay-tip-btn-ck");
		$(this).addClass("pay-tip-btn-ck");
		var price = $(this).attr("data-price");
		paypraise.price = price*1;
	});
	$(".pay-tip-gopay a").on("click",function(){
		gopay();
	});
	$("#pay-success").on("click",function(){
		paysuccess();
	});
	$("#pay-error").on("click",function(){
		payerror();
	});
});
function gopay(){
	var info = "payfor=5&p="+kn.pename+"&k="+kn.kename+"&orderamount="+paypraise.price+"&paytype=ALIPAY";
	window.open("/pay/topay/?"+info);
	$(".pay-tip-body").hide();
	$(".pay-tip-result").show();
}
function openpaywin(){
	$(".pay-tip-body").show();
	$(".pay-tip-result").hide();
	$(".pay-tip-Box").show();
}
function closepaywin(){
	paypraise.price = 2;
    $(".pay-tip-body").hide();
    $(".pay-tip-result").hide();
	$(".pay-tip-Box").hide();
}
function paysuccess(){
	$.ajax({
		url:"/knowledge/paysq",
		type:"post",
		dataType: 'json',
		data:{"pename":paypraise.pename,"kename":paypraise.kename},
		sync:false,
		success:function(data){
			if(data.statusCode == 200){
				$(".project-sq-avatar").html("");
				loadMember(data.data.data);
				if(data.data.count>8)$(".project-sq-avatar").append('<li><span>等'+data.data.count+'人</span></li>');
			}else{
				alert(data.message);
			}
			closepaywin();
		}
	});
}
function payerror(){
	window.open("/tif2eq/tif2eq-payerror.html");
	closepaywin();
}
function startload(){
	//加载CSS文件
	var link = document.createElement( "link" ); 
	link.type = "text/css"; 
	link.rel = "stylesheet"; 
	link.href = paypraise.staticsURL+"/css/paypraise.css"; 
	document.getElementsByTagName( "head" )[0].appendChild( link ); 
	//添加相关html
	var html = '<div class="pay-tip-Box" style="display:none;">'+
		'<div class="pay-tip-content">'+
			'<div class="pay-tip-top">'+
				'<span class="pay-tip-title">赞赏支持</span>'+
				'<span class="pay-tip-close">X</span>'+
			'</div>'+
			'<div class="pay-tip-body">'+
				'<div class="pay-tip-price pay-tip-price-first">'+
					'<a href="javascript:;" data-price="2" class="pay-tip-btn pay-tip-btn-ck">&nbsp;2元&nbsp;</a>'+
	        		'<a href="javascript:;" data-price="4" class="pay-tip-btn">&nbsp;4元&nbsp;</a>'+
	        		'<a href="javascript:;" data-price="8"  class="pay-tip-btn">&nbsp;8元&nbsp;</a>'+
				'</div>'+
				'<div class="pay-tip-price">'+
					'<a href="javascript:;" data-price="16" class="pay-tip-btn">16元</a>'+
	        		'<a href="javascript:;" data-price="32" class="pay-tip-btn">32元</a>'+
	        		'<a href="javascript:;" data-price="64"  class="pay-tip-btn">64元</a>'+
				'</div>'+
				'<div class="pay-tip-paytype">'+
					'<span>支付方式:</span>'+
					'<input type="radio" name="tiptype" checked="checked">'+
					'<img src="'+paypraise.staticsURL+'/img/alipay.png">'+
					'<input type="radio" name="tiptype" disabled="disabled">'+
					'<img src="'+paypraise.staticsURL+'/img/wechatpay.png" class="pay-tip-gray">'+
				'</div>'+
				'<div class="pay-fbi-waring">'+
					'<span>特别提醒:本次支付为虚拟物品,不予退款,敬请谅解</span>'+
				'</div>'+
				'<div class="pay-tip-gopay">'+
					'<a href="javascript:;">前往支付</a>'+
				'</div>'+
			'</div>'+
			'<div class="pay-tip-result" style="display:none;">'+
				'<div class="pay-tip-result-title">'+
					'<span>支付遇到问题?</span>'+
				'</div>'+
				'<div class="pay-tip-result-waring">'+
					'<span><strong>温馨提示:</strong>支付完成前请不要关闭窗口,完成支付后请根据情况点击下面按钮</span>'+
				'</div>'+
				'<div class="pay-tip-result-btn">'+
					'<a href="javascript:;" id="pay-success">赞赏成功</a>'+
					'<a href="javascript:;" id="pay-error">遇到问题</a>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';
	var htmlavatar = '<div class="project-sq-info"><span>您的支持将鼓励我们做得更好</span></div><ul class="project-sq-avatar"></ul>'+
	        	'<div class="project-sq-btnarea"><a href="javascript:;">赞赏支持</a></div>';

	$(".pay-area").append(html);
	$(".project-sq").append(htmlavatar);

	$.ajax({
		url:"/knowledge/getPayMember",
		type:"post",
		dataType: 'json',
		data:{"pename":paypraise.pename,"kename":paypraise.kename},
		sync:false,
		success:function(data){
			if(data.statusCode == 200){
				loadMember(data.data.data);
				if(data.data.count>8)$(".project-sq-avatar").append('<li><span>等'+data.data.count+'人</span></li>');
			}
		}
	});
}
function loadMember(data){
	var ob = eval(data);
	if(ob.length != 0){
		for(var o in ob){
	  		$(".project-sq-avatar").append('<li><a href="/u/'+ob[o].uid+'" title="'+ob[o].nickname+'" target="_blank" ><img src="attachments/avatar/avatar_'+ob[o].username+'.jpg"></a></li>');
    	}
	}
}