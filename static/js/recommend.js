$(function(){
    var urls = {
        'index': '/recommend/index',
        'manageRule': '/recommend/manage',
        'appverChange': '/recommend/changeselect_appver',
        'pageidChange': '/recommend/changeselect_pageid',
        'pagetmplChange': '/recommend/changeselect_pagetmpl',
        'createGroup': '/recommend/creategroup_edit',
        'editGroup': '/recommend/creategroup_has_edit',
        'createRule': '/recommend/createrule',
        'updateRulesAjax': '/recommend/update_rules_list_ajax_modal',
        'rulegroupSubmit': '/recommend/creategroup_submit',
        'searchRule': '/recommend/searchRule',
        'updateRuleStatus': '/recommend/updateRuleStatus',
        'updateRuleOtherInfo': '/recommend/updateRuleOtherInfo',
        'deleteRule': '/recommend/deleteRule',
        'updateRuleGroup': '/recommend/updateRuleGroup',
        'updateContentOtherInfo': '/recommend/updateContentOtherInfo',
        'saveRuleGroupEdit': '/recommend/saveRuleGroupEdit',
        'changeContentStatus': '/recommend/changeContentStatus',
        'deleteRuleGroup': '/recommend/deleteRuleGroup',
        'deleteContent': '/recommend/deleteContent',
        'manualAdd': '/recommend/manual_add',
        'createItem': '/recommend/createItem',
        'updateRulegroup_pg': '/recommend/update_rulegroup_list_ajax',
        'updateRuleAjaxTbody': '/recommend/update_rules_list_ajax_tbody',
        'updateContentAjax': '/recommend/update_content_list_ajax',
        'updategroupContentAjax': '/recommend/update_groupContent_list_ajax',
        'updateAllAjax': '/recommend/update_all_ajax',
        'updateItem': '/recommend/update_item',
        'SearchContentInfo': '/recommend/SearchContentInfo',
        'SearchContentUser': '/recommend/SearchContentUser'
    };

    var evts = {
        initSelect: function(obj){
            return $(obj).html('');
        },
        change_select_appver:function(evt){
            evts.appver_change(this);
        },
        change_select_pgid:function(evt){
            evts.pgid_change(this);
        },
        change_select_pgtmpl:function(evt){
            evts.pgtmpl_change(this);
        },
        change_select_rules_type:function(evt){
            evts.rules_type_change(this);
        },
        change_select_rule_status:function(evt){
            evts.rule_status_change(this);
        },
        change_a_rule_status:function(evt){
            evts.rule_status_change_a(this);
        },
        change_a_content_status:function(evt){
            evts.content_status_change_a(this);
        },
        change_a_rulegroup_status:function(evt){
            evts.rulegroup_status_change_a(this);
        },
        change_select_rulegroup_status:function(evt){
            evts.rulegroup_status_change(this);
        },
        change_select_rulegroup:function(evt){
            evts.rulegroup_change(this);
        },
        change_select_content_status:function(evt){
            evts.content_status_change(this);
        },
        change_span_rules:function(evt){
            evts.rules_change(this);
        },
        change_span_tab:function(evt){
            evts.span_tab_toggle(this);
        },
        create_rules_group:function(evt){
            evts.group_create(this);
        },
        add_rule_grasp:function(evt){
            evts.rule_grasp(this);
        },
        publish_radio_check:function(evt){
            evts.publish_check(this);
        },
        rulestype_radio_check:function(evt){
            evts.rulestype_check(this);
        },
        grasprule_modal_btn:function(evt){
            evts.btn_grasprule_modal(this);
        },
        infocontent_filter_btn:function(evt){
            evts.btn_infocontent_filter(this);
        },
        usercontent_filter_btn:function(evt){
            evts.btn_usercontent_filter(this);
        },
        usernick_search_btn:function(evt){
            evts.btn_usernick_search(this);
        },
        avail_sites_select:function(evt){
            evts.sites_select(this);
        },
        rulegroup_submit_btn:function(evt){
            evts.btn_rulegroup_submit(this);
        },
        rule_search_btn:function(evt){
            evts.btn_rule_search(this);
        },
        edit_group_btn:function(evt){
            evts.btn_edit_group(this);
        },
        rule_delete_a:function(evt){
            evts.rule_delete(this);
        },
        rulegroup_delete_a:function(evt){
            evts.rulegroup_delete(this);
        },
        content_delete_a:function(evt){
            evts.content_delete(this);
        },
        content_edit_a:function(evt){
            evts.content_edit(this);
        },
        infoRule_edit_a:function(evt){
            evts.infoRule_edit(this);
        },
        userRule_edit_a:function(evt){
            evts.userRule_edit(this);
        },
        rulegroup_edit_a:function(evt){
            evts.rulegroup_edit(this);
        },
        maunal_add_a:function(evt){
            evts.maunal_add(this);
        },
        add_item_btn:function(evt){
            evts.btn_item_add(this);
        },
        change_module_btn:function(evt){
            evts.btn_change_module(this);
        },
        content_save_btn:function(evt){
            evts.btn_content_save(this);
        },
        infotitle_search_btn:function(evt){
            evts.btn_infotitle_search(this);
        },
        userrule_save_btn:function(evt){
            evts.btn_userrule_save(this);
        },
        inforule_save_btn:function(evt){
            evts.btn_inforule_save(this);
        },
        pagination_rulegroup:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.rulegroup_pagination(this);
        },
        pagination_contentlist:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.contentlist_pagination(this);
        },
        pagination_modalinfo:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.modalinfo_pagination(this);
        },
        pagination_modaluser:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.modaluser_pagination(this);
        },
        pagination_tbodyInfo:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.tbodyInfo_pagination(this);
        },
        pagination_tbodyUser:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.tbodyUser_pagination(this);
        },
        pagination_infoCotent:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.infoCotent_pagination(this);
        },
        pagination_infoCotent_filter:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.infoCotent_filter_pagination(this);
        },
        pagination_infoCotent_search:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.infoCotent_search_pagination(this);
        },
        pagination_userCotent_filter:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.userCotent_filter_pagination(this);
        },
        pagination_userCotent_search:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.userCotent_search_pagination(this);
        },
        pagination_userCotent:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.userCotent_pagination(this);
        },
        previewImage_upload:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.preImg(this, 'imgPre');
        },
        upload_image:function(evt){
            evt.preventDefault();//阻止a链接的跳转行为
            evts.upload_image_rcm(this);
        },
        select_rule:function(evt){
            evts.clear_err_info();
        },
        appver_change:function(obj){
            var selected_opt  = $(obj).children('option:selected').val(),
                status = $("#search input[type=radio][name=publish]:checked").val();

            $.ajax({
                url:urls.appverChange,
                dataType:"json",
                data:{app_ver_id:selected_opt,status:status},
                success:function(json){
                    evts.initSelect('#search-category-2');
                    evts.initSelect('#search-category-3');
                    evts.initSelect('#search-category-4');
                    //var data = eval( "(" + json + ")" );
                    var data = json;
                    evts.update_select_option(data.pageinfo, $('#search-category-2'),{value:"pgid"});
                    evts.update_select_option(data.tmplinfo, $('#search-category-3'),{value:"tmplid"});
                    evts.update_select_option(data.modinfo, $('#search-category-4'),{id:"id",value:"modtmplid"});
                }
            });
        },
        pgid_change:function(obj){
            var selected_opt  = $(obj).children('option:selected').val(),
                status = $("#search input[type=radio][name=publish]:checked").val();

            $.ajax({
                url:urls.pageidChange,
                dataType:"json",
                data:{pgid:selected_opt,status:status},
                success:function(json){
                    evts.initSelect('#search-category-3');
                    evts.initSelect('#search-category-4');
                    //var data = eval( "(" + json + ")" );
                    var data = json;
                    evts.update_select_option(data.tmplinfo, $('#search-category-3'),{value:"tmplid"});
                    evts.update_select_option(data.modinfo, $('#search-category-4'),{id:"id",value:"modtmplid"});
                }
            });
        },
        pgtmpl_change:function(obj){
            var selected_opt  = $(obj).children('option:selected').val();

            $.ajax({
                url:urls.pagetmplChange,
                dataType:"json",
                data:{layout_tmpl_id:selected_opt},
                success:function(json){
                    evts.initSelect('#search-category-4');
                    var data = json;
                    evts.update_select_option(data.modinfo, $('#search-category-4'),{id:"id",value:"modtmplid"});
                }
            });
        },
        rules_change:function(obj){
            if($(obj).hasClass("label label-info")){
                if($(obj).hasClass("area")){
                    $(obj).removeClass("label label-info");
                }
                return false;
            }

            var txt = $(obj).text();
            $(obj).parent().find(".label.label-info").not(".area").removeClass("label label-info");
            $(obj).addClass("label label-info");
            $(obj).parent().find("input").val(txt);

            if($(obj).hasClass("info_type")){
                $(obj).parent().parent().find("input[name=rule_type]").val( $(obj).attr('name'));
            }

            if($(obj).hasClass("msg_type")){
                var type = +$(obj).attr('name');
                $(obj).parent().find("input[name=content_type]").val(type);//用于筛选和搜索，图文：2，视频：4
                $(obj).parent().find("input[name=msg_type]").val(type);//用于分页,区别与用户的type:3.不可轻易改动
                if(type === 2){
                    $(obj).parent().find("input[name=item_type]").val(type - 1);//item用于添加item到规则分组中
                }else if(type === 4){
                    $(obj).parent().find("input[name=item_type]").val(type - 2);//item用于添加item到规则分组中
                }


            }
        },
        span_tab_toggle:function(obj){
            var tab_id = $(obj).attr("name");
            $("#graspTabContent >div").hide();
            console.log(tab_id);
            $(tab_id).show();
        },
        group_create:function(obj){
            var app_ver = {
                id: $('#search-category-1').children('option:selected').val(),
                verno: $('#search-category-1').children('option:selected').text()
            };

            var page = {
                id: $('#search-category-2').children('option:selected').val(),
                alias: $('#search-category-2').children('option:selected').text()
            };

            var tpl = {
                id: $('#search-category-3').children('option:selected').val(),
                alias: $('#search-category-3').children('option:selected').text()
            };

            var module = {
                id:$('#search-category-4').children('option:selected').attr("id"),
                modtmplid: $('#search-category-4').children('option:selected').val(),
                title: $('#search-category-4').children('option:selected').text()
            };

            var data = {
                app_ver: JSON.stringify(app_ver),
                pg: JSON.stringify(page),
                tpl: JSON.stringify(tpl),
                module: JSON.stringify(module)
            };

            evts.StandardPost(urls.createGroup, data);

            //console.log(obj);
        },
        StandardPost:function(url,args){
            var form = $("<form method='post'></form>");
            form.attr({"action":url});
            for (arg in args)
            {
                var input = $("<input type='hidden'>");
                input.attr({"name":arg});
                input.val(args[arg]);
                form.append(input);
            }

            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                form.append($("<input type='submit' name='submit' style='display:none'>"));
                form.on('submit', function(e) {
                    e.preventDefault();
                    $(this).clone().appendTo("body").find("input[name=submit]").click(); // FF only
                });
                form.submit();
            }else {
                form.submit();// works under IE and Chrome, but not FF
            }
        },
        rule_grasp:function(obj){
            var $div =  $(obj).parent().parent();
            var type = $div.find("input[name=rule_type]").val();
            var period = $div.find("select[name=period]").children('option:selected').val();
            var name = $div.find("input[name=rule-name]").val();
            var $div_table = $div.find("div[name=table]");
            var $div_rules = $div.find(".rule");
            var sort_name = $div.find("select[name=sort_name]").children('option:selected').val();
            var sort_order = +$div.find("input[type=radio]:checked").val();
            var project,
                match = {},
                sort = {};
            var rules_value = [];
            $.each($div_rules, function(i, obj){
                var rule_name = $(obj).attr("name");
                $(obj).find(".label.label-info").each(function(){
                    rules_value.push(+$(this).attr('name'));
                });
                if(rules_value.length === 1){
                    if(type === '1' || type === '2'){
                        match[rule_name] = 1 + rules_value.pop();
                    }else if(type === '3'){
                        match['id'] = {"$gte":1};
                    }
                }else if(rules_value.length > 1){
                    match[rule_name] = {"$in":rules_value}
                }else{
                    match= {}
                }
            });

            if(type === '1' || type === '2'){
                project = {msgid:1,status:1,publish_time:1,brief:1,cover:1,title:1,create_time:1};
            }else if(type === '3'){
                project = {uid:1,status:1,create_time:1,avatar:1,nick:1,signature:1};
            }else{
                project = {};
            }
            sort[sort_name] = sort_order;
            var expr = "project=" + JSON.stringify(project) + "&match=" + JSON.stringify(match) + "&sort="
                + JSON.stringify(sort);

            var data = {
                name: name,
                type: type,
                expr: expr,
                period: period
            };

            console.dirxml(data);
            $.ajax({
                url:urls.createRule,
                dataType:"json",
                data:data,
                success:function(json){
                       // $div_table.html(json);
                    if(json['e']['code'] !== 0){
                        console.dirxml(json['e']);
                        alert(json['e']['desc']);
                    }else{
                        if(type === '1' || type === '2'){
                            window.location.href = urls.manageRule + "?type=0";
                        }else if(type === '3'){
                            window.location.href = urls.manageRule + "?type=3";
                        }
                    }
                     //console.log(json);
                }
            });
        },
        update_select_option:function(data, select, option_attrs){
            var attrs = {};
            if(data.length !== 0){
                $.each(data, function(i, obj) {
                    var name = obj.name;
                    $.each(option_attrs, function(opt_attr, obj_key) {
                        //$.extend(attrs,{opt_attr:obj[obj_key]});
                        attrs[opt_attr] = obj[obj_key];
                    });

                    if(i === 0){
                        $("<option selected>" + name + "</option>").attr(attrs).appendTo(select);
                    }else{
                        $("<option>" + name + "</option>").attr(attrs).appendTo(select);
                    }
                });
            }
        },
        publish_check:function(obj){
            var status = $(obj).val();
            var selected_opt_appver = $('#search-category-1').children('option:selected').val(),
                selected_opt_pg = $('#search-category-2').children('option:selected').val();

            $.ajax({
                url:urls.pageidChange,
                dataType:"json",
                data:{app_ver_id:selected_opt_appver,pgid:selected_opt_pg,status:status},
                success:function(json){
                    console.dirxml(json);
                    //evts.initSelect('#search-category-2');
                    evts.initSelect('#search-category-3');
                    evts.initSelect('#search-category-4');
                    //var data = eval( "(" + json + ")" );
                    var data = json;
                    //evts.update_select_option(data.pageinfo, $('#search-category-2'),{value:"pgid"});
                    evts.update_select_option(data.tmplinfo, $('#search-category-3'),{value:"tmplid"});
                    evts.update_select_option(data.modinfo, $('#search-category-4'),{id:"id",value:"modtmplid"});
                }
            });
        },
        rules_type_change_bak:function(obj){
            var rules_type = $(obj).children('option:selected').val(),
                $div_table = $(obj).parent().parent().parent().find("div.modal-body");
                $div_header = $(obj).parent().parent().parent().find("div.modal-header");

            $.ajax({
                url:urls.updateRulesAjax,
                dataType:"json",
                data:{type:rules_type},
                success:function(json){
                    console.dirxml(json);
                    $div_table.html(json);
                    var rule_num = $div_table.find("input[name=rule_num]").val();
                    $div_header.find("span.rule_num").text(rule_num);
                }
            });
        },
        rules_type_change:function(obj){
            var rules_type = $(obj).children('option:selected').val(),
                rule_num;
            if(rules_type === '0'){
                $("#user_modal").hide();
                $("#info_modal").show();
                rule_num = $("#info_modal").find("input[name=rule_num]").val();
            }else if(rules_type === '3'){
                $("#info_modal").hide();
                $("#user_modal").show();
                rule_num = $("#user_modal").find("input[name=rule_num]").val();
            }
            console.log(rule_num);
            $("span.rule_num").text(rule_num);
        },
        btn_grasprule_modal:function(obj){
            if($("#rulesModal table input[type=radio][name=is_used]:checked").length < 1)
            {
                $("#errInfo").show();
                return false;
            }

            var $tr = $("#rulesModal table input[type=radio][name=is_used]:checked").parent().parent(),
                rule_id = $tr.find('td').eq(1).text(),
                rule_name = $tr.find('td').eq(2).text();

            $("#grouprules input[id=rule_name]").val(rule_name);
            $("#grouprules input[name=rule_id]").val(rule_id);
            $('#rulesModal').modal('hide');
        },
        sites_select:function(obj){
            var $parent_div = $(obj).parent().parent();
            //var $input_items_pos = $parent_div.find("input[name=items_pos]");
            var $input_items_pos = $("#items_pos");
            var sites = [];
            $parent_div.find('input:checkbox:checked').each(function(){
                sites.push($(this).val());
            });
            $input_items_pos.val(sites.join(","));
        },
        btn_rulegroup_submit:function(obj){
            var count = $("input[type='checkbox']:checked").length;
            if(count == 0)
            {
                bootbox.alert("请选择一个推荐位！");
                return false;
            }
            var data = {
                'name': '',
                'type': '',
                'module_tmpl_id': '',
                'rule_id': '',
                'items_pos': '',
                'apply_more': ''
            };

            $.each(data,function(key,value){
                    var $radio = $('#grouprules').find("input[type=radio][name=" + key + "]:checked");
                    if($radio.length !== 0){
                        data[key] = $radio.val();
                    }else{
                        var $input = $('#grouprules').find("input[name=" + key + "]");
                        data[key] = $input.val();
                    }
            });

            console.log(data);
            $.ajax({
                url:urls.rulegroupSubmit,
                dataType:"json",
                data:data,
                success:function(json){
                    console.log(json);
                    if(json['e']['code'] !== 0){
                          console.dirxml(json['e']);
                          alert(json['e']['desc']);
                    }else{
                        //window.location.href = urls.index + "?module_tmpl_id=" + data['module_tmpl_id'];
                        window.location.href = urls.index;
                    }
                   // window.location.href = urls.index;
                }
            });
        },
        btn_rule_search:function(obj){
            var name = $('#filter_grasprules').val(),
                rules_type = $("#rules_type").children('option:selected').val();

            $.ajax({
                url:urls.searchRule,
                dataType:"json",
                data:{name:name,type:rules_type},
                success:function(json){
                    if(rules_type === '0'){
                        $('#info_modal').html(json);
                        var rule_num = $("#info_modal input[name=rule_num]").val();
                        $("span.rule_num").text(rule_num);
                        $("#modalInfoPg a").click(evts.pagination_modalinfo);
                    }else if(rules_type === '3'){
                        $('#user_modal').html(json);
                        var rule_num = $("#user_modal input[name=rule_num]").val();
                        $("span.rule_num").text(rule_num);
                        $("#modalUserPg a").click(evts.pagination_modaluser);
                    }
                }
            });

        },
        rule_status_change:function(obj){
            var rule_status = $(obj).children('option:selected').val(),
                $tr = $(obj).parent().parent(),
                rule_id = $tr.find('td').eq(0).text();

            $.ajax({
                url:urls.updateRuleStatus,
                dataType:"json",
                data:{rule_id:rule_id,status:rule_status},
                success:function(json){
                    console.dirxml(json);
                }
            });
        },
        rule_status_change_a:function(obj){
            var rule_status = $(obj).attr("data-tostatus"),
                $td = $(obj).parent().parent(),
                $status_tr = $td.prev(),
                rule_id = $td.parent().find('td').eq(0).text();

            $.ajax({
                url:urls.updateRuleStatus,
                dataType:"json",
                data:{rule_id:rule_id,status:rule_status},
                success:function(json){
                    if(0 != json.e.code){
                        bootbox.alert("修改内容失败");
                    }else{
                        if(json.data.status === 2){
                            $status_tr.text("未发布");
                            $(obj).attr({"title":"开启","data-tostatus":"1","class":"red action-start"});
                            $(obj).children("i").attr("class","icon-key bigger-130");
                        }else if(json.data.status === 1){
                            $status_tr.text("已发布");
                            $(obj).attr({"title":"关闭","data-tostatus":"2","class":"red action-stop"});
                            $(obj).children("i").attr("class","icon-lock bigger-130");
                        }
                    }
                }
            });
        },
        content_status_change_a:function(obj){
            var status = $(obj).attr("data-tostatus"),
                $td = $(obj).parent().parent(),
                $status_td = $td.prev(),
                itemid = $td.parent().find('td').eq(0).text();

            $.ajax({
                url:urls.changeContentStatus,
                dataType:"json",
                data:{itemid : itemid,status:status},
                success:function(json){
                    if(0 !== json.e.code){
                        bootbox.alert("修改内容失败");
                    }else{
                        if(status === '1'){
                            $status_td.text("未发布");
                            $(obj).attr({"title":"开启","data-tostatus":"2","class":"red action-start"});
                            $(obj).children("i").attr("class","icon-key bigger-130");
                        }else if(status === '2'){
                            $status_td.text("已发布");
                            $(obj).attr({"title":"关闭","data-tostatus":"1","class":"red action-stop"});
                            $(obj).children("i").attr("class","icon-lock bigger-130");
                        }
                    }
                }
            });
        },
        rulegroup_status_change_a:function(obj){
            var status = $(obj).attr("data-tostatus"),
                $td = $(obj).parent().parent(),
                $status_td = $td.prev(),
                rulegroup_id = $td.parent().find('td').eq(0).text(),
                module_tmpl_id = $('#search-category-4').children('option:selected').attr("id");

            var data = {
                'group_id': rulegroup_id,
                'module_tmpl_id': module_tmpl_id,
                'status': status
            };

            $.ajax({
                url:urls.updateRuleGroup,
                dataType:"json",
                data:data,
                success:function(json){
                    console.dirxml(json);
                    if(json['e']['code'] !== 0){
                        alert(json['e']['desc']);
                        console.dirxml(json['e']);
                    }else{
                        //window.location.href = urls.index + "?module_tmpl_id=" + module_tmpl_id;
                        $.ajax({
                            url:urls.updateAllAjax,
                            dataType:"json",
                            data:{module_tmpl_id:module_tmpl_id},
                            success:function(json){
                                $("#contentlist-ruleset").html(json);

                                $("#contentlistPg a").click(evts.pagination_contentlist);
                                $('a[name=content_delete_a]').on('click', evts.content_delete_a);

                                $("#rulegroupPg a").click(evts.pagination_rulegroup);
                                //$('select[name=rulegroup_status]').on('change', evts.change_select_rulegroup_status);
                                //$('select[name=content_status]').on('change', evts.change_select_content_status);
                                $('a[name=rulegroup_status]').on('click', evts.change_a_rulegroup_status);
                                $('a[name=content_status]').on('click', evts.change_a_content_status);
                                $('a[name=rulegroup_delete]').on('click', evts.rulegroup_delete_a);
                                $('a[name=maunal_add_a]').on('click', evts.maunal_add_a);
                                $('a[name=create_rulegroup_a]').on('click', evts.create_rules_group);
                                $('a[name=edit_content_a]').on('click', evts.content_edit_a);
                                $('a[name=edit_rulegroup_a]').on('click', evts.rulegroup_edit_a);
                                console.dirxml(json);
                            }
                        });

                    }
                }
            });
        },
        rule_delete:function(obj){
            var $tr = $(obj).parent().parent().parent(),
                rule_type = $tr.parent().parent().parent().parent().find("input[name=rule_type]").val(),
                rule_id = $tr.find('td').eq(0).text();
            console.log(rule_type);

            $.ajax({
                url:urls.deleteRule,
                dataType:"json",
                data:{rule_id:rule_id},
                success:function(json){
                    if(rule_type === '1' || rule_type === '2'){
                        window.location.href = urls.manageRule + "?type=0";
                    }else if(rule_type === '3'){
                        window.location.href = urls.manageRule + "?type=3";
                    }
                }
            });
        },
        rulegroup_status_change:function(obj){
            var rulegroup_status = $(obj).children('option:selected').val(),
                $tr = $(obj).parent().parent(),
                rulegroup_id = $tr.find('td').eq(0).text(),
                module_tmpl_id = $('#search-category-4').children('option:selected').attr("id");

            var data = {
                'group_id': rulegroup_id,
                'module_tmpl_id': module_tmpl_id,
                'status': rulegroup_status
            };

            $.ajax({
                url:urls.updateRuleGroup,
                dataType:"json",
                data:data,
                success:function(json){
                    console.dirxml(json);
                    if(json['e']['code'] !== 0){
                        alert(json['e']['desc']);
                        console.dirxml(json['e']);
                    }else{
                        //window.location.href = urls.index + "?module_tmpl_id=" + module_tmpl_id;
                        $.ajax({
                            url:urls.updateAllAjax,
                            dataType:"json",
                            data:{module_tmpl_id:module_tmpl_id},
                            success:function(json){
                                $("#contentlist-ruleset").html(json);

                                $("#contentlistPg a").click(evts.pagination_contentlist);
                                $('a[name=content_delete_a]').on('click', evts.content_delete_a);

                                $("#rulegroupPg a").click(evts.pagination_rulegroup);
                                //$('select[name=rulegroup_status]').on('change', evts.change_select_rulegroup_status);
                                //$('select[name=content_status]').on('change', evts.change_select_content_status);
                                $('a[name=rulegroup_status]').on('click', evts.change_a_rulegroup_status);
                                $('a[name=content_status]').on('click', evts.change_a_content_status);
                                $('a[name=rulegroup_delete]').on('click', evts.rulegroup_delete_a);
                                $('a[name=maunal_add_a]').on('click', evts.maunal_add_a);
                                $('a[name=create_rulegroup_a]').on('click', evts.create_rules_group);
                                $('a[name=edit_content_a]').on('click', evts.content_edit_a);
                                $('a[name=edit_rulegroup_a]').on('click', evts.rulegroup_edit_a);
                                console.dirxml(json);
                            }
                        });

                    }
                }
            });
        },
        rulegroup_delete:function(obj){
            var $tr = $(obj).parent().parent().parent(),
                group_id = $tr.find('td').eq(0).text(),
                module_tmpl_id = $('#search-category-4').children('option:selected').attr("id");

            $.ajax({
                url:urls.deleteRuleGroup,
                dataType:"json",
                data:{group_id: group_id},
                success:function(json){
                    if(json['e']['code'] !== 0){
                        console.dirxml(json['e']);
                    }else{
                        $.ajax({
                            url:urls.updateAllAjax,
                            dataType:"json",
                            data:{module_tmpl_id:module_tmpl_id},
                            success:function(json){
                                $("#contentlist-ruleset").html(json);

                                $("#contentlistPg a").click(evts.pagination_contentlist);
                                $('a[name=content_delete_a]').on('click', evts.content_delete_a);

                                $("#rulegroupPg a").click(evts.pagination_rulegroup);
                                //$('select[name=rulegroup_status]').on('change', evts.change_select_rulegroup_status);
                                //$('select[name=content_status]').on('change', evts.change_select_content_status);
                                $('a[name=rulegroup_status]').on('click', evts.change_a_rulegroup_status);
                                $('a[name=content_status]').on('click', evts.change_a_content_status);
                                $('a[name=edit_content_a]').on('click', evts.content_edit_a);
                                $('a[name=rulegroup_delete]').on('click', evts.rulegroup_delete_a);
                                $('a[name=maunal_add_a]').on('click', evts.maunal_add_a);
                                $('a[name=create_rulegroup_a]').on('click', evts.create_rules_group);
                                $('a[name=edit_content_a]').on('click', evts.content_edit_a);
                                $('a[name=edit_rulegroup_a]').on('click', evts.rulegroup_edit_a);
                                console.dirxml(json);
                            }
                        });
                    }
                }
            });
        },
        content_delete:function(obj){
            var $tr = $(obj).parent().parent().parent(),
                item_id = $tr.find('td').eq(0).text();

            $.ajax({
                url:urls.deleteContent,
                dataType:"json",
                data:{itemid : item_id},
                success:function(json){
                    console.dirxml(json);
                    if(json['e']['code'] !== 0){
                        bootbox.alert(json['e']['desc']);
                    }else{
                        //window.location.href = urls.index + "?module_tmpl_id=" + module_tmpl_id;
                        evts.rulegroup_change($("#rules_group"));
                    }
                    //window.location.href = urls.index;
                }
            });
        },
        maunal_add:function(obj){
            var rule_group_id = $("#rules_group").children('option:selected').attr('id'),
                type = $("#info_type").children('option:selected').val();
//                sn = $("#rules_group").children('option:selected').val();
//                ruleid = $("#rules_group").children('option:selected').attr('data-ruleid');
            if(rule_group_id === undefined){
                bootbox.alert("没有激活的规则分组！");
                return false;
            }

            window.location.href = urls.manualAdd + "?rule_group_id=" + rule_group_id
                                      + "&type=" + type;
        },
        rulegroup_change:function(obj){
            var rule_group_id = $(obj).children('option:selected').attr("id");
            var data = {
                rule_group_id:rule_group_id
            };
            console.log(data);
            $.ajax({
                url:urls.updategroupContentAjax,
                dataType:"json",
                data:data,
                success:function(json){
                    console.dirxml(json);
//                    if(json['e']['code'] !== 0){
//                        console.dirxml(json['e']);
//                        bootbox.alert(json['e']['desc']);
//                    }else{
//                        bootbox.alert("添加内容成功");
//                        window.location.href = window.location.origin;
//                    }

                    $("#contentlist_table").html(json);
                    $("#contentlistPg a").click(evts.pagination_contentlist);
                    //$('select[name=content_status]').on('change', evts.change_select_content_status);
                    $('a[name=content_status]').on('click', evts.change_a_content_status);
                    $('a[name=content_delete_a]').on('click', evts.content_delete_a);
                    $('a[name=edit_content_a]').on('click', evts.content_edit_a);
                }
            });
        },
        rulestype_check:function(obj){
            if($(obj).val() === '1'){
                $('a[name=select_grasprule_a]').attr("href","javascript:void(0)").removeAttr("data-toggle");
                $('#rule_name').val("无").attr('disabled','disabled');
            }else if($(obj).val() === '2'){
                $('a[name=select_grasprule_a]').attr("href","#rulesModal").attr("data-toggle",'modal');
                $('#rule_name').val("").removeAttr('disabled');
            }
        },
        btn_item_add:function(obj){
            console.log(obj);
            var rule_group_id = $("input[name=rule_group_id]").val(),
                type = $("input[name=item_type]").val(),//1，2，3
                $tr = $("input[type=radio][name=is_added]:checked").parent().parent();
            var muid  = $tr.find('td').eq(1).text(),
                brief = $("textarea[name=rcm_summary]").val(),
                cover = $("#cover-url").val();

            var data = {
                rule_group_id: rule_group_id,
                type: type,
                muid: muid,
                cover: cover,
                brief: brief
            };

            $.ajax({
                url:urls.createItem,
                dataType:"json",
                data:data,
                success:function(json){
                    console.dirxml(json);
                    if(json['e']['code'] !== 0){
                        console.dirxml(json['e']);
                        bootbox.alert(json['e']['desc']);
                    }else{
                        bootbox.alert("添加内容成功");
                       // window.location.href = window.location.origin;
                    }
                }
            });
        },
        upload_image_rcm:function(obj){
            var cover = $("#rcmcover_upload");
            var isOk = check_cover_image(cover);
            if(!isOk){
                bootbox.alert("图片不符合要求");
                return;
            }

            var success = function(ret){
                var fid = ret.data.fid;
                var url = get_image_url(msg_config.STORAGE_SERVER, msg_constant.IMAGE_NAMESPACE, fid);
                var old_url = $("#cover-url").val();
                (old_url === '')?$("#cover-url").val( url) : $("#cover-url").val(old_url + "," + url);
                bootbox.alert("上传图片成功");
            }

            var error = function(){
                bootbox.alert("上传图片失败");
            }

            inner_upload_image(cover[0].files[0], success, error);

        },
        rulegroup_pagination: function(obj){
            var page = $(obj).attr("href").split("=")[1];
            var module_tmpl_id = $('#search-category-4').children('option:selected').attr("id");
            var data = {
                module_tmpl_id:module_tmpl_id,
                page:page
            };

            var callback = function(data){
                console.dirxml(data);
                $("#ruleset").html(data);
                $("#rulegroupPg a").click(evts.pagination_rulegroup);
                //$('select[name=rulegroup_status]').on('change', evts.change_select_rulegroup_status);
                $('a[name=rulegroup_status]').on('click', evts.change_a_rulegroup_status);
                $('a[name=rulegroup_delete]').on('click', evts.rulegroup_delete_a);
                $('a[name=edit_rulegroup_a]').on('click', evts.rulegroup_edit_a);
            };

            var pg_data = {
                url:urls.updateRulegroup_pg,
                callback:callback,
                data:data
            };

            evts.update_pagination(pg_data);
        },
        contentlist_pagination: function(obj){
            var rule_group_id = $("#rules_group").children('option:selected').attr("id");
            var page = $(obj).attr("href").split("=")[1];

            var data = {
                rule_group_id:rule_group_id,
                page:page
            };

            var callback = function(data){
                console.dirxml(data);
                $("#contentlist_table").html(data);
                $("#contentlistPg a").click(evts.pagination_contentlist);
                //$('select[name=content_status]').on('change', evts.change_select_content_status);
                $('a[name=content_status]').on('click', evts.change_a_content_status);
                $('a[name=content_delete_a]').on('click', evts.content_delete_a);
                $('a[name=edit_content_a]').on('click', evts.content_edit_a);
            };

            var pg_data = {
                url:urls.updategroupContentAjax,
                callback:callback,
                data:data
            };

            evts.update_pagination(pg_data);
        },
        modalinfo_pagination: function(obj){
            var page = $(obj).attr("href").split("=")[1];

            var rules_type = $("#rules_type").children('option:selected').val();
            var data = {
                type:rules_type,
                page:page,
                status:1
            };

            var callback = function(data){
                console.dirxml(data);
                $("#info_modal").html(data);
                var rule_num = $("#info_modal").find("input[name=rule_num]").val();
                $("span.rule_num").text(rule_num);
                $("#modalInfoPg a").click(evts.pagination_modalinfo);
            };

            var pg_data = {
                url:urls.updateRulesAjax,
                callback:callback,
                data:data
            };
            console.dirxml(pg_data);
            evts.update_pagination(pg_data);
        },
        modaluser_pagination: function(obj){
            var page = $(obj).attr("href").split("=")[1];

            var rules_type = $("#rules_type").children('option:selected').val();
            var data = {
                type:rules_type,
                page:page,
                status:1
            };
            console.log(rules_type);
            var callback = function(data){
                $("#user_modal").html(data);
                var rule_num = $("#user_modal").find("input[name=rule_num]").val();
                $("span.rule_num").text(rule_num);
                $("#modalUserPg a").click(evts.pagination_modaluser);
            };

            var pg_data = {
                url:urls.updateRulesAjax,
                callback:callback,
                data:data
            };

            evts.update_pagination(pg_data);
        },
        tbodyUser_pagination: function(obj){
            var page = $(obj).attr("href").split("=")[1];
            var data = {
                type:3,
                page:page
            };

            var callback = function(data){
                $("#ruleUserTable").html(data);
                $("#tbodyUserPg a").click(evts.pagination_tbodyUser);
                //$('select[name=rule_status]').on('change', evts.change_select_rule_status);
                $('a[name=rule_status]').on('click', evts.change_a_rule_status);
                $('a[name=rule_delete]').on('click', evts.rule_delete_a);
            };

            var pg_data = {
                url:urls.updateRuleAjaxTbody,
                callback:callback,
                data:data
            };

            evts.update_pagination(pg_data);
        },
        tbodyInfo_pagination: function(obj){
            var page = $(obj).attr("href").split("=")[1];

           // var type = $("input[name=rule_type]").val();
            var data = {
                type:0,
                page:page
            };

            var callback = function(data){
                console.log(data);
                $("#infoRule").html(data);
                $('a[name=edit_infoRule_a]').on('click', evts.infoRule_edit_a);
                $('a[name=rule_delete]').on('click', evts.rule_delete_a);
                $("#tbodyInfoPg a").click(evts.pagination_tbodyInfo);
                //$('select[name=rule_status]').on('change', evts.change_select_rule_status);
                $('a[name=rule_status]').on('click', evts.change_a_rule_status);
            };

            var pg_data = {
                url:urls.updateRuleAjaxTbody,
                callback:callback,
                data:data
            };

            console.dirxml(pg_data);
            evts.update_pagination(pg_data);
        },
        infoCotent_pagination: function(obj){
            var page = $(obj).attr("href").split("=")[1];

            var msg_type = $("#infoContent input[name=msg_type]").val();
            var data = {
                msg_type:msg_type,
                page:page
            };

            var callback = function(data){
                console.log(data);
                $("#infoContent").html(data);
                $("#infoCotentPg a").click(evts.pagination_infoCotent);
            };

            var pg_data = {
                url:urls.updateContentAjax,
                callback:callback,
                data:data
            };
            console.log(pg_data);
            evts.update_pagination(pg_data);
        },
        userCotent_pagination: function(obj){
            var page = $(obj).attr("href").split("=")[1];

            var msg_type = $("#userContent input[name=msg_type]").val();
            var data = {
                msg_type:msg_type,
                page:page
            };

            var callback = function(data){
                //console.dirxml(data);
                $("#userContent").html(data);
                $("#userCotentPg a").click(evts.pagination_userCotent);
        };

            var pg_data = {
                url:urls.updateContentAjax,
                callback:callback,
                data:data
            };

            evts.update_pagination(pg_data);
        },
        update_pagination:function(data){
            var pg_data = $.extend({url:'',data:{},callback:''},data);

            $.ajax({
                url:pg_data.url,// 跳转到 action
                data: $.extend(pg_data.data,{count:10}),
                type:'post',
                success:function(json){
                    pg_data.callback(json);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    bootbox.alert(errorThrown);
                }
            });
        },
        getFileUrl:function (sourceId) {
            var url;
            if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
                url = document.getElementById(sourceId).value;
            } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
                url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
            } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
                url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
            }
            return url;
        },
        preImg:function(obj, targetId) {
            var sourceId = $(obj).attr('id');
            var url = evts.getFileUrl(sourceId);
            $("#" + targetId).attr({src:url,height:'200px',width:'200px'});
        },
        btn_change_module:function(obj){
            var modid = $('#search-category-4').children('option:selected').attr("id");

            $.ajax({
                url:urls.updateAllAjax,
                dataType:"json",
                data:{module_tmpl_id:modid},
                success:function(json){
                    $("#contentlist-ruleset").html(json);

                    $("#contentlistPg a").click(evts.pagination_contentlist);
                    $('a[name=content_delete_a]').on('click', evts.content_delete_a);

                    $("#rulegroupPg a").click(evts.pagination_rulegroup);
                    //$('select[name=rulegroup_status]').on('change', evts.change_select_rulegroup_status);
                    //$('select[name=content_status]').on('change', evts.change_select_content_status);
                    $('a[name=rulegroup_status]').on('click', evts.change_a_rulegroup_status);
                    $('a[name=content_status]').on('click', evts.change_a_content_status);
                    $('a[name=rulegroup_delete]').on('click', evts.rulegroup_delete_a);
                    $('a[name=maunal_add_a]').on('click', evts.maunal_add_a);
                    $('a[name=create_rulegroup_a]').on('click', evts.create_rules_group);
                    $('a[name=edit_content_a]').on('click', evts.content_edit_a);
                    $('a[name=edit_rulegroup_a]').on('click', evts.rulegroup_edit_a);
                    console.dirxml(json);
                }
            });
        },
        content_edit:function(obj){
            var $tr = $(obj).parent().parent().parent(),
                itemid = $tr.find('td').eq(0).text(),
                title_nick = $.trim($tr.find('td').eq(1).text()),
                rcm_summary = $.trim($tr.find('td').eq(2).text());
                //src = $tr.find('td').eq(3).find("img").attr("src");

            $("#contentEditModal input[name=itemid]").val(itemid);
            $("#contentEditModal input[name=title_nick]").val(title_nick);
            $("#contentEditModal textarea[name=rcm_summary]").val(rcm_summary);
            //$("#imgPre").attr({src:src,height:'200px',width:'200px'});
            $("#contentEditModal").modal('show');
        },
        btn_content_save:function(obj){
            var itemid = $("#contentEditModal input[name=itemid]").val(),
                rcm_summary = $("#contentEditModal textarea[name=rcm_summary]").val(),
                cover = $("#cover-url").val(),
                module_tmpl_id = $('#search-category-4').children('option:selected').attr("id");
                //rule_group_id = $("#rules_group").children('option:selected').attr("id");

                $.ajax({
                    url:urls.updateContentOtherInfo,
                    dataType:"json",
                    data:{itemid:itemid,brief:rcm_summary,cover:cover},
                    success:function(json){
                        console.dirxml(json);
                        if(json['e']['code'] !== 0){
                            alert(json['e']['desc']);
                            console.dirxml(json['e']);
                        }else{
                            $("#contentEditModal").modal('hide');
                            evts.rulegroup_change($("#rules_group"));
                        }
                    }
                });
        },
        infoRule_edit:function(obj){
            var $tr = $(obj).parent().parent().parent(),
                rule_id = $tr.find('td').eq(0).text(),
                rule_name =$.trim($tr.find('td').eq(1).text()),
                rule_type = $.trim($tr.find('td').eq(2).text()),
                period = $tr.find('td').eq(4).text();

            $("#infoRuleEditModal input[name=rule_name_modal]").val(rule_name);
            $("#infoRuleEditModal input[name=inforuleid]").val(rule_id);
            $("#infoRuleEditModal input[name=ruletype]").val(rule_type);
            $("#infoRuleEditModal select option[value=" + period + "]").attr("selected", true);
            $("#infoRuleEditModal").modal('show');
        },
        userRule_edit:function(obj){
            var $tr = $(obj).parent().parent().parent(),
                rule_id = $tr.find('td').eq(0).text(),
                rule_name =  $.trim($tr.find('td').eq(1).text()),
                rule_type = $.trim($tr.find('td').eq(2).text()),
                period = $tr.find('td').eq(5).text();
            console.dirxml(rule_type);

            $("#userRuleEditModal input[name=rule_name_modal]").val(rule_name);
            $("#userRuleEditModal input[name=userruleid]").val(rule_id);
            $("#userRuleEditModal input[name=ruletype]").val(rule_type);
            $("#userRuleEditModal select option[value=" + period + "]").attr("selected", true);
            $("#userRuleEditModal").modal('show');
        },
        rulegroup_edit:function(obj){
            var app_ver = {
                id: $('#search-category-1').children('option:selected').val(),
                verno: $('#search-category-1').children('option:selected').text()
            };

            var page = {
                id: $('#search-category-2').children('option:selected').val(),
                alias: $('#search-category-2').children('option:selected').text()
            };

            var tpl = {
                id: $('#search-category-3').children('option:selected').val(),
                alias: $('#search-category-3').children('option:selected').text()
            };

            var module = {
                id:$('#search-category-4').children('option:selected').attr("id"),
                modtmplid: $('#search-category-4').children('option:selected').val(),
                title: $('#search-category-4').children('option:selected').text()
            };

            var $tr = $(obj).parent().parent().parent(),
                rule_group_id = $tr.find('td').eq(0).text(),
                rule_group_name = $tr.find('td').eq(1).text(),
                items_pos = $tr.find('td').eq(2).text(),
                type = $tr.find('td').eq(3).attr("class"),
                rule_name = $tr.find('td').eq(4).text(),
                apply_more = $tr.find('td').eq(5).attr("class"),
                rule_id = $tr.find('td').eq(8).text();
           var  module_tmpl_id = $('#search-category-4').children('option:selected').attr("id");

            var data = {
                app_ver: JSON.stringify(app_ver),
                pg: JSON.stringify(page),
                tpl: JSON.stringify(tpl),
                module: JSON.stringify(module),
                group_info:JSON.stringify({
                    rule_group_id:rule_group_id,
                    rule_group_name:rule_group_name,
                    items_pos:items_pos,
                    type:type,
                    rule_name:rule_name,
                    apply_more:apply_more,
                    rule_id:rule_id
                })
            };
            console.dirxml(data);

            evts.StandardPost(urls.editGroup, data);
        },
        btn_userrule_save:function(obj){
            var ruleid = $("#userRuleEditModal input[name=userruleid]").val(),
                rulename = $("#userRuleEditModal input[name=rule_name_modal]").val(),
                period = $('#userRuleEditModal select[name=period_modal]').children('option:selected').val(),
                sort_name = $("#userRuleEditModal select[name=sort_name_modal]").children('option:selected').val(),
                sort_order = $("#userRuleEditModal input[type=radio]:checked").val();
            var sort = {};
            sort[sort_name] = sort_order;
            $("#userRuleEditModal input[name=userruleexpr]").val("sort=" + JSON.stringify(sort));

            var expr = $("#userRuleEditModal input[name=userruleexpr]").val();

            $.ajax({
                url:urls.updateRuleOtherInfo,
                dataType:"json",
                data:{rule_id:ruleid,name:rulename,period:period,expr:expr},
                success:function(json){
                    $("#userRuleEditModal").modal('hide');
                    window.location.href = urls.manageRule + "?type=3";
                }
            });
        },
        btn_inforule_save:function(obj){
            var ruleid = $("#infoRuleEditModal input[name=inforuleid]").val(),
                rulename = $("#infoRuleEditModal input[name=rule_name_modal]").val(),
                period = $('#infoRuleEditModal select[name=period_modal]').children('option:selected').val(),
                sort_name = $("#infoRuleEditModal select[name=sort_name_modal]").children('option:selected').val(),
                sort_order = $("#infoRuleEditModal input[type=radio]:checked").val();
            var sort = {};
            sort[sort_name] = sort_order;
            $("#infoRuleEditModal input[name=inforuleexpr]").val("sort=" + JSON.stringify(sort));

            var expr = $("#infoRuleEditModal input[name=inforuleexpr]").val();
            $.ajax({
                url:urls.updateRuleOtherInfo,
                dataType:"json",
                data:{rule_id:ruleid,name:rulename,period:period,expr:expr},
                success:function(json){
                    $("#infoRuleEditModal").modal('hide');
                    window.location.href = urls.manageRule + "?type=0";

                }
            });
        },
        btn_edit_group:function(obj){
            var count = $("input[type='checkbox']:checked").length;
            if(count == 0)
            {
                bootbox.alert("请选择一个推荐位！");
                return false;
            }

            var data = {
                'name': '',
                'type': '',
                'module_tmpl_id': '',
                'rule_id': '',
                'items_pos': '',
                'apply_more': '',
                'group_id': ''
            };

            $.each(data,function(key,value){
                var $radio = $('#grouprules').find("input[type=radio][name=" + key + "]:checked");
                if($radio.length !== 0){
                    data[key] = $radio.val();
                }else{
                    var $input = $('#grouprules').find("input[name=" + key + "]");
                    data[key] = $input.val();
                }
            });

            console.log(data);
            $.ajax({
                url:urls.saveRuleGroupEdit,
                dataType:"json",
                data:data,
                success:function(json){
                    console.log(json);
                    if(json['e']['code'] !== 0){
                        console.dirxml(json['e']);
                        alert(json['e']['desc']);
                    }else{
                        //window.location.href = urls.index + "?module_tmpl_id=" + data['module_tmpl_id'];
                        window.location.href = urls.index;
                    }
                }
            });
        },
        content_status_change:function(obj){
            var $tr = $(obj).parent().parent().parent(),
                item_id = $tr.find('td').eq(0).text(),
                status = $("select[name=content_status]").children('option:selected').val();

            $.ajax({
                url:urls.changeContentStatus,
                dataType:"json",
                data:{itemid : item_id,status:status},
                success:function(json){
                    console.dirxml(json);
                    if(json['e']['code'] !== 0){
                        bootbox.alert(json['e']['desc']);
                    }else{
                        //window.location.href = urls.index + "?module_tmpl_id=" + module_tmpl_id;
                        evts.rulegroup_change($("#rules_group"));
                    }
                    //window.location.href = urls.index;
                }
            });
        },
        userCotent_filter_pagination:function(obj){
            console.dirxml(obj);
            var sort_name = $("select[name=sort_name]").children('option:selected').val(),
                sort_order = $("input[type=radio]:checked").val();
            var sort = {},
                project = {"uid":1,"status":1,"create_time":1,"avatar":1,"nick":1,"signature":1},
                match = {"id":{"$gte":1}};
            sort[sort_name] = +sort_order;
            sort["create_time"] = -1;

            var rules_value = [];
            $.each($(".label.label-info.area"), function(i, obj){
                var rule_name = $(obj).attr("name");
                rules_value.push(+$(this).attr('name'));
                if(rules_value.length !== 0){
                    match['user_area'] = {"$in":rules_value}
                }
            });

            var page = +$(obj).attr("href").split("=")[1];
            var count = 10;
            var skip = (page - 1)*count;

            var expr = "project=" + JSON.stringify(project) + "&match=" + JSON.stringify(match) + "&sort="
                + JSON.stringify(sort) + "&limit=" + count + "&skip=" + skip;

            $.ajax({
                url:urls.SearchContentUser,
                dataType:"json",
                data:{expr:expr,page:page,count:count},
                success:function(json){
                    console.dirxml(json);
                    $('#userContent').html(json);
                    $("#userCotentPg a").click(evts.pagination_userCotent_filter);
                }
            });
            console.dirxml(expr);
        },
        userCotent_search_pagination:function(obj){
            var nick = $("input[name=nicksearch]").val();
            var project = {"uid":1,"status":1,"create_time":1,"avatar":1,"nick":1,"signature":1},
                match = {"id":{"$gte":1},"nick":nick};

            var page = +$(obj).attr("href").split("=")[1];
            var count = 10;
            var skip = (page - 1)*count;

            var expr = 'project=' + JSON.stringify(project) + '&match=' + JSON.stringify(match) + '&sort={"create_time":-1}&limit' + count + "&skip=" + skip;

            $.ajax({
                url:urls.SearchContentUser,
                dataType:"json",
                data:{expr:expr,page:page,count:count},
                success:function(json){
                    console.dirxml(json);
                    $('#userContent').html(json);
                    $("#userCotentPg a").click(evts.pagination_userCotent_search);
                }
            });
            console.dirxml(expr);
        },
        infoCotent_search_pagination:function(obj){
            var msg_type = +$(".label.label-info.msg_type").attr('name'),
                title = $("input[name=titlesearch]").val();
            var project = {"msgid":1,"status":1,"publish_time":1,"create_time":1,"brief":1,"cover":1,"title":1},
                match = {"type":msg_type,"title":title};

            var page = +$(obj).attr("href").split("=")[1];
            var count = 10;
            var skip = (page - 1)*count;

            var expr = 'project=' + JSON.stringify(project) + '&match=' + JSON.stringify(match) + '&sort={"create_time":-1}&limit=' + count + "&skip=" + skip;

            $.ajax({
                url:urls.SearchContentInfo,
                dataType:"json",
                data:{expr:expr,page:page,count:count},
                success:function(json){
                    console.dirxml(json);
                    $('#infoContent').html(json);
                    $("#infoCotentPg a").click(evts.pagination_infoCotent_search);
                }
            });
            console.dirxml(expr);
        },
        infoCotent_filter_pagination:function(obj){
            var msg_type = +$(".label.label-info.msg_type").attr('name'),
                sort_name = $("select[name=sort_name]").children('option:selected').val(),
                sort_order = $("input[type=radio]:checked").val();
            var sort = {},
                project = {"msgid":1,"status":1,"publish_time":1,"create_time":1,"brief":1,"cover":1,"title":1},
                match = {"type":msg_type};
            sort[sort_name] = +sort_order;
            sort["create_time"] = -1;


            var page = +$(obj).attr("href").split("=")[1];
            var count = 10;
            var skip = (page - 1)*count;

            var expr = "project=" + JSON.stringify(project) + "&match=" + JSON.stringify(match) + "&sort="
                + JSON.stringify(sort) + "&limit=" + count + "&skip=" + skip;
            console.dirxml({expr:expr,page:page,count:count});

            $.ajax({
                url:urls.SearchContentInfo,
                dataType:"json",
                data:{expr:expr,page:page,count:count},
                success:function(json){
                    console.dirxml(json);
                    $('#infoContent').html(json);
                    $("#infoCotentPg a").click(evts.pagination_infoCotent_filter);
                }
            });

        },
        btn_infocontent_filter:function(obj){
            var $div = $(obj).parent(".filter");
            var msg_type = +$div.find(".label.label-info.msg_type").attr('name'),
                sort_name = $div.find("select[name=sort_name]").children('option:selected').val(),
                sort_order = $div.find("input[type=radio]:checked").val();
            var sort = {},
                project = {"msgid":1,"status":1,"publish_time":1,"create_time":1,"brief":1,"cover":1,"title":1},
                match = {"type":{"$in":[2,5]},"status":2};
            sort[sort_name] = +sort_order;
            sort["create_time"] = -1;

            var expr = "project=" + JSON.stringify(project) + "&match=" + JSON.stringify(match) + "&sort="
                + JSON.stringify(sort) + "&limit=10&skip=0";

            $.ajax({
                url:urls.SearchContentInfo,
                dataType:"json",
                data:{expr:expr},
                success:function(json){
                    console.dirxml(json);
                    $('#infoContent').html(json);
                    $("#infoCotentPg a").click(evts.pagination_infoCotent_filter);

                }
            });
        },
        btn_infotitle_search:function(obj){
            var $div = $(obj).parent(".search");
            var msg_type = +$(".label.label-info.msg_type").attr('name'),
                title = $div.find("input[name=titlesearch]").val();
            var project = {"msgid":1,"status":1,"publish_time":1,"create_time":1,"brief":1,"cover":1,"title":1},
                match = {"type":msg_type,"title":title};

            var expr = 'project=' + JSON.stringify(project) + '&match=' + JSON.stringify(match) + '&sort={"create_time":-1}&limit=20&skip=0';

            $.ajax({
                url:urls.SearchContentInfo,
                dataType:"json",
                data:{expr:expr},
                success:function(json){
                    console.dirxml(json);
                    $('#infoContent').html(json);
                    $("#infoCotentPg a").click(evts.pagination_infoCotent_search);
                }
            });
            console.dirxml(expr);
        },
        btn_usercontent_filter:function(obj){
            var $div = $(obj).parent(".filter");
            var sort_name = $div.find("select[name=sort_name]").children('option:selected').val(),
                sort_order = $div.find("input[type=radio]:checked").val();
            var sort = {},
                project = {"uid":1,"status":1,"create_time":1,"avatar":1,"nick":1,"signature":1},
                match = {"id":{"$gte":1}};
            sort[sort_name] = +sort_order;
            sort["create_time"] = -1;

            var rules_value = [];
            $.each($(".label.label-info.area"), function(i, obj){
                var rule_name = $(obj).attr("name");
                rules_value.push(+$(this).attr('name'));
                if(rules_value.length !== 0){
                    match['user_area'] = {"$in":rules_value}
                }
            });

            var expr = "project=" + JSON.stringify(project) + "&match=" + JSON.stringify(match) + "&sort="
                + JSON.stringify(sort) + "&limit=20&skip=0";

            $.ajax({
                url:urls.SearchContentUser,
                dataType:"json",
                data:{expr:expr},
                success:function(json){
                    console.dirxml(json);
                    $('#userContent').html(json);
                    $("#userCotentPg a").click(evts.pagination_userCotent_filter);

                }
            });
            console.dirxml(expr);
        },
        btn_usernick_search:function(obj){
            var nick = $("input[name=nicksearch]").val();
            var project = {"uid":1,"status":1,"create_time":1,"avatar":1,"nick":1,"signature":1},
                match = {"id":{"$gte":1},"nick":nick};

            var expr = 'project=' + JSON.stringify(project) + '&match=' + JSON.stringify(match) + '&sort={"create_time":-1}&limit=20&skip=0';

            $.ajax({
                url:urls.SearchContentUser,
                dataType:"json",
                data:{expr:expr},
                success:function(json){
                    console.dirxml(json);
//                    if(json['e']['code'] !== 0){
//                        bootbox.alert(json['e']['desc']);
//                    }else{
//                        $('#userContent').html(json);
//                        $("#userCotentPg a").click(evts.pagination_userCotent_search);
//                    }
                    $('#userContent').html(json);
                    $("#userCotentPg a").click(evts.pagination_userCotent_search);

                }
            });
            console.dirxml(expr);
        },
        clear_err_info:function(){
            $("#errInfo").hide();
        }
};

    var bindEvts = function() {
        $('#recmTab a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });

//        $('#graspTab a').click(function (e) {
//            e.preventDefault();
//            $(this).tab('show');
//        });

        $('#search-category-1').on('change', evts.change_select_appver);
        $('#search-category-2').on('change', evts.change_select_pgid);
        $('#search-category-3').on('change', evts.change_select_pgtmpl);
        //$('select[name=rule_status]').on('change', evts.change_select_rule_status);
        $('a[name=rule_status]').on('click', evts.change_a_rule_status);
        $('a[name=content_status]').on('click', evts.change_a_content_status);
        $('a[name=rulegroup_status]').on('click', evts.change_a_rulegroup_status);
        //$('select[name=rulegroup_status]').on('change', evts.change_select_rulegroup_status);
        //$('select[name=content_status]').on('change', evts.change_select_content_status);
        $('#rcmcover_upload').on('change', evts.previewImage_upload);
        $('#rules_type').on('change', evts.change_select_rules_type);
        $('div.rule span:not(.help-inline)').bind('click', evts.change_span_rules);
        $('#graspTab span:not(.help-inline)').bind('click', evts.change_span_tab);
        $('a[name=create_rulegroup_a]').on('click', evts.create_rules_group);
        $('a[name=rule_delete]').on('click', evts.rule_delete_a);
        $('a[name=rulegroup_delete]').on('click', evts.rulegroup_delete_a);
        $('a[name=maunal_add_a]').on('click', evts.maunal_add_a);
        $('a[name=content_delete_a]').on('click', evts.content_delete_a);
        $('a[name=edit_content_a]').on('click', evts.content_edit_a);
        $('a[name=edit_infoRule_a]').on('click', evts.infoRule_edit_a);
        $('a[name=edit_userRule_a]').on('click', evts.userRule_edit_a);
        $('a[name=edit_rulegroup_a]').on('click', evts.rulegroup_edit_a);
        $('.rulestype input[name=type]').on('click', evts.rulestype_radio_check);
        $('#rules_group').on('change', evts.change_select_rulegroup);
        $("#rulegroupPg a").click(evts.pagination_rulegroup);
        $("#contentlistPg a").click(evts.pagination_contentlist);
        $("#modalInfoPg a").click(evts.pagination_modalinfo);
        $("#modalUserPg a").click(evts.pagination_modaluser);
        $("#tbodyInfoPg a").click(evts.pagination_tbodyInfo);
        $("#tbodyUserPg a").click(evts.pagination_tbodyUser);
        $("#infoCotentPg a").click(evts.pagination_infoCotent);
        $("#userCotentPg a").click(evts.pagination_userCotent);

        $("#upload-cover").click(evts.upload_image);
        $('button[name=add_rule]').bind('click', evts.add_rule_grasp);
        $('button[name=add_item]').bind('click', evts.add_item_btn);
        $('button[name=change_module]').bind('click', evts.change_module_btn);
        $('button[name=content_save]').bind('click', evts.content_save_btn);
        $('button[name=userrule_save]').bind('click', evts.userrule_save_btn);
        $('button[name=inforule_save]').bind('click', evts.inforule_save_btn);
        $('button[name=btn_edit_group]').bind('click', evts.edit_group_btn);
        $('button[name=info_content_filter]').bind('click', evts.infocontent_filter_btn);
        $('button[name=info_title_search]').bind('click', evts.infotitle_search_btn);
        $('button[name=user_content_filter]').bind('click', evts.usercontent_filter_btn);
        $('button[name=user_nick_search]').bind('click', evts.usernick_search_btn);
        $("#search input[type=radio][name=publish]").bind('click', evts.publish_radio_check);
        $('button[name=grasprule_select]').bind('click', evts.grasprule_modal_btn);
        $('#grouprules div.avail_sites input[type=checkbox]').bind('click', evts.avail_sites_select);
        $('#btn_creat_group').bind('click', evts.rulegroup_submit_btn);
        $('#rule_search').bind('click', evts.rule_search_btn);
        $("#rulesModal").modal('hide');
        $("#contentEditModal").modal('hide');
        $("#infoRuleEditModal").modal('hide');
        $("#userRuleEditModal").modal('hide');

        $("input[name='is_used']").bind('click', evts.select_rule);
    };

    // init
    var init = function(type) {
        bindEvts();
    };

    init();
});
