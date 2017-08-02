/**
 * Created by V10103366 on 2015/7/24.
 */

$(function()
{
    var constant =
    {
        PAGE_LEN : 10,
		
		MODAL_PAGE_LEN : 4,
		
		RULE_STATUS_START : 1,
		
		MSG_STATUS_PASSED : 1,
		
		MSG_FILL_TIP : "消息的推荐信息非必填，且不填写时将显示消息默认的标题，封面和摘要。",
		USER_FILL_TIP : "用户的推荐信息非必填，且不填写时将显示用户默认的昵称，头像和简介。",
    };

    var evts =
    {
        freshTmpl : function(data)
        {
            var tmplCount = data.pagetemplate.length;
            $("div[name='modalname']").empty();
            if(tmplCount < 1)
            {
                $("div[name='modalname']").append("<span class='help-inline'>未查找到模板</span>");
            }
            else
            {
                for(var i = 0; i < tmplCount; i++)
                {
                    var item = "<span class='btn btn-minier";
                    if(i == 0)
                    {
                        item += " btn-yellow'";
                    }
                    else
                    {
                        item += "' style='margin-left:5px'";
                    }
                    item += " name='tmpl'";
                    item += " status='" + data.pagetemplate[i].status + "'";
                    item += " tmplid='" + data.pagetemplate[i].id + "'>" + data.pagetemplate[i].alias + "</span>";

                    $("div[name='modalname']").append(item);
                }
            }
        },
        freshModul : function(data)
        {
            var modulCount = data.modules.length;
            $("div[name='modulename']").empty();
            if(modulCount < 1)
            {
                $("div[name='modulename']").append("<span class='help-inline'>未查找到模板</span>");
            }
            else
            {
                for(var i = 0; i < modulCount; i++)
                {
                    var item = "<span class='btn btn-minier";
                    if(i == 0)
                    {
                        item += " btn-yellow'";
                    }
                    else
                    {
                        item += "' style='margin-left:5px'";
                    }
                    item += " name='module'";
                    item += " moduleid='" + data.modules[i].layout_mod_tmpl_id + "'>" + data.modules[i].desc + "</span>";

                    $("div[name='modulename']").append(item);
                }
            }
        },
        bindParamBtn : function()
        {
            $('#tempPage a').click(evts.freshSearchTemp);
			
			$(".action-new").click(evts2.change_recommend);
			$(".action-view").click(evts2.view_recommend);
			$(".action-edit").click(evts2.edit_recommend);
			$(".action-delete").click(evts2.delete_recommend);
        },

        changeApp : function()
        {
            var versionid = $(this).attr("appid");

            $.ajax({
                url:'/recommendnew/get_page',// 跳转到 action
                data:
                {
                    app_ver_id:versionid
                },
                type:'post',
                success:function(data)
                {
                    var pageCount = data.pagenames.length;
                    $("div[name='page']").empty();
                    for(var i = 0; i < pageCount; i++)
                    {
                        var item = "<span class='btn btn-minier ";
                        if(i == 0)
                        {
                            item += "btn-yellow'";
                        }
                        else
                        {
                            item += "' style='margin-left:5px'";
                        }
                        item += " name='page'";
                        item += " pageid='" + data.pagenames[i].id + "'>" + data.pagenames[i].name + "</span>";

                        $("div[name='page']").append(item);
                    }

                    evts.freshTmpl(data);
                    evts.freshModul(data);
                    evts.trunModulePage(1);

                    $("span[name='page']").click(evts.changePage);
                    $("span[name='tmpl']").click(evts.changeTmpl);
                    $("span[name='module']").click(evts.changeModule);

                    $("span[name='app']").each(function()
                    {
                        if($(this).attr("appid") == versionid)
                        {
                            $(this).attr("class", "btn btn-minier btn-yellow");
                        }
                        else
                        {
                            $(this).attr("class", "btn btn-minier");
                        }
                    });

                    $("span[name='tmplState']").attr('class', 'btn btn-minier');
                    $("span[name='tmplState'][tmplState='2']").attr('class', 'btn btn-minier btn-yellow');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("出错了，请稍后重试！");
                }
            });
        },
        changePage : function()
        {
            var pgid = $(this).attr("pageid");

            $.ajax({
                url:'/recommendnew/get_tmpl',// 跳转到 action
                data:
                {
                    pgid : pgid,
                    status : 2
                },
                type:'post',
                success:function(data)
                {
                    evts.freshTmpl(data);
                    evts.freshModul(data);
                    evts.trunModulePage(1);

                    $("span[name='tmpl']").click(evts.changeTmpl);
                    $("span[name='module']").click(evts.changeModule);

                    $("span[name='page']").each(function()
                    {
                        if($(this).attr("pageid") == pgid)
                        {
                            $(this).attr("class", "btn btn-minier btn-yellow");
                        }
                        else
                        {
                            $(this).attr("class", "btn btn-minier");
                        }
                    });

                    $("span[name='tmplState']").attr('class', 'btn btn-minier');
                    $("span[name='tmplState'][tmplState='2']").attr('class', 'btn btn-minier btn-yellow');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    alert(errorThrown);
                    bootbox.alert("出错了，请稍后重试！");
                }
            });
        },
        changeState : function()
        {
            var pgid = "";
            $("span[name='page']").each(function()
            {
                if($(this).hasClass("btn-yellow"))
                {
                    pgid = $(this).attr("pageid");
                    return false;;
                }
            });

            var tmplState = $(this).attr("tmplState");

            $.ajax({
                url:'/recommendnew/get_tmpl',// 跳转到 action
                data:
                {
                    pgid : pgid,
                    status:tmplState
                },
                type:'post',
                success:function(data)
                {
                    evts.freshTmpl(data);
                    evts.freshModul(data);
                    evts.trunModulePage(1);

                    $("span[name='tmpl']").click(evts.changeTmpl);
                    $("span[name='module']").click(evts.changeModule);

                    $("span[name='tmplState']").each(function()
                    {
                        if($(this).attr("tmplState") == tmplState)
                        {
                            $(this).attr("class", "btn btn-minier btn-yellow");
                        }
                        else
                        {
                            $(this).attr("class", "btn btn-minier");
                        }
                    });
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("出错了，请稍后重试！");
                }
            });
        },
        changeTmpl:function()
        {
            var tmplid = $(this).attr("tmplid");

            $.ajax({
                url:'/recommendnew/get_modul',// 跳转到 action
                data:
                {
                    layout_tmpl_id : tmplid
                },
                type:'post',
                success:function(data)
                {
                    evts.freshModul(data);
                    evts.trunModulePage(1);

                    $("span[name='module']").click(evts.changeModule);

                    $("span[name='tmpl']").each(function()
                    {
                        if($(this).attr("tmplid") == tmplid)
                        {
                            $(this).attr("class", "btn btn-minier btn-yellow");
                        }
                        else
                        {
                            $(this).attr("class", "btn btn-minier");
                        }
                    });
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("出错了，请稍后重试！");
                }
            });
        },
        changeModule : function()
        {
            var modulid = $(this).attr('moduleid');

            $("span[name='module']").each(function()
            {
                if($(this).attr("moduleid") == modulid)
                {
                    $(this).attr("class", "btn btn-minier btn-yellow");
                }
                else
                {
                    $(this).attr("class", "btn btn-minier");
                }
            });

            evts.trunModulePage(1);
        },

        trunModulePage : function(e)
        {
            var page = "";

            if("number" == typeof(e))
            {
                if(0 == e)
                {
                    var node = $("#modulePage li.active").find("a");
                    if(0 != node.length)
                    {
                        page = node.attr("href").split("=")[1];
                    }
                    else
                    {
                        page = 1;
                    }
                }
                else
                {
                    page = e;
                }
            }
            else
            {
                e.preventDefault();//阻止a链接的跳转行为
                page = $(this).attr("href").split("=")[1];
            }

            var modulid = "";
            $("span[name='module']").each(function()
            {
                if($(this).hasClass("btn-yellow"))
                {
                    modulid = $(this).attr("moduleid");
                    return false;;
                }
            });

            $.ajax({
                url:'/recommendnew/get_modul_pos',// 跳转到 action
                data:
                {
                    layout_mod_tmpl_id : modulid,
                    page : page,
                    pagelength : constant.PAGE_LEN
                },
                type:'post',
                success:function(data)
                {
                    $("#recommend_module_table").html(data);
                    $('#modulePage a').click(evts.trunModulePage);
                    evts.bindParamBtn();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("出错了，请稍后重试！");
                }
            });
        }
    };
	
	//--------------------------------------------------------------------
	var evts2 =
    {
		'step_to' : function(step){
			evts2.modal_wizard_reset_error();
			$($("ul.wizard-steps li")[parseInt(step) - 1]).addClass("active");			
			$($("div.step-content div.step-pane")[parseInt(step) - 1]).addClass("active").siblings().removeClass("active");
		},
		'change_recommend' : function(e){
			var app = $($("#rem-home-select div.profile-info-row")[0]).find("div span.btn-yellow");
			var ver = app.html();
			var ver_id = app.attr("appid");
			
			
			var page = $($("#rem-home-select div.profile-info-row")[1]).find("div span.btn-yellow");
			var page_name = page.html();
			var page_id = page.attr("pageid");
			
			var tpl = $($("#rem-home-select div.profile-info-row")[3]).find("div span.btn-yellow");
			var tpl_name = tpl.html();
			var tpl_id = tpl.attr("tmplid");
			
			var mod = $($("#rem-home-select div.profile-info-row")[4]).find("div span.btn-yellow");
			var mod_name = mod.html();
			var mod_id = tpl.attr("moduleid");
			
			var pos = 1;
			var pos = $($(this).parent().parent().parent().find("td")[0]).html();
			
			$("#dialog-app").val(ver);
			$("#dialog-page-name").val(page_name);
			$("#dialog-tpl-name").val(tpl_name);
			$("#dialog-mod-name").val(mod_name);
			$("#dialog-pos-num").val(pos);
			$("#modal-step1 input[name=rule]").prop("checked", false).eq(0).prop("checked", true);
			$("#modal-step1 input[name=type]").prop("checked", false).eq(0).prop("checked", true);
			
			$($("ul.wizard-steps li")[0]).addClass("active").siblings().removeClass("active");			
			$($("div.step-content div.step-pane")[0]).addClass("active").siblings().removeClass("active");
			$("#modal-wizard div.modal-footer button.btn-next").html("下一步");
			
			
			evts2.modal_wizard_reset_error();
			evts2.reset_step3_fill_tip();
			$("#modal-wizard").modal("show").attr("sn", pos);
			
			var item_id = $(this).parent().parent().find("input").attr("item_id");
			if(0 != item_id.length){
				$("#modal-wizard").attr("item_id", item_id);
			}
		},
		'fill_msg_view' : function(ret, item_id, is_view){
			$("#model-msg-rem form input[name=dialog-msg-title]").val(ret['message']['title']);
			$($("#model-msg-rem div.rem-show-cover img")[0]).attr("src", ret['message']['cover']);
			$("#model-msg-rem form textarea[name=dialog-msg-brief]").val(ret['message']['brief']);
			
			$("#model-msg-rem form input[name=dialog-rem-title]").val(ret['data']['title']).prop("disabled", is_view);
			$($("#model-msg-rem div.rem-show-cover img")[1]).attr("src", ret['data']['cover']);
			$("#model-msg-rem form textarea[name=dialog-rem-brief]").val(ret['data']['brief']).prop("disabled", is_view);

			if(is_view){
				$("#model-msg-rem span.msg-btn-file").addClass("hide");
				$("#model-msg-rem div.modal-header h3 span").html("查看");
			}else{
				$("#model-msg-rem span.msg-btn-file").removeClass("hide");
				$("#model-msg-rem div.modal-header h3 span").html("编辑");
			}
			
			$("#model-msg-rem span.red").addClass("hide");
			
			evts2.modal_msg_rem_reset_error();
			
			$("#model-msg-rem").attr("itemid", item_id);
		},
		'fill_user_view' : function(ret, item_id, is_view){
			$("#model-user-rem form input[name=dialog-user-nick]").val(ret['user']['nick']);
			$($("#model-user-rem div.rem-show-cover img")[0]).attr("src", ret['user']['avatar']);
			$("#model-user-rem form textarea[name=dialog-user-desc]").val(ret['user']['signature']);
			
			$("#model-user-rem form input[name=dialog-rem-title-user]").val(ret['data']['title']).prop("disabled", is_view);;
			$($("#model-user-rem div.rem-show-cover img")[1]).attr("src", ret['data']['cover']);
			$("#model-user-rem form textarea[name=dialog-rem-brief-user]").val(ret['data']['brief']).prop("disabled", is_view);;	
			
			if(is_view){
				$("#model-user-rem span.msg-btn-file").addClass("hide");
				$("#model-user-rem div.modal-header h3 span").html("查看");
			}else{
				$("#model-user-rem span.msg-btn-file").removeClass("hide");
				$("#model-user-rem div.modal-header h3 span").html("编辑");
			}
			
			$("#model-user-rem span.red").addClass("hide");
			
			evts2.modal_user_rem_reset_error();
			
			$("#model-user-rem").attr("itemid", item_id);
		},
		'view_recommend' : function(e){
			var item_id = $(this).parent().next().attr("item_id");
			$.ajax({
				'type':'get',
				'url':"/recommendnew/get_item", 				
				'data': {'itemid' : item_id},  
				'success':function(ret){					
					if(0 == ret.e.code){
						if(evts2.is_msg_by_item_type(ret.data.type)){
							evts2.fill_msg_view(ret, item_id, true);
							
							$("#model-msg-rem").modal("show");	
						}else{
							evts2.fill_user_view(ret, item_id, true);
							
							$("#model-user-rem").modal("show");	
						}
					}else{
						bootbox.alert("获取消息失败");
					}
				},  
				'error':function(data){
					bootbox.alert("获取消息失败");
				}        
			});
			
		},
		'edit_recommend' : function(e){
			var item_id = $(this).parent().next().attr("item_id");
			$.ajax({
				'type':'get',
				'url':"/recommendnew/get_item", 				
				'data': {'itemid' : item_id},  
				'success':function(ret){					
					if(0 == ret.e.code){
						if(evts2.is_msg_by_item_type(ret.data.type)){
							evts2.fill_msg_view(ret, item_id, false);							
							$("#model-msg-rem").modal("show");	
						}else{
							evts2.fill_user_view(ret, item_id, false);
							
							$("#model-user-rem").modal("show");
						}
					}else{
						bootbox.alert("获取消息失败");
					}
				},  
				'error':function(data){
					bootbox.alert("获取消息失败");
				}        
			});
			
		},
		'delete_recommend' : function(e){
			var item_id = $(this).parent().next().attr("item_id");
			var sn = $($(this).parent().parent().parent()[0]).find(":first").html();
			$.ajax({
				'type':'get',
				'url':"/recommendnew/delete_item", 				
				'data': {'itemid' : item_id, 'sn' : sn},  
				'success':function(ret){					
					if(0 == ret.e.code){
						evts.trunModulePage(0);
					}else{
						bootbox.alert("获取消息失败");
					}
				},  
				'error':function(data){
					bootbox.alert("获取消息失败");
				}        
			});
		},
		'model_msg_rem_confirm' : function(e){
			var desc = $("#model-msg-rem div.modal-header h3 span").html();
			if("查看" == desc){
				$("#model-msg-rem").modal("hide");
			}else{	
				var isOk = true;
				var title_node = $("#model-msg-rem form input[name=dialog-rem-title]");
				var title = title_node.val();
				if(title.length > 60){
					title_node.next().removeClass("hide");
					isOk = false;
				}else{
					title_node.next().addClass("hide");
				}
				var cover = $($("#model-msg-rem div.rem-show-cover img")[1]).attr("src");
				var brief_node = $("#model-msg-rem form textarea[name=dialog-rem-brief]");
				var brief = brief_node.val();
				if(brief.length > 140){
					brief_node.next().removeClass("hide");
					isOk = false;
				}else{
					brief_node.next().addClass("hide");
				}
				
				if(!isOk){
					return;
				}
				
				var itemid = $("#model-msg-rem").attr("itemid");
				var params = {"itemid":itemid, "title":title, "cover":cover, "brief":brief};
				
				$.ajax({
					'type':'post',
					'url':"/recommendnew/update_item", 				
					'data': params,  
					'success':function(ret){					
						if(0 == ret.e.code){
							$("#model-msg-rem").modal("hide");
							evts.trunModulePage(0);							
						}else{							
							evts2.modal_msg_rem_set_error("更新消息失败");
						}
					},  
					'error':function(data){						
						evts2.modal_msg_rem_set_error("更新消息失败");
					}        
				});
			}
		},
		'model_user_rem_confirm' : function(e){
			var desc = $("#model-user-rem div.modal-header h3 span").html();
			if("查看" == desc){
				$("#model-user-rem").modal("hide");
			}else{
				var isOk = true;
				var title_node = $("#model-user-rem form input[name=dialog-rem-title-user]");
				var title = title_node.val();
				if(title.length > 60){
					title_node.next().removeClass("hide");
					isOk = false;
				}else{
					title_node.next().addClass("hide");
				}
				var cover = $($("#model-user-rem div.rem-show-cover img")[1]).attr("src");
				var brief_node = $("#model-user-rem form textarea[name=dialog-rem-brief-user]");
				var brief = brief_node.val();
				if(brief.length > 140){
					brief_node.next().removeClass("hide");
					isOk = false;
				}else{
					brief_node.next().addClass("hide");
				}
				var itemid = $("#model-user-rem").attr("itemid");
				var params = {"itemid":itemid, "title":title, "cover":cover, "brief":brief};
				
				if(!isOk){
					return;
				}
				
				$.ajax({
					'type':'post',
					'url':"/recommendnew/update_item", 				
					'data': params,  
					'success':function(ret){					
						if(0 == ret.e.code){
							$("#model-user-rem").modal("hide");
							evts.trunModulePage(0);							
						}else{							
							evts2.modal_user_rem_set_error("更新消息失败");
						}
					},  
					'error':function(data){						
						evts2.modal_user_rem_set_error("更新消息失败");
					}        
				});
			}
		},
		'modal_next' : function(e){
			var step = $("ul.wizard-steps li.active").length;
			var rule = $("input[name=rule]:checked").val();
			var info = $("input[name=type]:checked").val();
			var func;
			if(1 == step){				
				if((0 == rule) && (0 == info)){
					func = evts2.hand_msg_from_1;
				}else if((2 == rule) && (0 == info)){
					func = evts2.auto_msg_from_1;
				}else if((0 == rule) && (2 == info)){
					func = evts2.hand_user_from_1;
				}else{
					func = evts2.auto_user_from_1;
				}
				func();
			}else if(2 == step){
				if((0 == rule) && (0 == info)){
					func = evts2.hand_msg_from_2;
				}else if((2 == rule) && (0 == info)){
					func = evts2.auto_msg_from_2;
				}else if((0 == rule) && (2 == info)){
					func = evts2.hand_user_from_2;
				}else{
					func = evts2.auto_user_from_2;
				}
				func();
			}else{
				if((0 == rule) && (0 == info)){
					func = evts2.hand_msg_from_3;
				}else{
					func = evts2.hand_user_from_3;
				}
				func();
			}
			
		},
		
		'modal_prev' : function(e){
			var step = $("ul.wizard-steps li.active").length;
			if(1 == step){
				return;
			}else{
				$($("ul.wizard-steps li")[step-1]).removeClass("active");			
				$($("div.step-content div.step-pane")[step - 2]).addClass("active").siblings().removeClass("active");
				$("#modal-wizard div.modal-footer button.btn-next").html("下一步");
				evts2.modal_wizard_reset_error();
				if(3 == step){
					evts2.reset_step3_fill_tip();
				}
			}
		},
		"fill_step_2_hand_msg" : function(){
			$("#hand-info div.profile-info-value span[type=0]").addClass("btn-yellow")
							.siblings().removeClass("btn-yellow");
			
			$("#hand-info form select option[value=comment]").prop("selected", true)
							.siblings().prop("selected", false);
			
			$("#hand-info form :radio[name=msg_sequence_info]").prop("checked", false).first().prop("checked", true);
			
			$("#hand-info form div.pull-right :text").val("");
				
		},
		'hand_msg_from_1' : function(){
			var match = {"status" : 1};
			match['type'] = {"$in":[2,4,5]};
			var sort = {"comment" : -1};
			$.ajax({
				'type':'get',
				'url':"/recommendnew/search_msg", 				
				'data': {'match' : JSON.stringify(match), 'sort' : JSON.stringify(sort), 'page' : 1, 'count' : constant.MODAL_PAGE_LEN},  
				'success':function(ret){					
					evts2.step_to(2);
					evts2.fill_step_2_hand_msg();
					$("#hand-info").removeClass("hide").siblings().addClass("hide");
					$("#hand-info div.data-table").html(ret);
					$("#infoCotentPg ul li a").click(evts2.step2_hand_info_page);
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");
				}        
			});
		},		
		'hand_msg_from_2' : function(){
			var radio = $("#hand-info table input:checked");
			if(0 == radio.length){				
				evts2.modal_wizard_set_error("请选择消息");
				return;
			}
			var tr = radio.parent().parent();
			var msg_title = $(tr.find("td")[2]).html();
			var msg_brief = tr.attr("brief");
			var msg_cover = tr.find("img").attr("src");		
				
			$("#hand-info-3 form input[name=dialog-msg-title]").val(msg_title);
			$("#hand-info-3 textarea.dialog-msg-brief").val(msg_brief);
			$($("#hand-info-3 form")[0]).find("img").attr("src", msg_cover);
			
			$("#hand-info-3 form input[name=dialog-rem-title]").val("");
			$($("#hand-info-3 form")[1]).find("img").attr("src", "");
			$("#hand-info-3 textarea.dialog-rem-brief").val("");
			
			$("#hand-info-3").removeClass("hide").siblings().addClass("hide");			
			
			$("#modal-wizard div.modal-footer button.btn-next").html("保存");
			$("#hand-info-3 span.red").addClass("hide");
			evts2.set_step3_fill_tip(constant.MSG_FILL_TIP);
			evts2.step_to(3);
			
		},
		'hand_msg_from_3' : function(){
			var is_ok = true;
			var rem_title_node = $("#hand-info-3 form input[name=dialog-rem-title]");
			var rem_title = rem_title_node.val();
			if(rem_title.length > 60){
				rem_title_node.next().removeClass("hide");
				is_ok = false;
			}else{
				rem_title_node.next().addClass("hide");
			}	
			
			var img_node = $($("#hand-info-3 form")[1]).find("img");
			var img = img_node.attr("src");
			if(0 != img.length){				
				$("#hand-info-3 span.msg-btn-file").next().addClass("hide");
			}
			
			var brief_node = $("#hand-info-3 textarea.dialog-rem-brief");
			var brief = brief_node.val();
			if(brief.length > 140){
				brief_node.next().removeClass("hide");
				is_ok = false;
			}else{
				brief_node.next().addClass("hide");
			}
			
			if(!is_ok){
				return;
			}
			
			var radio = $("#hand-info table input:checked");
			var tr = radio.parent().parent();
			var type = evts2.msg_type_to_item_type(parseInt(tr.attr("type")));
			var msg_id = tr.attr("mid");
			
			var mod = $($("#rem-home-select div.profile-info-row")[4]).find("div span.btn-yellow");
			var mod_name = mod.html();
			var mod_id = mod.attr("moduleid");
			var sn = $("#modal-wizard").attr("sn");
			var params = {'layout_mod_tmpl_id' : mod_id, 'type':type, 'auto_type' :1 ,
						'sn': sn, 'muid' : msg_id};
						
			if(0 != rem_title.length){
				params['title'] = rem_title;
			}
			if(0 != img){
				params['cover'] = img;
			}
			if(0 != brief){
				params['brief'] = brief;
			}
			
			$.ajax({
					'type':'post',
					'url':"/recommendnew/create_item", 
					'data': params,  
					'success':function(ret){
						if(0 == ret.e.code){
							$("#modal-wizard").modal("hide");
							evts.trunModulePage(0);
						}else{							
							evts2.modal_wizard_set_error("操作失败");
						}
						
					},  
					'error':function(data){						
						evts2.modal_wizard_set_error("操作失败");
					}        
			});
		},
		"fill_step_2_auto_msg" : function(){
			$("#auto-info :text").val("");		
		},
		
		'auto_msg_from_1' : function(){
			$.ajax({
				'type':'get',
				'url':"/recommendnew/list_rule", 
				'data': {'type' : 1, "status" : constant.RULE_STATUS_START, 'page' : 1, 'count' : constant.MODAL_PAGE_LEN},  
				'success':function(ret){
					$("#auto-info").removeClass("hide").siblings().addClass("hide");
					$("#auto-info div.data-table").html(ret);
					$("#auto-info div.rulepage ul li a").click(evts2.step2_auto_info_page);
					$("#modal-wizard div.modal-footer button.btn-next").html("保存");
					evts2.fill_step_2_auto_msg();
					evts2.step_to(2);
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");
				}        
			});
		},
		'auto_msg_from_2' : function(){
			var input = $("#auto-info table :checked");
			if(0 == input.length){				
				evts2.modal_wizard_set_error("请选择规则");
				return;
			}
			var tr = $("#auto-info table :checked").parent().parent();
			var type = tr.attr("type");
			var rule_id = $(tr.find("td")[1]).html();
			var mod = $($("#rem-home-select div.profile-info-row")[4]).find("div span.btn-yellow");
			var mod_name = mod.html();
			var mod_id = mod.attr("moduleid");
			
			var sn = $("#modal-wizard").attr("sn");
			
			var params = {'rule_id' : rule_id, 'layout_mod_tmpl_id' : mod_id, 'type' : type, 'auto_type' : 2, 'sn': sn};
			
			$.ajax({
					'type':'post',
					'url':"/recommendnew/create_item_for_rule", 
					'data': params,  
					'success':function(ret){
						if(0 == ret.e.code){
							$("#modal-wizard").modal("hide");
							evts.trunModulePage(0);
						}else{							
							evts2.modal_wizard_set_error("操作失败");
						}
					},  
					'error':function(data){						
						evts2.modal_wizard_set_error("操作失败");
					}        
			});
		},
		"fill_step_2_auto_user" : function(){
			$("#auto-user :text").val("");		
		},
		'auto_user_from_1' : function(){
			$.ajax({
				'type':'get',
				'url':"/recommendnew/list_rule", 
				'data': {'type' : 2, "status" : constant.RULE_STATUS_START, 'page' : 1, 'count' : constant.MODAL_PAGE_LEN},  
				'success':function(ret){
					$("#auto-user").removeClass("hide").siblings().addClass("hide");
					$("#auto-user div.data-table").html(ret);
					$("#auto-user div.rulepage ul li a").click(evts2.step2_auto_user_page);
					$("#modal-wizard div.modal-footer button.btn-next").html("保存");
					evts2.fill_step_2_auto_user();
					evts2.step_to(2);
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");
				}        
			});	
		},
		'auto_user_from_2' : function(){
			var input = $("#auto-user table :checked");
			if(0 == input.length){				
				evts2.modal_wizard_set_error("请选择规则");
				return;
			}
			var tr = $("#auto-user table :checked").parent().parent();
			var type = tr.attr("type");
			var rule_id = $(tr.find("td")[1]).html();
			var mod = $($("#rem-home-select div.profile-info-row")[4]).find("div span.btn-yellow");
			var mod_name = mod.html();
			var mod_id = mod.attr("moduleid");
			
			var sn = $("#modal-wizard").attr("sn");
			
			var params = {'rule_id' : rule_id, 'layout_mod_tmpl_id' : mod_id, 'type' : type, 'auto_type' : 2, 'sn': sn};
			
			$.ajax({
					'type':'post',
					'url':"/recommendnew/create_item_for_rule", 
					'data': params,  
					'success':function(ret){
						if(0 == ret.e.code){
							$("#modal-wizard").modal("hide");
							evts.trunModulePage(0);
						}else{
							evts2.modal_wizard_set_error("操作失败");							
						}
						
					},  
					'error':function(data){
						evts2.modal_wizard_set_error("操作失败");						
					}        
			});
		},
		"fill_step_2_hand_user" : function(){
			$("#hand-user div.profile-info-value span[type=-1]").addClass("btn-yellow")
							.siblings().removeClass("btn-yellow");
			
			$("#hand-user form select option[value=follower_count]").prop("selected", true)
							.siblings().prop("selected", false);
			
			$("#hand-user form :radio[name=msg_sequence_info]").prop("checked", false).first().prop("checked", true);
			
			$("#hand-user form div.pull-right :text").val("");
				
		},
		'hand_user_from_1' : function(){
			var match = {"status" : 0};
			match['type'] = {"$in":[2,3,4]};
			var sort = {"follower_count" : -1};
			$.ajax({
				'type':'get',
				'url':"/recommendnew/search_user", 
				'data': {'match' : JSON.stringify(match), 'sort' : JSON.stringify(sort), 'page' : 1, 'count' : constant.MODAL_PAGE_LEN},  
				'success':function(ret){					
					evts2.step_to(2);
					evts2.fill_step_2_hand_user();
					$("#hand-user").removeClass("hide").siblings().addClass("hide");
					$("#hand-user div.data-table").html(ret);
					$("#userCotentPg ul li a").click(evts2.step2_hand_user_page);
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");	
				}        
			});
		},
		'hand_user_from_2' : function(){
			var radio = $("#hand-user table input:checked");
			if(0 == radio.length){				
				evts2.modal_wizard_set_error("请选择用户");	
				return;
			}
			var tr = radio.parent().parent();
			var nick = $(tr.find("td")[2]).html();
			var desc = tr.attr("signature");
			var cover = tr.find("img").attr("src");		

			$("#hand-user-3 input.dialog-user-nick").val(nick);
			$("#hand-user-3 textarea.dialog-user-desc").val(desc);
			$($("#hand-user-3 form")[0]).find("img").attr("src", cover);
			
			$("#hand-user-3 input.dialog-rem-title-user").val("");
			$($("#hand-user-3 form")[1]).find("img").attr("src", "");
			$("#hand-user-3 textarea.dialog-rem-brief-user").val("");
			
			$("#hand-user-3").removeClass("hide").siblings().addClass("hide");			
			
			$("#modal-wizard div.modal-footer button.btn-next").html("保存");
			evts2.set_step3_fill_tip(constant.USER_FILL_TIP);
			$("#hand-user-3 span.red").addClass("hide");
			
			evts2.step_to(3);	
			
		},
		'hand_user_from_3' : function(){
			var is_ok = true;
			var rem_title_node = $("#hand-user-3 input.dialog-rem-title-user");
			var rem_title = rem_title_node.val();
			if(rem_title.length > 60){
				rem_title_node.next().removeClass("hide");
				is_ok = false;
			}else{
				rem_title_node.next().addClass("hide");
			}	
			
			var img_node = $($("#hand-user-3 form")[1]).find("img");
			var img = img_node.attr("src");
			
			
			var brief_node = $("#hand-user-3 textarea.dialog-rem-brief-user");
			var brief = brief_node.val();
			if(brief.length > 140){
				brief_node.next().removeClass("hide");
				is_ok = false;
			}else{
				brief_node.next().addClass("hide");
			}
			
			if(!is_ok){
				return;
			}
			
			var radio = $("#hand-user table input:checked");
			var tr = radio.parent().parent();
			var type = evts2.user_type_to_item_type(parseInt(tr.attr("v_certification")));
			var uid = tr.attr("uid");
			
			var mod = $($("#rem-home-select div.profile-info-row")[4]).find("div span.btn-yellow");
			var mod_name = mod.html();
			var mod_id = mod.attr("moduleid");
			var sn = $("#modal-wizard").attr("sn");
			var params = {'layout_mod_tmpl_id' : mod_id, 'type':type, 'auto_type' :1 ,
						'sn': sn, 'muid' : uid};
						
			if(0 != rem_title.length){
				params['title'] = rem_title;
			}
			if((undefined != img) || (0 != img.length)){
				params['cover'] = img;
			}
			if(0 != brief.length){
				params['brief'] = brief;
			}
			
			$.ajax({
					'type':'post',
					'url':"/recommendnew/create_item", 
					'data': params,  
					'success':function(ret){
						if(0 == ret.e.code){
							$("#modal-wizard").modal("hide");
							evts.trunModulePage(0);
						}else{							
							evts2.modal_wizard_set_error("操作失败");	
						}
						
					},  
					'error':function(data){						
						evts2.modal_wizard_set_error("操作失败");	
					}        
			});	
			
		},
		
		'upload_hand_msg_rem_cover' : function(){
			var check_succ = function(){
				$("#hand-info-3 span.msg-btn-file").parent().next().addClass("hide");
			};
			var check_err = function(){
				$("#hand-info-3 span.msg-btn-file").parent().next().removeClass("hide");
			};
			var upload_succ = function(ret){
				var fid = ret.data.fid;
				var url = get_image_url(msg_config.STORAGE_SERVER, msg_constant.IMAGE_NAMESPACE, fid);
				$($("#hand-info-3 form")[1]).find("img").attr('src', url);
			}
			
			var upload_err = function(){				
				evts2.modal_wizard_set_error("上传图片失败");	
			}
			check_upload_image($(this), check_succ, check_err, upload_succ, upload_err);			
		},
		'upload_hand_user_rem_cover' : function(){			
			var check_succ = function(){
				$("#hand-user-3 span.msg-btn-file").parent().next().addClass("hide");
			};
			var check_err = function(){
				$("#hand-user-3 span.msg-btn-file").parent().next().removeClass("hide");
			};
			var upload_succ = function(ret){
				var fid = ret.data.fid;
				var url = get_image_url(msg_config.STORAGE_SERVER, msg_constant.IMAGE_NAMESPACE, fid);
				$($("#hand-user-3 form")[1]).find("img").attr('src', url);
			}
			
			var upload_err = function(){				
				evts2.modal_wizard_set_error("上传图片失败");	
			}
			check_upload_image($(this), check_succ, check_err, upload_succ, upload_err);
			
		},
		'edit_msg_rem_cover' : function(){			
			var check_succ = function(){
				$("#model-msg-rem span.msg-btn-file").parent().next().addClass("hide");	
			};
			var check_err = function(){
				$("#model-msg-rem span.msg-btn-file").parent().next().removeClass("hide");
			};
			var upload_succ = function(ret){
				var fid = ret.data.fid;
				var url = get_image_url(msg_config.STORAGE_SERVER, msg_constant.IMAGE_NAMESPACE, fid);
				$($("#model-msg-rem form")[1]).find("img").attr('src', url);
			};			
			var upload_err = function(){				
				evts2.modal_msg_rem_set_error("上传图片失败");
			};
			check_upload_image($(this), check_succ, check_err, upload_succ, upload_err);
		},
		'edit_user_rem_cover' : function(){
			var check_succ = function(){
				$("#model-user-rem span.msg-btn-file").parent().next().addClass("hide");
			};
			var check_err = function(){
				$("#model-user-rem span.msg-btn-file").parent().next().removeClass("hide");
			};
			var upload_succ = function(ret){
				var fid = ret.data.fid;
				var url = get_image_url(msg_config.STORAGE_SERVER, msg_constant.IMAGE_NAMESPACE, fid);
				$($("#model-user-rem form")[1]).find("img").attr('src', url);
			}
			
			var upload_err = function(){				
				evts2.modal_user_rem_set_error("上传图片失败");
			}
			check_upload_image($(this), check_succ, check_err, upload_succ, upload_err);
			
		},
		//------------------------------------------------------------------------------------------
		'step2_hand_info_select_type':function(){
			$(this).addClass("btn-yellow").siblings().removeClass("btn-yellow");
			evts2.step2_hand_info_filter_change();
		},
		'step2_hand_info_filter_change':function(){
			var expr = evts2.step2_hand_info_filter_expr();
			
			$.ajax({
				'type':'get',
				'url':"/recommendnew/search_msg", 
				'data': {'match' : JSON.stringify(expr.match), 'sort' : JSON.stringify(expr.sort), 
								'page' : 1, 'count' : constant.MODAL_PAGE_LEN},  
				'success':function(ret){					
					//evts2.step_to(2);
					//$("#hand-info").removeClass("hide").siblings().addClass("hide");
					$("#hand-info div.data-table").html(ret);
					$("#infoCotentPg ul li a").click(evts2.step2_hand_info_page);
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取信息失败");
				}        
			});
		},
		'step2_hand_info_filter_expr':function(){
			var match = {"status" : 1};
			var sort = {};			
			var type = parseInt($("#step2-hand-info-select div.profile-info-value span.btn-yellow").attr("type"));
			if(0 != type){
				match['type'] = type;
			}else{
				match['type'] = {"$in":[2,4,5]};
			}
			
			
			var title = $("#step2-hand-info-form :text").val();
			if(0 != title.length){
				match['title'] = title;
			}
			
			var sort_flag = $("#step2-hand-info-form option:selected").attr("value");			
			var sort_order = parseInt($("#step2-hand-info-form :radio:checked").attr("value"));
			sort[sort_flag] = sort_order;
			
			return {"match" : match, "sort" : sort};			
		},
		'step2_hand_info_search' : function(){
			evts2.step2_hand_info_filter_change();
		},
		'step2_hand_info_page' : function(e){
			e.preventDefault();
			var pg = $(this).attr("href").split("=")[1];
			
			var expr = evts2.step2_hand_info_filter_expr();
			
			$.ajax({
				'type':'get',
				'url':"/recommendnew/search_msg", 
				'data': {'match' : JSON.stringify(expr.match), 'sort' : JSON.stringify(expr.sort), 
								'page' : pg, 'count' : constant.MODAL_PAGE_LEN},  
				'success':function(ret){					
					//evts2.step_to(2);
					//$("#hand-info").removeClass("hide").siblings().addClass("hide");
					$("#hand-info div.data-table").html(ret);
					$("#infoCotentPg ul li a").click(evts2.step2_hand_info_page);
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");
				}        
			});
		},
        //--------------------------------------------------------------
		'step2_hand_user_select_type':function(){
			$(this).addClass("btn-yellow").siblings().removeClass("btn-yellow");
			evts2.step2_hand_user_filter_change();
		},
		'step2_hand_user_filter_change':function(){
			var expr = evts2.step2_hand_user_filter_expr();
			
			$.ajax({
				'type':'get',
				'url':"/recommendnew/search_user", 
				'data': {'match' : JSON.stringify(expr.match), 'sort' : JSON.stringify(expr.sort), 
								'page' : 1, 'count' : constant.MODAL_PAGE_LEN},  
				'success':function(ret){					
					//evts2.step_to(2);
					//$("#hand-user").removeClass("hide").siblings().addClass("hide");
					$("#hand-user div.data-table").html(ret);
					$("#userCotentPg ul li a").click(evts2.step2_hand_user_page);
					
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");
				}        
			});
		},
		'step2_hand_user_filter_expr':function(){
			var match = {"status" : 0};
			 match['type'] = {"$in":[2,3,4]};
			var sort = {};			
			var v_certification = parseInt($("#step2-hand-user-select div.profile-info-value span.btn-yellow").attr("type"));
			if(-1 != v_certification){
				match['v_certification'] = v_certification;
			}
			var title = $("#step2-hand-user-form :text").val();
			if(0 != title.length){
				match['nick'] = title;
			}
			
			var sort_flag = $("#step2-hand-user-form option:selected").attr("value");			
			var sort_order = parseInt($("#step2-hand-user-form :radio:checked").attr("value"));
			sort[sort_flag] = sort_order;
			
			return {"match" : match, "sort" : sort};			
		},
		'step2_hand_user_search' : function(e){
			//e.preventDefault();
			evts2.step2_hand_user_filter_change();
		},
		'step2_hand_user_page' : function(e){
			e.preventDefault();
			var pg = $(this).attr("href").split("=")[1];
			
			var expr = evts2.step2_hand_user_filter_expr();
			
			$.ajax({
				'type':'get',
				'url':"/recommendnew/search_user", 
				'data': {'match' : JSON.stringify(expr.match), 'sort' : JSON.stringify(expr.sort), 
								'page' : pg, 'count' : constant.MODAL_PAGE_LEN},  
				'success':function(ret){					
					//evts2.step_to(2);
					//$("#hand-user").removeClass("hide").siblings().addClass("hide");
					$("#hand-user div.data-table").html(ret);
					$("#userCotentPg ul li a").click(evts2.step2_hand_user_page);
					
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");
				}        
			});
		},
		//-----------------------------------------------------------------------
		'step2_auto_info_search' : function(e){
			var name = $("#auto-info form :text").val();
			var params = {"type" : 1, "status" : constant.RULE_STATUS_START, "page" : 1, "count" : constant.MODAL_PAGE_LEN};
			if(0 != name.length){
				params['name'] = name;
			}
			if("number" == typeof(e)){
				params['page'] = e;
			}
			$.ajax({
				'type':'get',
				'url':"/recommendnew/list_rule", 
				'data': params,  
				'success':function(ret){					
					//evts2.step_to(2);
					//$("#hand-user").removeClass("hide").siblings().addClass("hide");
					$("#auto-info div.data-table").html(ret);
					$("#auto-info div.rulepage ul li a").click(evts2.step2_auto_info_page);
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");
				}        
			});
		},		
		'step2_auto_info_page' : function(e){
			e.preventDefault();
			var pg = parseInt($(this).attr("href").split("=")[1]);
			evts2.step2_auto_info_search(pg);
		},
		//------------------------------------------------------------------------------------------
		'step2_auto_user_search' : function(e){
			var name = $("#auto-user form :text").val();
			var params = {"type" : 2, "status" : constant.RULE_STATUS_START, "page" : 1, "count" : constant.MODAL_PAGE_LEN};
			if(0 != name.length){
				params['name'] = name;
			}
			if("number" == typeof(e)){
				params['page'] = e;
			}
			$.ajax({
				'type':'get',
				'url':"/recommendnew/list_rule", 
				'data': params,  
				'success':function(ret){					
					//evts2.step_to(2);
					//$("#hand-user").removeClass("hide").siblings().addClass("hide");
					$("#auto-user div.data-table").html(ret);
					$("#auto-user div.rulepage ul li a").click(evts2.step2_auto_user_page);
				},  
				'error':function(data){					
					evts2.modal_wizard_set_error("获取消息失败");
				}        
			});
		},		
		'step2_auto_user_page' : function(e){
			e.preventDefault();
			var pg = parseInt($(this).attr("href").split("=")[1]);
			evts2.step2_auto_user_search(pg);
		},
		'msg_type_to_item_type' : function(type){
			var ret = 0;
			switch(type){
				case 2:
					ret = 1;
					break;
				case 4:
					ret = 2;
					break;
				case 5:
					ret = 3;
				default:
					break;
			}
			return ret;
		},
		'user_type_to_item_type' : function(type){
			var ret = 5;
			switch(type){
				case 0:
					ret = 5;
					break;
				case 1:
					ret = 4;
					break;
				default:
					break;
			}
			return ret;
		},
		'is_msg_by_item_type' : function(type){
			if((1 == type) || (2 == type) || (3 == type)){
				return true;
			}else{
				return false;
			}
		},
		'modal_wizard_set_error' : function(txt){
			$("#modal-wizard div.modal-footer span").html(txt);
		},
		'modal_wizard_reset_error' : function(){
			$("#modal-wizard div.modal-footer span").html("");
		},
		'modal_msg_rem_set_error' : function(txt){
			$("#model-msg-rem div.modal-footer span").html(txt);
		},
		'modal_msg_rem_reset_error' : function(){
			$("#model-msg-rem div.modal-footer span").html("");
		},
		'modal_user_rem_set_error' : function(txt){
			$("#model-user-rem div.modal-footer span").html(txt);
		},
		'modal_user_rem_reset_error' : function(){
			$("#model-user-rem div.modal-footer span").html("");
		},
		'set_step3_fill_tip' : function(tip){
			$("#modal-wizard div.modal-footer i.blue").html(tip);
		},
		'reset_step3_fill_tip' : function(){
			$("#modal-wizard div.modal-footer i.blue").html("");
		},
		
    };
	//-------------------------------------------------------------------

    var bindEvents = function()
    {
        $("span[name='app']").click(evts.changeApp);
        $("span[name='page']").click(evts.changePage);
        $("span[name='tmpl']").click(evts.changeTmpl);
        $("span[name='module']").click(evts.changeModule);
        $("span[name='tmplState']").click(evts.changeState);
		
		
		//------------------------------------------------------------------
		//$(".action-new").click(evts2.change_recommend);
		//$(".action-view").click(evts2.view_recommend);
		//$(".action-edit").click(evts2.edit_recommend);
		//$(".action-delete").click(evts2.delete_recommend);
		
		
		$("#modal-wizard button.btn-next").click(evts2.modal_next);
		$("#modal-wizard button.btn-prev").click(evts2.modal_prev);
		
		$("#hand-info-3 :file").change(evts2.upload_hand_msg_rem_cover);
		$("#hand-user-3 :file").change(evts2.upload_hand_user_rem_cover);
		
		$("#step2-hand-info-select div.profile-info-value span").click(evts2.step2_hand_info_select_type);
		$("#step2-hand-info-form select").change(evts2.step2_hand_info_filter_change);
		$("#step2-hand-info-form :radio").click(evts2.step2_hand_info_filter_change);
		$("#step2-hand-info-search").click(evts2.step2_hand_info_search);
		//$("#infoCotentPg ul li a").click(evts2.step2_hand_info_page);
		
		$("#step2-hand-user-select div.profile-info-value span").click(evts2.step2_hand_user_select_type);
		$("#step2-hand-user-form select").change(evts2.step2_hand_user_filter_change);
		$("#step2-hand-user-form :radio").click(evts2.step2_hand_user_filter_change);
		$("#step2-hand-user-search").click(evts2.step2_hand_user_search);
		//$("#userCotentPg ul li a").click(evts2.step2_hand_user_page);
		
		//$("#auto-info form select").change(evts2.step2_auto_info_search);
		$("#auto-info form button").click(evts2.step2_auto_info_search);
		$("#auto-info div.rulepage ul li a").click(evts2.step2_auto_info_page);
		
		
		//$("#auto-user form select").change(evts2.step2_auto_user_search);
		$("#auto-user form button").click(evts2.step2_auto_user_search);
		$("#auto-user div.rulepage ul li a").click(evts2.step2_auto_user_page);
		
		$("#model-msg-rem div.modal-footer button").click(evts2.model_msg_rem_confirm);
		$("#model-msg-rem span.msg-btn-file input").change(evts2.edit_msg_rem_cover);
		
		$("#model-user-rem div.modal-footer button").click(evts2.model_user_rem_confirm);
		$("#model-user-rem span.msg-btn-file input").change(evts2.edit_user_rem_cover);
		
    };

    var init = function()
    {
        bindEvents();

        evts.trunModulePage(1);
    };

    init();
});
