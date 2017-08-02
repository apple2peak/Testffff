$(function()
{
    var constant =
    {
        PAGE_LEN : 10,
    };

    var evts =
    {
        //tab切换
        changeTab : function (e)
        {
            e.preventDefault();//阻止a链接的跳转行为
            $(this).tab('show');//显示当前选中的链接及关联的content
        },

        //APP版本下拉
        selAppVer : function()
        {
            $.ajax({
                url:'/templatemanage/get_page_name?versionid=' + $(this).val(),// 跳转到 action
                type:'POST',
                dataType:"json",
                cache:false,
                success:function(data)
                {
                    $("#search-category-l1").empty();

                    var pageNameLength = data.pageName.length;
                    var item = "<option value=''></option>";
                    for(var i = 0; i < pageNameLength; i++)
                    {
                        item += "<option value='" + data.pageName[i].id + "'>" + data.pageName[i].name + "</option>";

                        $("#search-category-l1").append(item);
                    }

                    $("#searchParam").val("");
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("操作失败");
                }
            });
        },

        //切换模板
        selTemp : function()
        {
            $("#errInfo").hide();
            var src = ($(this).closest("td")).find('img').attr('src');
            evts.showPic(src);
        },
        selTempPic : function(e)
        {
            e.preventDefault();
            $("#errInfo").hide();
            var src = $(this).find("img").attr('src');
            $(this).closest("td").find('input[name="template"]').attr('checked', 'checked');

            evts.showPic(src);
        },
        showPic : function(src)
        {
            $("#tmpShow").empty();
            var item = "<img src='" + src + "' style='margin-top: 46px;margin-right: 11px;width: 125px; height: 221px' />"
            $("#tmpShow").append(item);
        },

        //选择模板按钮
        chooseTemp : function()
        {
            var templateId = $('input[name="template"]:checked').attr('value');

            if(templateId == "" || templateId == null)
            {
                $("#errInfo").show();
                return false;
            }

            var pageId = $('#search-category-l1 option:selected').attr("value");

            location.href = '/templatemanage/make_template_config?pageid='
                + pageId + '&templateid=' + templateId;
        },

        //模板翻页
        freshSearchTemp : function(e)
        {
            var page = "";

            if("number" == typeof(e))
            {
                if(0 == e)
                {
                    var node = $("#tempPage li.active").find("a");
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

            var size = $("#pageTemplateTable tr").length;

            if(size <= 2 && page > 1)
            {
                page = page - 1;
            }

            var pageid =  $("#search-category-l1  option:selected").val();
            var keyword =  $("#searchParam").val();

            $.ajax({
                url:'/templatemanage/get_page_template',// 跳转到 action
                data:{
                    pgid : pageid,
                    count : constant.PAGE_LEN,
                    page : page,
                    keyword : keyword
                },
                type:'post',
                success:function(data)
                {
                    $("#template").html(data);

                    $("a[name='editPage']").click(evts.editPage);
                    $("a[name='previewPage']").click(evts.previewPage);
                    $("a[name='delPage']").click(evts.confirmDelPage);
                    $("a[name='publishPage']").click(evts.confirmPublishPage);

                    $('#tempPage a').click(evts.freshSearchTemp);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("操作失败");
                }
            });
        },

        //日志翻页
        freshSearchLog : function(e)
        {
            if("number" == typeof(e))
            {
                if(0 == e)
                {
                    var node = $("#logPage li.active").find("a");
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
            var pageid =  $("#search-category-l1  option:selected").val();
            var keyword =  $("#searchParam").val();

            $.ajax({
                url:'/templatemanage/get_page_log',// 跳转到 action
                data:
                {
                    pgid : pageid,
                    count : constant.PAGE_LEN,
                    page : page,
                    keyword : keyword
                },
                type:'post',
                success:function(data)
                {
                    $("#log").html(data);

                    $("a[name='showLog']").click(evts.showLog);

                    $('#logPage a').click(evts.freshSearchLog);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("操作失败");
                }
            });
        },

        showTemp : function()
        {
            var pageid =  $("#search-category-l1  option:selected").val();

            $("#errInfo").attr('style', 'position:absolute; z-index: 1000; display:none');

            if(pageid == "" || pageid == null)
            {
                bootbox.alert("请先选择页面");
                return false;
            }

            $.ajax({
                url:'/templatemanage/get_sys_template',// 跳转到 action
                data:{
                    pgid : pageid,
                    count : 5
                },
                type:'post',
                success:function(data)
                {
                    $("#selectTemplate").html(data);
                    $('input:radio[name="template"]').click(evts.selTemp);
                    $('a[name="linkPic"]').click(evts.selTempPic);
                    $("#myModalDiv").modal('show');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("操作失败");
                }
            });
        },

        confirmPublishPage : function()
        {
            var state = $(this).parent("div").find("input").attr("state");
            var layoutid =  $(this).parent("div").find("input").attr("layoutid");

            if(state == "3")
            {
                evts.publishPage(layoutid);
            }
            else
            {
                bootbox.setLocale("zh_CN");
                bootbox.confirm('当前页面模板数据不完整，建议完成数据填充后再发布，或及时补填数据，否则APP的当前页面显示不完整', function(result)
                {
                    if(result)
                    {
                        evts.publishPage(layoutid);
                    }
                });
            }
        },

        publishPage:function(layoutid)
        {
            $.ajax({
                url:'/templatemanage/publish_template',// 跳转到 action
                data:{
                    layout_tmpl_id : layoutid
                },
                type:'post',
                success:function(data)
                {
                    if(data.e.code != 0)
                    {
                        bootbox.alert("操作失败");
                    }
                    else
                    {
                        evts.freshSearchTemp(0);
                        bootbox.alert("发布成功");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("操作失败");
                }
            });
        },

        editPage : function()
        {
            var pageid =  $(this).parent("div").find("input").attr("pageid");
            var pagename = $(this).parent("div").find("input").attr("alias");
            var templateid =  $(this).parent("div").find("input").attr("tempid");
            var layoutid =  $(this).parent("div").find("input").attr("layoutid");

            evts.remain();

            var page;
            var node = $("#tempPage li.active").find("a");
            if(0 != node.length)
            {
                page = node.attr("href").split("=")[1];
            }
            else
            {
                page = 1;
            }

            location.href = '/templatemanage/make_template_config?pageid='
                + pageid + '&templateid=' + templateid + '&layoutid=' + layoutid + "&pagename=" + pagename;
        },

        confirmDelPage : function()
        {
            var item = $(this).parent("div").find("input");
            var state =  item.attr("state");
            var layoutid = item.attr("layoutid");

            var needConfirm = true;

            var text = "";
            if(state == '4')
                text = "当前页面模板已发布，建议发布新模板后再删除当前模板，或者删除操作后请及时发布新模板，否则APP当前页面将显示为空白页";
            else if(state != 1)
                text = "当前页面已填充数据，请确认是否删除";
            else
                needConfirm = false;

            if(needConfirm)
            {
                bootbox.setLocale("zh_CN");
                bootbox.confirm(text, function(result)
                {
                    if(result)
                    {
                        evts.delPage(layoutid);
                    }
                });
            }
            else
            {
                evts.delPage(layoutid);
            }
        },

        delPage : function(layoutid)
        {
            $.ajax({
                url:'/templatemanage/del_template',// 跳转到 action
                data:
                {
                    layout_tmpl_id : layoutid
                },
                type:'post',
                success:function(data)
                {
                    if(data.e.code != 0)
                    {
                        bootbox.alert("操作失败");
                    }
                    else
                    {
                        evts.freshSearchTemp(0);
                        bootbox.alert("删除成功");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("操作失败");
                }
            });
        },

        searchPage : function()
        {
            evts.freshSearchTemp(1);
            evts.freshSearchLog(1);

            evts.remain();
        },

        previewPage : function()
        {
            var templateid =  $(this).parent("div").find("input").attr("layoutid");

            $.ajax({
                url:'/templatemanage/get_user_page_module',// 跳转到 action
                data:{
                    layout_tmpl_id : templateid
                },
                type:'post',
                success:function(data)
                {
                    $("#divShowPhone").empty();
                    if(data.e.code == 0)
                    {
                        var rdata = data.data;
                        var count = rdata.length;
                        var item = "";
                        for(var i = 0; i < count; i++)
                        {
                            item += "<img style='width: 100%' src='";
                            item += rdata[i].thumb;
                            item += "' />";

                            if(rdata[i].module_tmpl_name != 'mod_banner')
                            {
                                var itemCount = rdata[i].show_item
                                var cell = rdata[i].thumb_cell;
                                for(var j = 0; j < itemCount - 1; j++)
                                {
                                    item += "<img style='width: 100%' src='";
                                    item += cell;
                                    item += "' />";
                                }
                            }
                        }

                        $("#divShowPhone").append(item);
                        $("#showPhone").modal('show');
                    }
                    else
                    {
                        bootbox.alert("操作失败");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("操作失败");
                }
            });
        },

        showLog : function()
        {
            var trNum = $(this).closest("tr").index() + 1;
            var txt = $('#tabInfo').find('tr:eq(' + (trNum) + ')').find('td:eq(1)').text();
            $("#inpTemplName").attr('value', txt);

            var txt = $('#tabInfo').find('tr:eq(' + (trNum) + ')').find('td:eq(2)').text();
            $("#inpPageName").attr('value', txt);

            var txt = $('#tabInfo').find('tr:eq(' + (trNum) + ')').find('td:eq(3)').text();
            $("#inpAppVer").attr('value', txt);

            var txt = $('#tabInfo').find('tr:eq(' + (trNum) + ')').find('td:eq(4)').text();
            $("#inpOperator").attr('value', txt);

            var txt = $('#tabInfo').find('tr:eq(' + (trNum) + ')').find('td:eq(5)').text();
            $("#inpCreateTime").attr('value', txt);

            var txt = $('#tabInfo').find('tr:eq(' + (trNum) + ')').find('td:eq(6)').find('span').text();
            $("#inpOperateType").attr('value', txt);

            var txt = $('#tabInfo').find('tr:eq(' + (trNum) + ')').find('td:eq(7)').attr('title');
            $("#inpOperateInfo").val(txt);

            $("#divLog").modal('show');
        },

        remain:function()
        {
            var appversion = $("#search-category-l2  option:selected").val();
            var pageid = $("#search-category-l1  option:selected").val();
            var keyword = $("#searchParam").val();

            document.cookie = "templateappversion=" + appversion;
            document.cookie = "templatepageid=" + pageid;
            document.cookie = "templatekeyword=" + keyword;
        },

        loadHistory:function()
        {
            $("#myModalDiv").modal('hide');

            var appversion = evts.getCookie('templateappversion')
            if (appversion != null && appversion != "")
            {
                $("#search-category-l2").val(appversion);
            }
            var pageid = evts.getCookie('templatepageid')
            if (pageid != null && pageid != "")
            {
                $("#search-category-l1").val(pageid);
            }
            var keyword = evts.getCookie('templatekeyword')
            if (keyword != null && keyword != "")
            {
                $("#searchParam").val(keyword);
            }

            document.cookie = "templateappversion=";
            document.cookie = "templatepageid=";
            document.cookie = "templatekeyword=";
        },
        getCookie:function(c_name)
        {
            if (document.cookie.length>0)
            {
                c_start=document.cookie.indexOf(c_name + "=")
                if (c_start!=-1)
                {
                    c_start=c_start + c_name.length + 1;
                    c_end=document.cookie.indexOf(";",c_start);
                    if (c_end == -1)
                        c_end = document.cookie.length
                    return document.cookie.substring(c_start,c_end);
                }
            }
            return "";
        }
    };

    var bindEvents = function()
    {
        $('#myTab a').click(evts.changeTab);
        //$('#search-category-l1').on('change', evts.selPageName);
        $('#search-category-l2').on('change',evts.selAppVer);
        $('input:radio[name="template"]').click(evts.selTemp);
        $('#useTemplate').click(evts.chooseTemp);
        $("#myModalBtn").click(evts.showTemp);
        $("a[name='publishPage']").click(evts.confirmPublishPage);
        $("a[name='editPage']").click(evts.editPage);
        $("a[name='previewPage']").click(evts.previewPage);
        $("a[name='delPage']").click(evts.confirmDelPage);
        $("a[name='showLog']").click(evts.showLog);
        $("#btnSearch").click(evts.searchPage);

        $("#tempPage a").click(evts.freshSearchTemp);
        $("#logPage a").click(evts.freshSearchLog);
    };

    var init = function()
    {
        bindEvents();

        evts.loadHistory();

        evts.freshSearchTemp(1);
        evts.freshSearchLog(1);
    };

    init();
});
