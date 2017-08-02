$(function(){	
	var evts = {	
		"page" : function(e){
			var pg;			
			if("number" == typeof(e)){	
				if(0 == e){
					var node = $("#page li.active").find("a");
					if(0 != node.length){
						pg = node.attr("href").split("=")[1];					
					}else{
						pg = 1;
					}					
				}else{
					pg = e;
				}
			}else{
				e.preventDefault();//阻止a链接的跳转行为			
				pg = $(this).attr("href").split("=")[1];
			}
			var key = $("#search-msg-btn").prev().val();			
			
			var url, data;
			if(0 == key.length){
				url = "/content/list_msg";
				data = {'type' : msg_constant.MSG_TYPE_PIC_TEXT, 'page' : pg, 'count' : msg_constant.PAGE_LEN};
			}else{
				url = "/content/search_msg";
				data = {'keyword' : key, 'category' : msg_constant.SEARCH_CATE_MSG, 'type' : msg_constant.MSG_TYPE_PIC_TEXT,
								'page' : pg, 'count' : msg_constant.PAGE_LEN};
			}
			var success_callback = function(data){
				$('#picTxt-content').html(data);
				//table
				
				$(".action-delete").click(evts.delete_msg);
				$(".action-start").click(evts.start_msg);
				$(".action-stop").click(evts.stop_msg);
					
				//page
				$('#page a').click(evts.page);
			};
			var error_callback = function(data){
				bootbox.alert("查询数据失败");
			};
			
			$.ajax({
					'type':'get',
					'url':url, 
					'data': data,   
					'success':success_callback,  
					'error':error_callback,        
			});
			
		},
		"pic_page" : function(e){
			var pg;			
			if("number" == typeof(e)){	
				if(0 == e){
					var node = $("#pic_page li.active").find("a");
					if(0 != node.length){
						pg = node.attr("href").split("=")[1];					
					}else{
						pg = 1;
					}					
				}else{
					pg = e;
				}
			}else{
				e.preventDefault();//阻止a链接的跳转行为			
				pg = $(this).attr("href").split("=")[1];
			}
			var key = $("#search-msg-btn").prev().val();			
			
			var url, data;
			if(0 == key.length){
				url = "/content/list_msg";
				data = {'type' : msg_constant.MSG_TYPE_PIC, 'page' : pg, 'count' : msg_constant.PAGE_LEN};
			}else{
				url = "/content/search_msg";
				data = {'keyword' : key, 'category' : msg_constant.SEARCH_CATE_MSG, 'type' : msg_constant.MSG_TYPE_PIC,
								'page' : pg, 'count' : msg_constant.PAGE_LEN};
			}
			var success_callback = function(data){
				$('#pic-content').html(data);
				//table
				
				$(".action-delete").click(evts.delete_msg);
				$(".action-start").click(evts.start_msg);
				$(".action-stop").click(evts.stop_msg);
					
				//page
				$('#pic_page a').click(evts.pic_page);
			};
			var error_callback = function(data){
				bootbox.alert("查询数据失败");
			};
			
			$.ajax({
					'type':'get',
					'url':url, 
					'data': data,   
					'success':success_callback,  
					'error':error_callback,        
			});
			
		},
		"cover_image_change" : function(){			
			if($(".msg-btn-file :file").hasClass("pic9")){
				if($("#show-pic img").length ==9)
					return;
			}
			
			var check_succ = function(){
				$("span.msg-btn-file").next().addClass("hide");	
			};
			var check_err = function(){
				$("span.msg-btn-file").next().removeClass("hide");
			};
			
			var upload_succ = function(ret){
				var fid = ret.data.fid;
				var url = get_image_url(msg_config.STORAGE_SERVER, msg_constant.IMAGE_NAMESPACE, fid);
				//$("#cover-url").html(url);
				//var img = $("<img />").attr("src", url).attr("alt", "img").css("width","50px").css("height":"35px");

				if($(".msg-btn-file :file").hasClass("pic9")){
					var img = $("<img src=" + url + " alt='cover' />");
					$("#show-pic").append(img);
					if($("#show-pic img").length %3 ==0)
						$("#show-pic").append($("<br />"));
				}else{
					var img = $("<img src=" + url + " alt='cover' />");
					$("#show-cover img").remove();
					$("#show-cover").append(img);
				}

				$(".msg-btn-file :file").val('');
				
			};
			
			var upload_err = function(){
				bootbox.alert("上传图片失败");
				$(".msg-btn-file :file").val('');
			};
			
			check_upload_image($(this), check_succ, check_err, upload_succ, upload_err);
		},

		"pic_delete" : function(e){
				
				if($("#show-pic img").length %3 ==0)
					$("#show-pic").children().last().remove(); //删除换行
				$("#show-pic img").last().remove();
		},

		"picTxt_save" : function(e){
			e.preventDefault();
			var isOk = true;
			var op = $("div.page-content").attr("op");
			var title = $.trim($("#dialog-title").val());
			if((0 == title.length) || (60 < title.length)){
				$("#dialog-title").next().removeClass("hide");
				isOk = false;
			}else{
				$("#dialog-title").next().addClass("hide");
			}
			var author = $("#dialog-author").val();
			if((0 == author.length) || (8 < author.length)){
				$("#dialog-author").next().removeClass("hide");
				isOk = false;
			}else{
				$("#dialog-author").next().addClass("hide");
			}
			/*						
			var cover_img = $("#cover-url").html();
			if("" == cover_img){
				isOk = false;
				$("#dialog-cover").next().removeClass("hide");
			}
			*/
			var cover_img = $("#show-cover img").attr("src");
			if(undefined == cover_img){
				$("#show-cover").next().next().next().removeClass("hide");
				isOk = false;
			}else{
				$("#show-cover").next().next().next().addClass("hide");
			}
			
			var brief = $("#dialog-brief").val();
			if((0 == brief.length) || (140 < brief.length)){
				$("#dialog-brief").next().removeClass("hide");
				isOk = false;
			}else{
				$("#dialog-brief").next().addClass("hide");
			}
			var text = $("#editor1").html();
			if(0 == text.length){
				$("#editor1").next().removeClass("hide");
				isOk = false;
			}else{
				$("#editor1").next().addClass("hide");
			}
			
			if(!isOk){
				return;
			}
			
			var content = {"title": title, "author":author, "cover":cover_img, "brief":brief,"text":text};
			if("new" == op){
				var params = {
					"type" : 5,
					"content" : JSON.stringify(content),
					"status" : 0,
				};
				$.ajax({
                        'type':'post',
                        'url':"/content/bg_post_msg", 
                        'data': params,  
                        'success':function(ret){
							if(0 == ret.e.code){
								window.location.href = "/content/get_pictxt_page";
							}else{
								bootbox.alert("操作失败");
							}
                            
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
				});
			}else{				
				var params = {
					"msgid" : $("div.page-content").attr("msgid"),					
					"type" : 5,
					"content" : JSON.stringify(content),					
				};
				$.ajax({
                        'type':'post',
                        'url':"/content/bg_update_msg_content", 
                        'data': params,  
                        'success':function(data){                           
							if(0 == data.e.code){
								window.location.href = "/content/get_picTxt_page";
							}else{
								bootbox.alert("操作失败");
							}
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
				});
			}
			
		},
		"pic_save" : function(e){
			//alert("ss");
			e.preventDefault();
			var isOk = true;
			var op = $("div.page-content").attr("op");
			var title = $.trim($("#dialog-title").val());
			if((0 == title.length) || (60 < title.length)){
				$("#dialog-title").next().removeClass("hide");
				isOk = false;
			}else{
				$("#dialog-title").next().addClass("hide");
			}
		
			
			
			if($("#show-pic img").length <1){
				$("span.msg-btn-file").next().removeClass("hide");
				isOk = false;
			}
			
			var text = $("#dialog-text").val();
			if(0 == text.length || (500 < text.length)){
				$("#dialog-text").next().removeClass("hide");
				isOk = false;
			}else{
				$("#dialog-text").next().addClass("hide");
			}
			
			if(!isOk){
				//alert("hh");
				return;
			}
			
			var images = new Array();
			$("#show-pic img").each(function(){
				images.push($(this).attr("src"));
			});
		
			var thumbs = images;
			var content = {"title": title, "text":text, "images":images, "thumbs":thumbs};
			
			if("new" == op){
				//alert("new");
				var params = {
					"type" : 2,
					"content" : JSON.stringify(content),
					"status" : 0,
				};
				//console.log(params);
				$.ajax({
                        'type':'post',
                        'url':"/content/bg_post_msg", 
                        'data': params,  
                        'success':function(ret){
                        	// alert(ret);
                        	// alert("why");
							if(0 == ret.e.code){
								window.location.href = "/content/get_pic_page";
							}else{
								bootbox.alert("操作失败");
							}
                            
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败..");
                        }        
				});
			}else{				
				var params = {
					"msgid" : $("div.page-content").attr("msgid"),					
					"type" : 2,
					"content" : JSON.stringify(content),					
				};
				//console.log(params);
				$.ajax({
                        'type':'post',
                        'url':"/content/bg_update_msg_content", 
                        'data': params,  
                        'success':function(data){                           
							if(0 == data.e.code){
								window.location.href = "/content/get_pic_page";
							}else{
								bootbox.alert("操作失败");
							}
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
				});
			}
			
		},
		
		"delete_msg" : function(){
			//alert("ee");
			var td = $($(this).parent().parent().parent()[0]);
			var id = $($(this).parent().parent().parent()[0]).find(":eq(1)").html();
			//alert(id);
			$.ajax({
					'type':'get',
					'url':"/content/bg_delete_msg", 
					'data': {"msgid" : id}, 
					'success':function(json){
						if(0 != json.e.code){
							bootbox.alert("删除内容失败");
						}else{
							var pg = 0;
							
							if($(".page-content").attr("data-type") =="picTxt"){
								if( 1 == $("#picTxt-table > tbody > tr").length){
									var node = $("#page li.active").find("a");
									if(0 != node.length){
										var tmppg = parseInt(node.attr("href").split("=")[1]);
										if(tmppg > 1){
											pg = tmppg -1;
										}
									}
								}
								evts.page(pg);
							}							
								
							if($(".page-content").attr("data-type") =="pic"){
								if( 1 == $("#picTxt-table > tbody > tr").length){
									var node = $("#pic_page li.active").find("a");
									if(0 != node.length){
										var tmppg = parseInt(node.attr("href").split("=")[1]);
										if(tmppg > 1){
											pg = tmppg -1;
										}
									}
								}
								evts.pic_page(pg);
							}
								
						}
					},  
					'error':function(data){
						bootbox.alert("操作失败");
					}        
			});
		},
		
		'search_msg' : function(){
			var key = $("#search-msg-btn").prev().val();
			
			var params = {'category' : msg_constant.SEARCH_CATE_MSG, 'type' : msg_constant.MSG_TYPE_PIC_TEXT,
											'page' : 1, 'count' : msg_constant.PAGE_LEN};
											
			if(0 != key.length){
				params['keyword'] = key;
			}						
			if($(".page-content").attr("data-type") =="picTxt"){
						$.ajax({
							'type':'get',
							'url':"/content/search_msg", 
							'data': params, 
							'success':function(data){
								$('#picTxt-content').html(data);
								//table
								
								$(".action-delete").click(evts.delete_msg);
								$(".action-start").click(evts.start_msg);
								$(".action-stop").click(evts.stop_msg);		
								//page
								$('#page a').click(evts.page);
								
							},  
							'error':function(data){
								bootbox.alert("搜索消息失败");
							}        
			            });
			}
			if($(".page-content").attr("data-type") =="pic"){
						params['type'] = msg_constant.MSG_TYPE_PIC;
						$.ajax({
							'type':'get',
							'url':"/content/search_msg", 
							'data': params, 
											
							'success':function(data){
								$('#pic-content').html(data);
								//table
								
								$(".action-delete").click(evts.delete_msg);
								$(".action-start").click(evts.start_msg);
								$(".action-stop").click(evts.stop_msg);		
								//page
								$('#pic_page a').click(evts.pic_page);
								
							},  
							'error':function(data){
								bootbox.alert("搜索消息失败");
							}        
			            });
			}
			
			
		},
		'start_msg' : function(){
			var id = $($(this).parent().parent().parent()[0]).find(":eq(1)").html();
			evts.update_status(id, 1);
		},
		'stop_msg' : function(){
			var id = $($(this).parent().parent().parent()[0]).find(":eq(1)").html();					
			evts.update_status(id, 0);
		},
		"update_status" : function(id, status){
			$.ajax({
					'type':'get',
					'url':"/content/bg_update_msg", 
					'data': {"msgid" : id, "status" : status}, 
					'success':function(json){
						if(0 != json.e.code){
							bootbox.alert("修改内容失败");
						}else{
							if($(".page-content").attr("data-type") =="picTxt")
								evts.page(0);
							if($(".page-content").attr("data-type") =="pic")
								evts.pic_page(0);
						}
					},  
					'error':function(data){
						bootbox.alert("操作失败");
					}        
			});
		},
		
	};
	
	var bindEvents = function(){
		//form	

		$("#search-msg-btn").click(evts.search_msg);
		//table		
		$(".action-delete").click(evts.delete_msg);
		$(".action-start").click(evts.start_msg);
		$(".action-stop").click(evts.stop_msg);
		
		//page
		$('#page a').click(evts.page);
		$('#pic_page a').click(evts.pic_page);
		
		//new edit message
		$("#picTxt-save").click(evts.picTxt_save);
		$("#pic-save").click(evts.pic_save);

		$("#delete_pic").click(evts.pic_delete);
		//$("#dialog-cover").change(evts.cover_image_change);
		$(".msg-btn-file :file").change(evts.cover_image_change);
		
	};
   
	var init = function(){
		//init editor
		$('#editor1').ace_wysiwyg();
		$('#editor1').css("min-height","100px");
		$('#editor1').css("border","1px solid #cccccc");
		
		//Add Image Resize Functionality to Chrome and Safari
		//webkit browsers don't have image resize functionality when content is editable
		//so let's add something using jQuery UI resizable
		//another option would be opening a dialog for user to enter dimensions.
		if ( typeof jQuery.ui !== 'undefined' && /applewebkit/.test(navigator.userAgent.toLowerCase()) ) {
			
			var lastResizableImg = null;
			function destroyResizable() {
				if(lastResizableImg == null) return;
				lastResizableImg.resizable( "destroy" );
				lastResizableImg.removeData('resizable');
				lastResizableImg = null;
			}

			var enableImageResize = function() {
				$('.wysiwyg-editor')
				.on('mousedown', function(e) {
					var target = $(e.target);
					if( e.target instanceof HTMLImageElement ) {
						if( !target.data('resizable') ) {
							target.resizable({
								aspectRatio: e.target.width / e.target.height,
							});
							target.data('resizable', true);
							
							if( lastResizableImg != null ) {//disable previous resizable image
								lastResizableImg.resizable( "destroy" );
								lastResizableImg.removeData('resizable');
							}
							lastResizableImg = target;
						}
					}
				})
				.on('click', function(e) {
					if( lastResizableImg != null && !(e.target instanceof HTMLImageElement) ) {
						destroyResizable();
					}
				})
				.on('keydown', function() {
					destroyResizable();
				});
			}
			
			enableImageResize();

			/**
			//or we can load the jQuery UI dynamically only if needed
			if (typeof jQuery.ui !== 'undefined') enableImageResize();
			else {//load jQuery UI if not loaded
				$.getScript($path_assets+"/js/jquery-ui-1.10.3.custom.min.js", function(data, textStatus, jqxhr) {
					if('ontouchend' in document) {//also load touch-punch for touch devices
						$.getScript($path_assets+"/js/jquery.ui.touch-punch.min.js", function(data, textStatus, jqxhr) {
							enableImageResize();
						});
					} else	enableImageResize();
				});
			}
			*/
		}
		
		bindEvents();
	};
	
	init();
});