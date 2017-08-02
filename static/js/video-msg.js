$(function(){
	
	var evts = {
		"page" : function(e){
			var pg;			
			if("number" == typeof(e)){	
				if(0 == e){					
					var node = $("#video-msg-page li.active").find("a");
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
				data = {'type' : msg_constant.MSG_TYPE_VIDEO, 'page' : pg, 'count' : msg_constant.PAGE_LEN};
			}else{
				url = "/content/search_msg";
				data = {'keyword' : key, 'category' : msg_constant.SEARCH_CATE_MSG, 'type' : msg_constant.MSG_TYPE_VIDEO,
								'page' : pg, 'count' : msg_constant.PAGE_LEN};
			}
			var success_callback = function(data){
				$('#video-content').html(data);
				//table
				
				$(".action-delete").click(evts.delete_msg);
				$(".action-start").click(evts.start_msg);
				$(".action-stop").click(evts.stop_msg);		
				//page
				$('#video-msg-page a').click(evts.page);
				
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
		
		'select_video_click' : function(e){
			$.ajax({
				'type':'get',
				'url':"/content/get_all_videoinfos", 
				'data': {'page' : 1, 'page_length' : msg_constant.PAGE_LEN},  
				'success':function(data){										
					$("#search-video-content").html(data);
					$('#search-video-page a').click(evts.select_video_page);
					//$("#video-info-list").removeClass("hide");
					$("#video-info-list").modal("show");
					
				},  
				'error':function(data){
					bootbox.alert("操作失败");
				}        
            });
		},
		'select_video_ok' : function(e){
			e.preventDefault();
			var radio = $("#search-video-table input:checked");
			if(0 == radio.length){
				$(this).prev().removeClass("hide");
				return;
			}else{
				$(this).prev().addClass("hide");
			}
			var duration = radio.parent().parent().attr("duration");
			var thumbs = radio.parent().parent().attr("thumbs");
			var source = radio.parent().parent().attr("source");
			var vid = radio.parent().next().html();
			var title = radio.parent().next().next().attr("title");
			$("#dialog-video-info").html(title).attr("vid", vid).attr("duration", duration)
						.removeClass("hide").attr("thumbs", thumbs).attr("source", source);			
			//$("#video-info-list").addClass("hide");
			$("#video-info-list").modal("hide");
		},
		
		'select_video_page' : function(e){		
			e.preventDefault();//阻止a链接的跳转行为			
			var pg = $(this).attr("href").split("=")[1];
			var key = $("#video-info-search-btn").prev().val();
			if(0 == key.length){
				$.ajax({
					'type':'get',
					'url':"/content/get_all_videoinfos", 
					'data': {'page' : pg, 'page_length' : msg_constant.PAGE_LEN},  
					'success':function(data){
						$('#search-video-content').html(data);
						$('#search-video-page a').click(evts.select_video_page);					
					},  
					'error':function(data){
						bootbox.alert("操作失败");
					}        
				});				
			}else{
				$.ajax({
					'type':'get',
					'url':"/content/search_videoinfos", 
					'data': {'input' : key, 'page' : pg, 'page_length' : msg_constant.PAGE_LEN}, 								
					'success':function(data){
						$('#search-video-content').html(data);
						$('#search-video-page a').click(evts.select_video_page);					
					},  
					'error':function(data){
						bootbox.alert("搜索消息失败");
					}        
				});
			}
			
		},
		'msg_save' : function(e){
			e.preventDefault();
			var op = $("div.page-content").attr("op");
			var isOk = true;
			
			var title = $.trim($("#dialog-title").val());
			if((0 == title.length) || (60 < title.length)){
				$("#dialog-title").next().removeClass("hide");
				isOk = false;
			}else{
				$("#dialog-title").next().addClass("hide");
			}	
			
			var vid = $("#dialog-video-info").attr("vid");
			if(undefined == vid){
				$("#dialog-video-info").next().removeClass("hide");
				isOk = false;
			}else{
				$("#dialog-video-info").next().addClass("hide");
			}
			
			var cover = $("#show-cover img").attr("src");
			if(undefined == cover){
				$("#show-cover").next().next().next().removeClass("hide");
				isOk = false;
			}else{
				$("#show-cover").next().next().next().addClass("hide");
			}
			
			var brief = $("#dialog-brief").val();
			if(0 == brief.length){
				$("#dialog-brief").next().removeClass("hide");
				isOk = false;
			}else{
				$("#dialog-brief").next().addClass("hide");
			}			
			var duration = parseInt($("#dialog-video-info").attr("duration"));
			var post_url = $("#dialog-video-info").attr("thumbs");
			var source = $("#dialog-video-info").attr("source");			
			var thumbs = Array(post_url);
			if(!isOk){
				return;
			}

			var content = {"title" : title, "brief" : brief, "video" : vid, "thumbs" : thumbs, 
								"duration":duration, "cover" : cover, "video_src" : source};
						
			if("new" == op){
				var params = {
					"type" : msg_constant.MSG_TYPE_VIDEO,
					"content" : JSON.stringify(content),
					"status" : 0,
				};
				$.ajax({
                        'type':'post',
                        'url':"/content/bg_post_msg", 
                        'data': params,  
                        'success':function(ret){
							if(0 == ret.e.code){
								window.location.href = "/content/get_video_page";	
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
					"type" : msg_constant.MSG_TYPE_VIDEO,
					"content" : JSON.stringify(content),					
				};
				$.ajax({
                        'type':'post',
                        'url':"/content/bg_update_msg_content", 
                        'data': params,  
                        'success':function(data){                           
							if(0 == data.e.code){
								window.location.href = "/content/get_video_page";
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
			var td = $($(this).parent().parent().parent()[0]);
			var id = $($(this).parent().parent().parent()[0]).find(":eq(1)").html();
						
			$.ajax({
					'type':'get',
					'url':"/content/bg_delete_msg", 
					'data': {"msgid" : id}, 
					'success':function(json){
						if(0 != json.e.code){
							bootbox.alert("删除内容失败");
						}else{
							var pg = 0;
							if( 1 == $("#msg-table > tbody > tr").length){
								var node = $("#video-msg-page li.active").find("a");
								if(0 != node.length){
									var tmppg = parseInt(node.attr("href").split("=")[1]);
									if(tmppg > 1){
										pg = tmppg -1;
									}
								}
							}
							evts.page(pg);
						}
					},  
					'error':function(data){
						bootbox.alert("操作失败");
					}        
			});
		},		
				
		'close_search_video_dialog' : function(){
			$("#video-info-list").addClass("hide");
		},
		"cover_image_change" : function(){			
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
				var img = $("<img src=" + url + " alt='cover' />");
				$("#show-cover img").remove();
				$("#show-cover").append(img);
			}
			
			var upload_err = function(){
				bootbox.alert("上传图片失败");
			}
			check_upload_image($(this), check_succ, check_err, upload_succ, upload_err);
		},
		
		'video_info_search' : function(){
			var key = $("#video-info-search-btn").prev().val();
			if(0 == key.length){
				//bootbox.alert("请输入关键字");
				return;
			};
			$.ajax({
				'type':'get',
				'url':"/content/search_videoinfos", 
				'data': {'input' : key, 'page' : 1, 'page_length' : msg_constant.PAGE_LEN}, 								
				'success':function(data){
					$('#search-video-content').html(data);
					$('#search-video-page a').click(evts.select_video_page);					
				},  
				'error':function(data){
					bootbox.alert("搜索消息失败");
				}        
            });
		},
		'search_msg' : function(){
			var key = $("#search-msg-btn").prev().val();
			var params = {'category' : msg_constant.SEARCH_CATE_MSG, 'type' : msg_constant.MSG_TYPE_VIDEO,
								'page' : 1, 'count' : msg_constant.PAGE_LEN};
			
			if(0 != key.length){
				params['keyword'] = key;
			}
			$.ajax({
				'type':'get',
				'url':"/content/search_msg", 
				'data': params, 
				'success':function(data){
					$('#video-content').html(data);
					//table
					
					$(".action-delete").click(evts.delete_msg);
					$(".action-start").click(evts.start_msg);
					$(".action-stop").click(evts.stop_msg);	
					//page
					$('#video-msg-page a').click(evts.page);
					
				},  
				'error':function(data){
					bootbox.alert("搜索消息失败");
				}        
            });
			
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
							evts.page(0);
						}
					},  
					'error':function(data){
						bootbox.alert("操作失败");
					}        
			});
		},
	};
	
	var bindEvents = function(){
		$("#search-msg-btn").click(evts.search_msg);
				
		$("#video-msg-page a").click(evts.page);
		
		
		$(".action-delete").click(evts.delete_msg);
		$(".action-start").click(evts.start_msg);
		$(".action-stop").click(evts.stop_msg);
		
		//new&edit dialog
		$("#select-video").click(evts.select_video_click);
		$("#msg-save").click(evts.msg_save);
		
		$(".msg-btn-file :file").change(evts.cover_image_change);
		
		//search video
		$("#select-video-ok").click(evts.select_video_ok);
		//$("#video-info-list button.close").click(evts.close_search_video_dialog);
		$("#video-info-search-btn").click(evts.video_info_search);
	};
   
	var init = function(){				
		bindEvents();
	};
	
	init();
});