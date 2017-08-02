/**
 * Created by V10103366 on 2015/7/24.
 */
/**
 * Created by V10103366 on 2015/7/24.
 */

$(function()
{
    var constant =
    {
        PAGE_LEN : 10,
        OPEN_STATUS : 1,
        CLOSE_STATUS : 2,
        DELETE_STATUS : 3,

        MSG_ARTICLE : 5,
        MSG_VIDEO : 4,
        MSG_PICCON : 2,
        MSG_ALL : -1,

        USER_VIP : 1,
        USER_COMMON : 0,
        USER_ALL : -1,

        AREA_ALL : 0
    };

    var evts =
    {
        turnPage : function(e)
        {
            var page = "";

            if("number" == typeof(e))
            {
                if(0 == e)
                {
                    var node = $("#tbodyPg li.active").find("a");
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

            var type = "";
            $("span[name='type']").each(function()
            {
                if($(this).hasClass('btn-yellow'))
                {
                    type = $(this).attr('content');
                    return false;
                }
            });

            var size = 0;

            if(type == "1")
                size = $("#infoRuleTable tr").length;
            else
                size = $("#userRuleTable tr").length;

            if(size <= 2 && page > 1)
            {
                page = page - 1;
            }

            $.ajax({
                url:'/grasprules/get_rules',// 跳转到 action
                data:
                {
                    type:type,
                    page:page,
                    count:constant.PAGE_LEN
                },
                type:'post',
                success:function(data)
                {
                    if(type == "1")
                    {
                        $("#infoRule").html(data);
                        $("#infoPage a").click(evts.turnPage);
                    }
                    else
                    {
                        $("#ruleUserTable").html(data);
                        $("#userPage a").click(evts.turnPage);
                    }

                    $("a[name='editInfoRule']").click(evts.editInfoRule);
                    $("a[name='editUserRule']").click(evts.editUserRule);
                    $("a[name='updateStatus']").click(evts.updateRuleStatus);
                    $("a[name='publishRule']").click(evts.publishRule);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("出错了，请稍后重试！");
                }
            });
        },

        editUserRule:function()
        {
            var ruleid = $(this).closest('tr').find("input[name='ruleid']").attr('ruleid');
            $("#userruleid").val(ruleid);

            var ruletype = $(this).closest('tr').find("input[name='ruletype']").attr('ruletype');
            var rulename = $(this).closest('tr').find("input[name='rulename']").attr('rulename');
            var area = $(this).closest('tr').find("input[name='area']").attr('area');
            var sorttype = $(this).closest('tr').find("input[name='sort']").attr('sorttype');
            var sortvalue = $(this).closest('tr').find("input[name='sort']").attr('sortvalue');
            var period = $(this).closest('tr').find("input[name='period']").attr('period');


            $("span[name='userEditType']").attr('class', 'btn btn-minier');
            $("span[name='userEditType'][type='" + ruletype + "']").attr('class', 'btn btn-minier btn-yellow');

            area = area.replace('[','');
            area = area.replace(']','');
            area = area.split(',');
            var count = area.length;

            $("span[name='editarea']").each(function()
            {
                for(var i = 0; i < count; i++)
                {
                    if($(this).attr('value') === area[i])
                    {
                        $(this).attr('class', 'btn btn-minier btn-yellow');
                    }
                    else
                    {
                        $(this).attr('class', 'btn btn-minier');
                    }
                }
            });

            $("#user_rule_name_edit").val(rulename);
            $("#user_sort_name_edit").val(sorttype);
            $("input[name='sort_sequence_user'][value='" + sortvalue + "']").attr('checked', 'checked');
            $("#user_period_edit").val(period);

            $("#userRuleEditModal").modal("show");
        },
        editInfoRule:function()
        {
            var ruleid = $(this).closest('tr').find("input[name='ruleid']").attr('ruleid');
            $("#inforuleid").val(ruleid);
            var ruletype = $(this).closest('tr').find("input[name='ruletype']").attr('ruletype').split(",");
            var rulename = $(this).closest('tr').find("input[name='rulename']").attr('rulename');
            var sorttype = $(this).closest('tr').find("input[name='sort']").attr('sorttype');
            var sortvalue = $(this).closest('tr').find("input[name='sort']").attr('sortvalue');
            var period = $(this).closest('tr').find("input[name='period']").attr('period');

            $("span[name='msgEditType']").attr('class', 'btn btn-minier');
            $("span[name='msgEditType'][type='" + ruletype + "']").attr('class', 'btn btn-minier btn-yellow');

            $("#info_rule_name").val(rulename);
            $("#info_sort_name").val(sorttype);
            $("input[name='sort_sequence_info'][value='" + sortvalue + "']").attr('checked', 'checked');
            $('#info_period').val(period);

            $("#infoRuleEditModal").modal("show");
        },
        publishRule:function()
        {
            var type = "";
            $("span[name='type']").each(function()
            {
                if($(this).hasClass('btn-yellow'))
                {
                    type = $(this).attr('content');
                }
            });
            var ruleId = $(this).closest("tr").find("input[name='ruleid']").attr('ruleid');
            $.ajax({
                url:'/grasprules/publish_rule',// 跳转到 action
                data:
                {
                    rule_id:ruleId,
                    type:type
                },
                type:'post',
                success:function(data)
                {
                    evts.turnPage(0);

                    if(data['e']['code'] == "0")
                        bootbox.alert("发布成功");
                    else
                        bootbox.alert('发布失败，请稍后重试');

                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("出错了，请稍后重试！");
                }
            });
        },
        updateRuleStatus:function()
        {
            var ruleId = $(this).closest("tr").find("input[name='ruleid']").attr('ruleid');
            var status = $(this).attr('data-tostatus');

            var succText = "";
            var errText = "";
            var inUseText = "";
            var confText = "";

            if(status == constant.CLOSE_STATUS)
            {
                confText = "是否确定关闭？";
                succText = "关闭成功";
                errText = "关闭失败";
                inUseText = "该规则已在使用，不能取消发布"
            }
            else
            {
                confText = "是否确定删除？";
                succText = "删除成功";
                errText = "删除失败";
                inUseText = "该规则已在使用，不能删除"
            }

            bootbox.setLocale("zh_CN");
            bootbox.confirm(confText, function(result)
            {
                if(result)
                {
                    $.ajax({
                        url:'/grasprules/update_rule_status',// 跳转到 action
                        data:
                        {
                            rule_id:ruleId,
                            status:status
                        },
                        type:'post',
                        success:function(data)
                        {
                            evts.turnPage(0);
                            if(data['e']['code'] == "0")
                                bootbox.alert(succText);
                            else if(data['e']['code'] == "1504")
                                bootbox.alert(inUseText);
                            else
                                bootbox.alert(errText);
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown)
                        {
                            bootbox.alert("出错了，请稍后重试！");
                        }
                    });
                }
            });
        },

        addRule : function()
        {
            $("button[name='add_rule']").attr('disabled', 'disabled');
            var type = "";
            $("span[name='type']").each(function()
            {
                if($(this).hasClass("btn-yellow"))
                {
                    type = $(this).attr('content');
                }
            });

            var period, name, sort_name, sort_order;
            var project, match = {}, sort = {};

            if(type == "1")
            {
                name = $.trim($("#msg_rule_name").val());

                if(name == "")
                {
                    $("#divInfoName").attr("class", "control-group error");
                    $("#infoSpan").attr("for", "inputError");
                    $("#inpInfoSpan").text("请录入规则名称！");
                    return false;
                }

                $("#saveModal").modal("show");

                period = $("#msg_period").children('option:selected').val();
                sort_name = $("#msg_sort_name").children('option:selected').val();
                sort_order = +$("input[type='radio'][name='msg_sequence_info']:checked").val();

                $("span[name='msgType']").each(function()
                {
                    if($(this).hasClass("btn-yellow"))
                    {
                        if($(this).attr("type") == constant.MSG_ALL)
                        {
                            match['type'] = {"$in":[constant.MSG_PICCON,constant.MSG_VIDEO,constant.MSG_ARTICLE]};
                            return false;
                        }
                        else
                        {
                            match['type'] = +$(this).attr("type");
                        }
                    }
                });

                //限制消息状态  0 草稿  1 先发后审核消息/审核通过  2 先审后发消息  3 屏蔽  4 删除
                match['status'] = 1;
                project = {msgid:1,status:1,publish_time:1,brief:1,cover:1,title:1,create_time:1};
            }
            else
            {
                name = $.trim($("#user_rule_name").val());
                if(name == "")
                {
                    $("#divUserName").attr("class", "control-group error");
                    $("#userSpan").attr("for", "inputError");
                    $("#inpUserSpan").text("请录入规则名称！");
                    return false;
                }

                $("#saveModal").modal("show");

                period = $("#user_period").children('option:selected').val();
                sort_name = $("#user_sort_name").children('option:selected').val();
                sort_order = +$("input[type='radio'][name='user_sequence_info']:checked").val();

                var v_certification = "";

                $("span[name='userType']").each(function()
                {
                    if($(this).hasClass("btn-yellow"))
                    {
                        v_certification = +$(this).attr("type");
                        return false;
                    }
                });

                if(v_certification == constant.USER_ALL)
                    match['v_certification'] = {"$in":[constant.USER_COMMON,constant.USER_VIP]};
                else
                    match['v_certification'] = v_certification;

                $("span[name='area']").each(function()
                {
                    if($(this).hasClass("btn-yellow"))
                    {
                        if($(this).attr("value") == constant.AREA_ALL)
                        {
                            return false;
                        }
                        else
                        {
                            match['reg_area'] = +$(this).attr("value");
                            return false;
                        }
                    }
                });

                project = {uid:1,status:1,create_time:1,avatar:1,nick:1,signature:1};
                //限制用户类型，1 未注册 2 第三方登录 3	主动注册 4 第三方登录并且已绑定凭证&设置密码
                match['type'] = {"$in":[2,3,4]};
                //限制用户状态，0 正常 1 屏蔽 2	审核中
                match['status'] = 0;
            }
            sort[sort_name] = sort_order;
            var expr = "project=" + JSON.stringify(project) + "&match=" + JSON.stringify(match) + "&sort=" + JSON.stringify(sort);
            $.ajax({
                url:'/grasprules/create_rules',
                dataType:"json",
                data:{
                    name: name,
                    type: type,
                    expr: expr,
                    period: period
                },
                success:function(json)
                {
                    if(json['e']['code'] == 0)
                    {
                        $("#saveModal").modal("hide");
                        $("#successModal").modal("show");
                        $("button[name='add_rule']").removeAttr('disabled');
                        $("#user_rule_name").val("");
                        $("#msg_rule_name").val("");
                        evts.turnPage(1);
                    }
                    else
                    {
                        $("#saveModal").modal("hide");
                        $("#failModal").modal("show");
                        $("button[name='add_rule']").removeAttr('disabled');
                    }
                }
            });
        },
        changType:function()
        {
            var type = $(this).attr('content');
            $(this).attr('class', 'btn btn-minier btn-yellow');

            $("span[name='type']").each(function()
            {
                if($(this).attr('content') != type)
                {
                    $(this).attr('class', 'btn btn-minier')
                }
            });

            if(type == "1")
            {
                $("#msgRule").show();
                $("#divMsg").show();
                $("#divUser").hide();
                $("div[name='userRule']").hide();
            }
            else
            {
                $("#msgRule").hide();
                $("#divMsg").hide();
                $("#divUser").show();
                $("div[name='userRule']").show();
            }

            evts.turnPage(1);
        },
        changeMsgType:function()
        {
            var itemName = "span[name='msgType']";
            var itemAll = "span[name='msgType'][type='" + constant.MSG_ALL + "']";
            var all = constant.MSG_ALL;

            var valueItem = "type";
            evts.changeTypeCommon(itemName, itemAll, all, valueItem, $(this));
        },
        changeUserType:function()
        {
            var itemName = "span[name='userType']";
            var itemAll = "span[name='userType'][type='" + constant.USER_ALL + "']";

            var all = constant.USER_ALL;
            var valueItem = "type";
            evts.changeTypeCommon(itemName, itemAll, all, valueItem, $(this));
        },
        changeArea:function()
        {
            var itemName = "span[name='area']";
            var itemAll = "span[name='area'][value='" + constant.AREA_ALL + "']";
            var all = constant.AREA_ALL;
            var valueItem = "value";
            evts.changeTypeCommon(itemName, itemAll, all, valueItem, $(this));
        },
        typeMsgRuleName:function()
        {
            if($(this).val().length > 24)
            {
                $("#divInfoName").attr("class", "control-group error");
                $("#infoSpan").attr("for", "inputError");
                $("#inpInfoSpan").text("最多录入24个字符");
                $("button[name='add_rule']").attr('disabled', 'disabled');
            }
            else if($(this).val().length < 1)
            {
                $("#divInfoName").attr("class", "control-group error");
                $("#infoSpan").attr("for", "inputError");
                $("#inpInfoSpan").text("请录入规则名称");
                $("button[name='add_rule']").attr('disabled', 'disabled');
            }
            else
            {
                $("#divInfoName").attr("class", "control-group info");
                $("#infoSpan").attr("for", "inputInfo");
                $("#inpInfoSpan").text("");
                $("button[name='add_rule']").removeAttr('disabled');
            }
        },
        typeUserRuleName:function()
        {
            if($(this).val().length > 24)
            {
                $("#divUserName").attr("class", "control-group error");
                $("#userSpan").attr("for", "inputError");
                $("#inpUserSpan").text("最多录入24个字符");
                $("button[name='add_rule']").attr('disabled', 'disabled');
            }
            else if($(this).val().length < 1)
            {
                $("#divUserName").attr("class", "control-group error");
                $("#userSpan").attr("for", "inputError");
                $("#inpUserSpan").text("请录入规则名称");
                $("button[name='add_rule']").attr('disabled', 'disabled');
            }
            else
            {
                $("#divUserName").attr("class", "control-group info");
                $("#userSpan").attr("for", "inputInfo");
                $("#inpUserSpan").text("");
                $("button[name='add_rule']").removeAttr('disabled');
            }
        },

        changeMsgTypeEdit:function()
        {
            var itemName = "span[name='msgEditType']";
            var itemAll = "span[name='msgEditType'][type='" + constant.MSG_ALL + "']";
            var all = constant.MSG_ALL;
            var valueItem = "type";
            evts.changeTypeCommon(itemName, itemAll, all, valueItem, $(this));
        },
        changeUserTypeEdit:function()
        {
            var itemName = "span[name='userEditType']";
            var itemAll = "span[name='userEditType'][type='" + constant.USER_ALL + "']";
            var all = constant.USER_ALL;
            var valueItem = "type";
            evts.changeTypeCommon(itemName, itemAll, all, valueItem, $(this));
        },
        changeUserAreaEdit:function()
        {
            var itemName = "span[name='editarea']";
            var itemAll = "span[name='editarea'][value='" + constant.AREA_ALL + "']";
            var all = constant.AREA_ALL;
            var valueItem = "value";
            evts.changeTypeCommon(itemName, itemAll, all, valueItem, $(this));
        },

        changeTypeCommon:function(itemName, itemAll, all, valueItem, item)
        {
            //单选
            item.attr('class', 'btn btn-minier btn-yellow');

            $(itemName).each(function()
            {
                if($(this).attr(valueItem) != item.attr(valueItem) && $(this).hasClass('btn-yellow'))
                {
                    $(this).attr('class', "btn btn-minier");
                }
            });

            //多选
            //if(item.attr(valueItem) == all)
            //{
            //    item.attr('class', 'btn btn-minier btn-yellow');
            //
            //    $(itemName).each(function()
            //    {
            //        if($(this).attr(valueItem) != all && $(this).hasClass('btn-yellow'))
            //        {
            //            $(this).attr('class', "btn btn-minier");
            //        }
            //    });
            //}
            //else
            //{
            //    var isChoose = false;
            //    if(item.hasClass('btn-yellow'))
            //    {
            //        item.attr('class', 'btn btn-minier');
            //    }
            //    else
            //    {
            //        item.attr('class', 'btn btn-minier btn-yellow');
            //    }
            //    $(itemName).each(function()
            //    {
            //        if($(this).attr(valueItem) != all && $(this).hasClass('btn-yellow'))
            //        {
            //            isChoose = true;
            //            return false;
            //        }
            //    });
            //    if(isChoose)
            //    {
            //        $(itemAll).attr('class', 'btn btn-minier');
            //    }
            //    else
            //    {
            //        $(itemAll).attr('class', 'btn btn-minier btn-yellow');
            //    }
            //    isChoose = true;
            //    $(itemName).each(function()
            //    {
            //        if($(this).attr(valueItem) != all && !$(this).hasClass('btn-yellow'))
            //        {
            //            isChoose = false;
            //            return false;
            //        }
            //    });
            //    if(isChoose)
            //    {
            //        $(itemAll).attr('class', 'btn btn-minier btn-yellow');
            //        $(itemName).each(function()
            //        {
            //            if($(this).attr(valueItem) != all)
            //            {
            //                $(this).attr('class', 'btn btn-minier');
            //            }
            //        });
            //    }
            //}
        },

        updateInfoRule:function()
        {
            var ruleId = $("#inforuleid").val();
            var period, name, sort_name, sort_order;
            var project, match = {}, sort = {};

            name = $.trim($("#info_rule_name").val());

            if (name == "")
            {
                $("#divInfoEditName").attr("class", "profile-info-row error");
                $("#divEditName").attr("for", "inputError");
                $("#info_rule_name_span").text("请录入规则名称！");
                return false;
            }

            var type = "1";

            $("#info_rule_save").attr('disabled', 'disabled');

            $("#saveModal").modal("show");
            $("#infoRuleEditModal").modal("hide");

            period = $("#info_period").children('option:selected').val();
            sort_name = $("#info_sort_name").children('option:selected').val();
            sort_order = +$("input[type='radio'][name='sort_sequence_info']:checked").val();

            $("span[name='msgEditType']").each(function () {
                if ($(this).hasClass("btn-yellow")) {
                    if ($(this).attr("type") == constant.MSG_ALL)
                    {
                        match['type'] = {"$in":[constant.MSG_PICCON,constant.MSG_VIDEO,constant.MSG_ARTICLE]};
                        return false;
                    }
                    else
                    {
                        match['type'] = +$(this).attr("type");
                    }
                }
            });

            //限制消息状态  0 草稿  1 先发后审核消息/审核通过  2 先审后发消息  3 屏蔽  4 删除
            match['status'] = 1;

            project = {msgid: 1, status: 1, publish_time: 1, brief: 1, cover: 1, title: 1, create_time: 1};

            sort[sort_name] = sort_order;
            var expr = "project=" + JSON.stringify(project) + "&match=" + JSON.stringify(match) + "&sort=" + JSON.stringify(sort);

            $.ajax({
                url:'/grasprules/update_rule_info',
                dataType:"json",
                data:{
                    rule_id:ruleId,
                    name: name,
                    type: type,
                    expr: expr,
                    period: period
                },
                type:'post',
                success:function(json)
                {
                    if(json['e']['code'] == 0)
                    {
                        $("#saveModal").modal("hide");
                        $("#successModal").modal("show");
                    }
                    else
                    {
                        $("#saveModal").modal("hide");
                        $("#failModal").modal("show");
                    }
                    $("#info_rule_save").removeAttr('disabled');
                    evts.turnPage(0);
                }
            });
        },

        updateUserRule:function()
        {
            var ruleId = $("#userruleid").val();
            $("#user_rule_save").attr('disabled', 'disabled');
            var type = "2";

            var period, name, sort_name, sort_order;
            var project, match = {}, sort = {};
            name = $.trim($("#user_rule_name_edit").val());
            if(name == "")
            {
                $("#divUserEditName").attr("class", "profile-info-row error");
                $("#user_rule_name_span").text("请录入规则名称！");
                return false;
            }

            $("#saveModal").modal("show");
            $("#userRuleEditModal").modal("hide");

            period = $("#user_period_edit").children('option:selected').val();
            sort_name = $("#user_sort_name_edit").children('option:selected').val();
            sort_order = +$("input[type='radio'][name='sort_sequence_user']:checked").val();

            var v_certification = "";

            $("span[name='userEditType']").each(function()
            {
                if($(this).hasClass("btn-yellow"))
                {
                    v_certification = +$(this).attr("type");
                    return false;
                }
            });

            if(v_certification == constant.USER_ALL)
                match['v_certification'] = {"$in":[constant.USER_COMMON,constant.USER_VIP]};
            else
                match['v_certification'] = v_certification;

            $("span[name='editarea']").each(function()
            {
                if($(this).hasClass("btn-yellow"))
                {
                    if($(this).attr("value") == constant.AREA_ALL)
                    {
                        return false;
                    }
                    else
                    {
                        match['reg_area'] = +$(this).attr("value");
                        return false;
                    }
                }
            });

            project = {uid:1,status:1,create_time:1,avatar:1,nick:1,signature:1};
            sort[sort_name] = sort_order;

            //限制用户类型，1 未注册 2 第三方登录 3	主动注册 4 第三方登录并且已绑定凭证&设置密码
            match['type'] = {"$in":[2,3,4]};
            //限制用户状态，0 正常 1 屏蔽 2	审核中
            match['status'] = 0;

            var expr = "project=" + JSON.stringify(project) + "&match=" + JSON.stringify(match) + "&sort=" + JSON.stringify(sort);

            $.ajax({
                url:'/grasprules/update_rule_info',
                dataType:"json",
                data:{
                    rule_id:ruleId,
                    name: name,
                    type: type,
                    expr: expr,
                    period: period
                },
                success:function(json)
                {
                    if(json['e']['code'] == 0)
                    {
                        $("#saveModal").modal("hide");
                        $("#successModal").modal("show");
                    }
                    else
                    {
                        $("#saveModal").modal("hide");
                        $("#failModal").modal("show");
                    }
                    $("#user_rule_save").removeAttr('disabled');
                    evts.turnPage(0);
                }
            });
        },

        editMsgRuleName:function()
        {
            if($(this).val().length > 24)
            {
                $("#divInfoEditName").attr("class", "profile-info-row error");
                $("#divEditName").attr("for", "inputError");
                $("#info_rule_name_span").text("最大长度不得超过24个字符！");
                $("#info_rule_save").attr('disabled', 'disabled');
            }
            else if($(this).val().length < 1)
            {
                $("#divInfoEditName").attr("class", "profile-info-row error");
                $("#divEditName").attr("for", "inputError");
                $("#info_rule_name_span").text("请录入规则名称！");

                $("#info_rule_save").attr('disabled', 'disabled');
            }
            else
            {
                $("#divInfoEditName").attr("class", "profile-info-row");
                $("#divEditName").attr("for", "inputInfo");
                $("#info_rule_name_span").text("");

                $("#info_rule_save").removeAttr('disabled');
            }
        },

        editUserRuleName:function()
        {
            if($(this).val().length > 24)
            {
                $("#divUserEditName").attr("class", "profile-info-row error");
                $("#user_rule_name_edit").attr("for", "inputError");
                $("#user_rule_name_span").text("最大长度不得超过24个字符！");
                $("#user_rule_save").attr('disabled', 'disabled');
            }
            else if($(this).val().length < 1)
            {
                $("#divUserEditName").attr("class", "profile-info-row error");
                $("#user_rule_name_edit").attr("for", "inputError");
                $("#user_rule_name_span").text("请录入规则名称！");

                $("#user_rule_save").attr('disabled', 'disabled');
            }
            else
            {
                $("#divUserEditName").attr("class", "profile-info-row");
                $("#user_rule_name_edit").attr("for", "inputInfo");
                $("#user_rule_name_span").text("");

                $("#user_rule_save").removeAttr('disabled');
            }
        }
    };

    var bindEvents = function()
    {
        $("button[name='add_rule']").click(evts.addRule);
        $('span[name="type"]').click(evts.changType);
        $('span[name="msgType"]').click(evts.changeMsgType);
        $('span[name="userType"]').click(evts.changeUserType);
        $('span[name="area"]').click(evts.changeArea);
        $('#msg_rule_name').keyup(evts.typeMsgRuleName);
        $('#user_rule_name').keyup(evts.typeUserRuleName);

        $('#info_rule_save').click(evts.updateInfoRule);
        $('#info_rule_name').keyup(evts.editMsgRuleName);
        $('span[name="msgEditType"]').click(evts.changeMsgTypeEdit);

        $('span[name="userEditType"]').click(evts.changeUserTypeEdit);
        $('span[name="editarea"]').click(evts.changeUserAreaEdit);
        $('#user_rule_save').click(evts.updateUserRule);
        $('#user_rule_name_edit').keyup(evts.editUserRuleName);

    };

    var init = function()
    {
        bindEvents();

        evts.turnPage(1);
    };

    init();
});
