var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?a3c0d937c858fbe264753596e485cd38";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan style='display:none;' id='cnzz_stat_icon_1259964532'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1259964532' type='text/javascript'%3E%3C/script%3E"));
// 百度自动推送代码
(function(){
	if (location.href != "http:" || location.href != "https:") {
	    var bp = document.createElement('script');
	    var curProtocol = window.location.protocol.split(':')[0];
	    if (curProtocol === 'https') {
	        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
	    }
	    else {
	        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	    }
	    var s = document.getElementsByTagName("script")[0];
	    s.parentNode.insertBefore(bp, s);
	}
})();
/**添加到收藏**/
function addFavoriteTool() {
    var url = window.location || '//www.w3cschool.cn';
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {
		try{
		window.external.addFavorite(url, title);
		}catch(e){
		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		}
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
    else {
  		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}
var logintype = false;
/**返回顶部**/
$(function(){
	var $body=$(document.body);
	var $bottomTools=$(".bottom-tools");
	var $qrTools=$(".qr-tool");
	var qrImg=$(".qr-img");
	$(window).scroll(function(){var scrollHeight=$(document).height();var scrollTop=$(window).scrollTop();var $footerHeight=$(".page-footer").outerHeight(true);var $windowHeight=$(window).innerHeight();scrollTop>50?$("#scrollUp").fadeIn(200).css("display","block"):$("#scrollUp").fadeOut(200);$bottomTools.css("bottom",scrollHeight-scrollTop-$footerHeight>$windowHeight?40:$windowHeight+scrollTop+$footerHeight+40-scrollHeight)});$("#scrollUp").click(function(e){e.preventDefault();$("html,body,.main-container").animate({scrollTop:0})});$qrTools.hover(function(){var href = window.location.href.replace("http://www.w3cschool.cn","http://m.w3cschool.cn").replace("http://w3cschool.cn","http://m.w3cschool.cn");if(href == "http://m.w3cschool.cn/"){$(">img", qrImg).attr("src", "/statics/images/w3c/w3cschool.jpg");}else{$(">img", qrImg).attr("src", "/qrapi?text=" + href + "&size=150&level=L");}qrImg.fadeIn()},function(){qrImg.fadeOut()})

	var	temp;
	var html = '';
	var datatype = '';
	
	var webdomain = typeof domain == 'undefined'?'//www.w3cschool.cn':domain;
	datatype = $.cookie('the_cookie');
	$.ajaxdo({
		type : "POST",
		url  : "/index/checkHeader",
		dataType : "json", 
		data : {},
		success : function(data){
 
			var arr = eval(data);
			var info = arr.data;

			if(typeof info.uid != 'undefined'){
				logintype = true;
			}
			if(typeof apppath != 'undefined'){
				if(arr.statusCode == '200' && typeof info.username != 'undefined'){
					
					html = html + '<div class="dropdown-user dropdown-box" id="dropdown-user" >'
					+'<a data-close-others="true" class="dropdown-toggle-list" href="'+webdomain+'/my">'
					+'<img width="30" height="30" src="/attachments/avatar/avatar_'+info.username+'.jpg" alt="个人头像">'
					+' 个人中心 <i class="down-icon1 angle-down-icon"></i>'
					+'</a>'
					+'<div id="dropdown-menu" class="dropdown-menu dropdown-box" style="display: none;">'
					+'<span class="j"></span>'
					+'<ul class="dropdown-list">'
					+'<li><a href="'+webdomain+'/u/'+info.uid+'"><i class="sns-icon home-icon"></i> 我的主页</a></li>'
					+'<li><a href="'+webdomain+'/my#setting"><i class="sns-icon cog-icon"></i> 个人设置</a></li>'
					+'<li class="divider"></li>'
					+'<li><a href="'+webdomain+'/logout?refer='+apppath+'"><i class="sns-icon key-icon"></i> 退出</a></li>' 
					+'</ul>'
					+'</div>'
					+'</div>';
					$('.sig-box').html(html);
					$('.header-app').remove();
					$(document).on("mouseover",function(e) {	
				        $("#dropdown-menu").hide();
				        $("#dropdown-feed-menu").hide();
				        e = e||event; stopFunc(e);
				    });
				    $("#dropdown-user").on("mouseover",function(e) {	
				        $("#dropdown-menu").show();
				        $("#dropdown-feed-menu").hide();
				        e = e||event; stopFunc(e);
				    });
				    $("#header_notification_bar").on("mouseover",function(e) {	
				        $("#dropdown-feed-menu").show();
				        $("#dropdown-menu").hide();
				        e = e||event; stopFunc(e);
				    });
				 //    if(typeof info.nowUType != 'undefined' && info.nowUType == 1){

					// 	checkUserType();
					// }
				} else {
					html = html + '<div>'
							+'<a href="'+webdomain+'/register?refer='+apppath+'" class="login-bg">注册</a> | '
							+'<a href="'+webdomain+'/login?refer='+apppath+'">登录</a>'
							+'</div>'
					$('.sig-box').html(html);
					var dict = $('.widget-body').html();
					if(typeof dict != 'undefined'){
						var type = $('.widget-body').attr('data-type');
						var widget = '';
						if(type == 'index'){
							widget = widget + '<div class="widget-main" data-type="index" style="display: none;"><div class="widget-box"><div class="slogn">免费注册w3cschool，收藏你感兴趣的教程手册！</div><div class="quicklogin quick-box">'
						    +'<a href="/register?refer='+apppath+'" class="reg-btn">注册w3cschool</a><span>或直接</span><a href="/auth" class="qq-btn"><i class="pop-sns icons-qq"></i>QQ登录</a>'
						    +'<a href="/auth?platform=weixin" class="weixina"><i class="pop-sns icons-weixin"></i>微信登录</a><a href="/auth?platform=weibo" class="weibo-btn"><i class="pop-sns icons-weibo"></i>微博登录</a>'
						    +'<div class="weixinlogin" style=""><img style="width: 180px;height: 180px;" src="/qrapi?text=http://www.youj.com/auth?platform=weixin"><div style="margin-bottom: 10px;">使用微信扫码登录</div>'
						    +'</div></div><div class="sig-group"><a href="/login?refer='+apppath+'">已有账号，登录</a></div></div><a class="widget-box-close" href="javascript:;" title="关闭">X</a></div>';
						}else{
							widget = widget + '<div class="widget-main" style="display: none;"><div class="widget-box"><div class="slogn">Hi，看起来你挺喜欢这些内容，但是你还没有注册帐号！当你创建了帐号，你可以收藏感兴趣的内容，并记录你的阅读状态！</div>'
							+'<div class="quicklogin quick-box"><a href="/register?refer='+apppath+'">立即注册</a></div><div class="sig-group">'        	
					        +'<a href="/login?refer='+apppath+'">已有账号，登录</a></div></div><a class="widget-box-close" href="javascript:;" title="关闭">X</a></div>';
						}
						$('.widget-body').html(widget);
					}
				}
			}
		}
	});

	$(".onlinenote").on('click',function(e){
		if(logintype){// 已经登录
			showNoteDialog();
		}else{
			toastr.warning("请先登录!");
		}
		
	});

	// 发布文章
	$(".create-btn").on('click',function(e){
		if(logintype){// 已经登录
			showNavDialog(true);
		}else{
			showNavDialog(false);
			//window.location = '/login';
		}
	});


	$(".onlinenote").on('click',function(e){
		if(logintype){// 已经登录
			showNoteDialog();
		}else{
			toastr.warning("请先登录!");
		}
		
	});

	function getncbytar(){
		var tarkename = kn.kename;
		var tarpename = kn.pename;
		$.ajax({
			url:"/my/note/getncbytar",
			type:"post",
			data:{tarkename:tarkename,tarpename:tarpename},
			dataType:"json",
			success:function(msg){
				if(msg.statusCode < 300){
					var ncinfo = msg.data.nc_info;
					$(".ntitle").val(ncinfo.ntitle);
					mdeditor.setMarkdown(ncinfo.ncontent);
				}else{
					if(msg.statusCode != 405){ // 405 表示没有找到笔记不显示	
						toastr.warning(msg.message);
					}
				}
			}
		});

	}

	//显示笔记模态框
	function showNoteDialog(){
		
		if(typeof editormd == 'undefined'){
			var link1=document.createElement("link");  
			link1.type="text/css";
			link1.rel="stylesheet"; 
			link1.href="/plugins/markdown/editormd.css";  
			document.getElementsByTagName('head')[0].appendChild(link1);

			$.getScript('/statics/js/w3cdialog.js',function(){
				loadmdjs();
			});
			
		}else{
			
			if($("#w3cDtitle").is(":hidden")){
				$("#fbw3cDtitle").show();
				$("#w3cDtitle").show();
				getncbytar(); //重新获取笔记
			}else{
				colseNote();
			}
			
		}
		 
	}

	//显示引导模态框
	function showNavDialog(loginflag){
		
		if($("#dialogProxy").length == 0){
			var link1=document.createElement("link");  
			link1.type="text/css";
			link1.rel="stylesheet"; 
			link1.href="/statics/css/dialog.css";  
			document.getElementsByTagName('head')[0].appendChild(link1);
			link1.onload = function(){
				$.get("/statics/plugins/template/index_dialog.html",function(info){
					$("body").append(info);
					if(typeof AjaxDo == 'undefined'){
						$.getScript('/statics/core/ajaxdo.core.js',function(){
							if(loginflag){
								getDialogScript();
							}else{ // 未登录
								$.getScript('/statics/core/dialog.core.js',function(){
									$("#loadNav").after('<a id="unLoginDialog" style="display: none;"  href="/offlineCreateDialog" target="dialog"  rel="quick-add" mask="true" height="430" width="720" class="btn btn-default"><i class="icon-plus"></i> 发布</a>');
									AjaxDo.initUI();
									$("#unLoginDialog").trigger("click");
								});
							}
							
						});
					}else{
						if(loginflag){
							getDialogScript();
						}else{ // 未登录
							$.getScript('/statics/core/dialog.core.js',function(){
								$("#loadNav").after('<a id="unLoginDialog" style="display: none;"  href="/offlineCreateDialog" target="dialog"  rel="quick-add" mask="true" height="430" width="720" class="btn btn-default"><i class="icon-plus"></i> 发布</a>');
								AjaxDo.initUI();
								$("#unLoginDialog").trigger("click");
							});
							
						}
					}
					
				});
			};

		}else{ // 不需要加载了
			if(loginflag){
				AjaxDo.initUI();
				loadNav();
			}else{ // 未登录
				if($("#unLoginDialog").length == 0){
					$("#loadNav").after('<a id="unLoginDialog" style="display: none;"  href="/offlineCreateDialog" target="dialog"  rel="quick-add" mask="true" height="430" width="720" class="btn btn-default"><i class="icon-plus"></i> 发布</a>');
				}

				AjaxDo.initUI();
				$("#unLoginDialog").trigger("click");
				
				
			}
			
			//console.log("不需要加载了!!");
			
		}
		 
	}

	function getDialogScript(){
		$.getScript('/statics/core/dialog.core.js',function(){
			AjaxDo.initUI();
			loadNav();
		});
	}

	var mdeditor = null;
	// 加载markdown 编辑器的js
	function loadmdjs(){
		$.getScript("/plugins/markdown/editormd.js",function(msg){
				var prentitle = $("title").text().replace('_w3cschool','');
				$(".ntitle").val(prentitle);
				mdeditor = editormd("editorarea", {
			        mode:"markdown",
			        width   : "100%",
			        height  : 300,
			        syncScrolling : "single",
			        saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
			        watch : false,                // 关闭实时预览:true,
			        path    : "/plugins/markdown/lib/",
			        toolbarIcons : function() {
			            return editormd.toolbarModes['mini']; // full, simple, mini
			            
			        },
			        onload : function() {
			        	getncbytar(); // 获取笔记
			        }
		    });
			});
	}


	// 加载引导
	function loadNav(){
		$("#loadNav").trigger("click");
	}

	// 关闭笔记
	$(document).on('click',".closenote",function(){
		$("#fbw3cDtitle").hide();
		$("#w3cDtitle").hide();
	});

	// 保存笔记
	$(document).on('click',".notesubmit",function(){
		var tarkename = kn.kename;
		var tarpename = kn.pename;
		var ntitle = $('.ntitle').val();
		var ncontent = $('.ncontent').val();

		$.ajax({
			url:"/my/note/savenote",
			type:"post",
			data:{
				ntitle:ntitle,
				ncontent:ncontent,
				tarkename:tarkename,
				tarpename:tarpename,
				cfrom:'frontnote',
				editflag:'mdeditor',
				ntype:'kn'
			},
			dataType:"json",
			success:function(msg){
				if(msg.statusCode < 300){
					toastr.success("保存成功!");
				}else{
					toastr.warning(msg.message);
				}
			}
		});
	});
});

if(typeof jQuery.cookie == 'undefined'){
	jQuery.cookie = function(name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        var path = options.path ? '; path=' + options.path : '';
	        var domain = options.domain ? '; domain=' + options.domain : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};
}


// 防CSRF攻击
(function($){
	$.extend({
		ajaxdo:function(param){
			if(typeof param.type != 'undefined' && param.type.toLowerCase() == 'post'){
				if(typeof param.data == "undefined"){
					param.data = {};
				}
				param.data['_hash'] = $.cookie("ypre_saltkey");
			}else{
				param.url = param.url + (/\?/.test(param.url) ? "&" : "?")+ "_hash=" + $.cookie("ypre_saltkey");
			}
			$.ajax(param);
		}
	});

})(jQuery);

function stopFunc(e){
    e.stopPropagation?e.stopPropagation():e.cancelBubble = true;       
}

function checkUserType(){
	$.ajaxdo({
		type : "POST",
		url  : "/index/checkUserType",
		dataType : "json", 
		data : {},
		success : function(data) {
			var arr = eval(data);

			if(arr.statusCode == '200'){
				var info = arr.data;
				if(data.statusCode == '200' && typeof info.username != 'undefined'){
					$("#register-Box").attr('style','display:black;');
					$(".register-cover").attr('src','/attachments/avatar/'+info.avatar);
					$(".register-userinfo-title span").html(info.nickname+' (学号：'+info.uid+')');
				}
			}
		}
	});
}
$(window).on("scroll",function(e){
 	var height = $('.item-content').height();
 	var now = $(document).scrollTop();
 	var type = $('.widget-body').attr('data-type');
 	if(type == 'index'){
	 	if(now > height){
			$('.widget-main').slideDown();
 		}
 	}else{
		$('.widget-main').slideDown();
 	}
});
$('.widget-body').on('click','.widget-box-close',function(){
	$('.widget-main').remove();
});




//显示举报模态框
function showDialogBox (obj){

	var tid    = $(obj).attr("data-tid");
	var module = $(obj).attr("data-module");
	$(".feedback-Box").attr("data-tid",tid);
	$(".feedback-Box").attr("data-module",module);
	$("body").attr("style","overflow:hidden;");
	$(".feedback-Box").attr("style","display:block;");

	var checkScript = $("[src$='html2markdown.js']").attr('src');
	if(typeof checkScript == "undefined"){

		var script1=document.createElement("script");  
		script1.type="text/javascript";  
		script1.src="/plugins/xheditor/xheditor-1.2.2.min.js";  
		document.getElementsByTagName('head')[0].appendChild(script1);  

		var script2=document.createElement("script");  
		script2.type="text/javascript";  
		script2.src="/plugins/xheditor/xheditor_plugins/marked.min.js";  
		document.getElementsByTagName('head')[0].appendChild(script2);  

		var script3=document.createElement("script");  
		script3.type="text/javascript";  
		script3.src="/plugins/xheditor/xheditor_plugins/html2markdown.js";  
		document.getElementsByTagName('head')[0].appendChild(script3);  

		var script4=document.createElement("script");  
		script4.type="text/javascript";  
		script4.src="/statics/js/feedbackMarkdown.js";  
		document.getElementsByTagName('head')[0].appendChild(script4); 

	}
}
//关闭意见模态框
function closeDialogBox (obj){

	$(".feedback-text").attr("value","");
	$("body").attr("style","");
	$(".feedback-Box").attr("style","display:none;");
	$(".register-Box").attr("style","display:none;");
	$('.feedback-box input:radio:checked').removeAttr('checked');
	$('.register-box input:radio:checked').removeAttr('checked');
}

function dialogSubmit (obj){
	var ftid = $(".comment_replys_show_box").attr("data-tid");
	var fpid = $(".comment_replys_show_box").attr("data-pid");
	var ftype = $(".comment_replys_show_box").attr("data-type");
	var fusername = $(".comment_replys_show_box").attr("data-username");
	var tid     = $(".feedback-Box").attr("data-tid");
	var module  = $(".feedback-Box").attr("data-module");
 	var url     = window.location.href;
 	var content = $(".feedback-text").val();
 	var contact = $("#reportAddress").val();
 	var type    = $('#feedbackRadio').attr("data-value");
	if( content.length == 0){
		alert("反馈内容不能为空");
		return;
	}
 	$.ajaxdo({
		type:"post",
	    url:"/comment/feedback",
	    async: false,
	    data: {tid:tid,kename:ftid,pename:fpid,module:module,url:url,content:content,type:type,contact:contact},
	    success:function(data){
	    	var arr = eval("("+data+")");
	    	alert(arr['message']);
    		$(".feedback-text").attr("value","");
    		$("body").attr("style","");
    		$(".feedback-Box").attr("style","display:none;");
    		$('.feedback-box input:radio:checked').removeAttr('checked');
	    }
	});
}
$(function(){
	$('.search-set input').attr('value',1);
});
$('.search-sort-item').on('click',function(){
	var view = $(".search-sort-list").attr('view');
	if(view == 'hide'){
		$(".search-sort-list").show();
		$(".search-sort-list").attr('view','show');
	}else{
		$(".search-sort-list").attr('view','hide');
		$(".search-sort-list").hide();
	}
	
});
$('.search-sort-item ul li').on('click',function(){
	var type = $(this).attr('type');
	var text = $(this).html();
	$('.search-sort-item ul li').show();
	$(this).hide();
	$('.search-set input').attr('value',type);
	$('.search-set span').html(text);
});