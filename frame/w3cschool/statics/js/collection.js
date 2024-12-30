

$("#collection").on("click",function(){
	openCollection();
});

function openCollection(){

	var ctype = $('#collection').attr('data-ctype');

	var ename = '';
	if(ctype == 'kn'){
		ename = kn.kename;
	}else{
		ename = kn.pename;
	}

	$.ajax({
		url:'/collection/getCollectionList',
		type:"post",
		dataType: 'json',
		data:{"ename":ename,"ctype":ctype},
		sync:false,
		success:function(data){
			var htmls = collectionhtml = '';
			var html  =  '<div class="dialog-box" style="display:block;">'
								+'<div class="dialog-box-content" style="width: 800px;">'
									+'<div class="dialog-box-head">'
										+'<span class="dialog-box-title">加入到我管理的专题</span>'
										+'<span id="closeDialog" class="dialog-box-close">X</span>'
									+'</div>'
									+'<div class="dialog-box-body">';

			html += '<lable>标题补充：</lable>' 
			+ '<input placeholder="可替代当前文章的标题进行显示" name="titletag" class="dialog-text" id="dialog-titletag" type="text">';
			if(data.statusCode == 200){
				collectionhtml += '<ul><li><b>我创建的专题</b></li>';
				list = data.data;
				var x = 0;
				for (var i = 0; i < list.length; i++) {
					arr = list[i];
					if(arr.addtype == 'create'){
						collectionhtml += '<li data-cid='+arr.id+'>'
						+'<div class="dialog-body-img"><img src="attachments/cover/'+arr.cover+'"></div>'
						+'<div class="dialog-body-title"><a href="/collection/'+arr.ename+'" target="_blank" >'+arr.bookname+'</a></div>';
						collectionhtml += '<div class="dialog-body-btn-box">';
						if(arr.islink == 1){
							collectionhtml += '<button class="search-s" id="updateCollection">更新</button>'
							+'<button class="search-s" id="deleteCollection">移除</button>';
						}else{
							collectionhtml += '<button class="search-s" id="addCollection">收录</button>';
						}

						collectionhtml += '</div></li>';
						x = (x+1)*1;
					}
				}
				if(x > 0){
					html += collectionhtml;
				}

				htmls += '<li><b>协同编辑的专题</b></li>';
				var n = 0;
				for (var i = 0; i < list.length; i++) {
					arr = list[i];
					if(arr.addtype != 'create'){
						htmls += '<li data-cid='+arr.id+'>'
						+'<div class="dialog-body-img"><img src="attachments/cover/'+arr.cover+'"></div>'
						+'<div class="dialog-body-title"><a href="/collection/'+arr.ename+'" target="_blank" >'+arr.bookname+'</a></div>';
						htmls += '<div class="dialog-body-btn-box">';
						if(arr.islink == 1){
							htmls += '<button class="search-s" id="updateCollection">更新</button>'
							+'<button class="search-s" id="deleteCollection">移除</button>';
						}else{
							htmls += '<button class="search-s" id="addCollection">收录</button>';
						}

						htmls += '</div></li>';
						n = (n+1)*1;
					}
				}
				if(n > 0){
					html += htmls;
				}


				html += '</ul>';
			}else{
				html += '<br/><br/><div>你还没有创建专题，<a href="/my">去新建一个</a></div>'
			}

			html += '</div>'
						+'<button class="dialog-body-btn" id="closeDialog">关闭</button>'
					+'</div>'
				+'</div>';
			$(".dialog-area").append(html);
		}
	});
}


$('.dialog-area').on('click','#closeDialog',function(){
	$('.dialog-area').html('');
});

$('.dialog-area').on('click','#addCollection',function(){

	var title = $('#dialog-titletag').val();
	var cid = $(this).parent().parent().attr('data-cid');
	var btn = $(this).parent('.dialog-body-btn-box');
	var ctype = $('#collection').attr('data-ctype');

	var ename = '';
	if(ctype == 'kn'){
		ename = kn.kename;
	}else{
		ename = kn.pename;
	}

	$.ajax({
		url:'/collection/saveCollectionLinks',
		type:"post",
		dataType: 'json',
		data:{"ename":ename,"title":title,"cid":cid,"ctype":ctype,"type":"add"},
		sync:false,
		success:function(data){
			if(data.statusCode == 200){

				var html = '<button class="search-s" id="updateCollection">更新</button>'
						+'<button class="search-s" id="deleteCollection">移除</button>';
				btn.html(html);
				toastr.success('收录成功','',{"positionClass": "toast-top-center"});
			}else if(data.statusCode == 300){
				toastr.warning("权限不足",'',{"positionClass": "toast-top-center"});
			}else{
				toastr.warning("收录失败",'',{"positionClass": "toast-top-center"});
			}
		}
	});
});

$('.dialog-area').on('click','#deleteCollection',function(){

	var ctype = $('#collection').attr('data-ctype');

	var ename = '';
	if(ctype == 'kn'){
		ename = kn.kename;
	}else{
		ename = kn.pename;
	}

	var cid = $(this).parent().parent().attr('data-cid');
	var btn = $(this).parent('.dialog-body-btn-box');
	$.ajax({
		url:'/collection/deleteCollectionLinks',
		type:"post",
		dataType: 'json',
		data:{"ename":ename,"cid":cid,"ctype":ctype},
		sync:false,
		success:function(data){
			if(data.statusCode == 200){

				var html = '<button class="search-s" id="addCollection">收录</button>';
				btn.html(html);
				toastr.success('移除收录成功','',{"positionClass": "toast-top-center"});
			}else if(data.statusCode == 300){
				toastr.warning("权限不足",'',{"positionClass": "toast-top-center"});
			}else{
				toastr.warning("移除收录失败",'',{"positionClass": "toast-top-center"});
			}
		}
	});
});

$('.dialog-area').on('click','#updateCollection',function(){

	var ctype = $('#collection').attr('data-ctype');

	var ename = '';
	if(ctype == 'kn'){
		ename = kn.kename;
	}else{
		ename = kn.pename;
	}
	var title = $('#dialog-titletag').val();
	var cid = $(this).parent().parent().attr('data-cid');
	var btn = $(this).parent('.dialog-body-btn-box');
	$.ajax({
		url:'/collection/saveCollectionLinks',
		type:"post",
		dataType: 'json',
		data:{"ename":ename,"title":title,"cid":cid,"ctype":ctype},
		sync:false,
		success:function(data){
			if(data.statusCode == 200){

				toastr.success('更新成功','',{"positionClass": "toast-top-center"});
			}else if(data.statusCode == 300){
				toastr.warning("权限不足",'',{"positionClass": "toast-top-center"});
			}else{
				toastr.warning("更新失败",'',{"positionClass": "toast-top-center"});
			}
		}
	});
});






