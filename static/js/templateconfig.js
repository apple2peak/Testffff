/**
 * Created with JetBrains PhpStorm.
 * User: V10103366
 * Date: 15-7-4
 * Time: 上午10:09
 * To change this template use File | Settings | File Templates.
 */

var replace = 0;
var modules = "";

$(function()
{
    /**
     * 拖拽效果
     */
    $('.dd').nestable();

    $('#nestable').nestable().on('change', function()
    {
        var r = $('.dd').nestable('serialize');
    });

    /**
     * 获取被拖动的元素
     */
    $('li[name="moduleId"]').mousedown(function()
    {
        getMovedItem($(this));
    });

    $('.dd-handle a').on('mousedown', function(e)
    {
        e.stopPropagation();
    });

    /**
     * 删除被选中元素
     */
    $('a[name="delItem"]').click(function()
    {
        var item = $(this);
        var inp = item.closest("li").find("input");

        if(inp.attr("ready") == 1)
        {
            bootbox.setLocale("zh_CN");

            bootbox.confirm('该组件已填充数据，是否继续删除？', function(result)
            {
                if(result)
                {
                    delItem(item);
                }
            });
        }
        else
        {
            delItem(item);
        }
    });

    $("#btnAddModule").click(function()
    {
        $("#divAddModule").show();
    });

    $("button[name='btnComponent']").click(function()
    {
        if($(".dd-list").find('li').length >= 10)
        {
            bootbox.alert("每个页面最多只能添加10个组件！");
            return false;
        }
        if($(".dd-list").find('li').length == 0)
        {
            if($(this).attr("comName") == 'mod_banner')
            {
                $("#bannerModuleName").val($(this).attr("comDesc"));
                $("#bannerLineNum").val(1);

                $("#banner").show();
                $("#other").hide();
            }
            else
            {
                $("#otherModuleName").val($(this).attr("comDesc"));
                $("#otherLineNum").val(1);
                $("#more").val(0);
                $("#title").val(0);

                $("#banner").hide();
                $("#other").show();
            }
        }

        var img = $(this).find("img").attr("src");

        var item = '<li name="moduleId" onmousedown="getMovedItem($(this));" class="dd-item" data-id="'+ $(this).attr("id") + '">';
        item += '<div class="dd-handle action-buttons" style="height: 150px">';
        item += '<img style="width:85%;height:100%;" src = "' + img + '"/>';
        item += '<a class="red pull-right" name="delItem" onmousedown="event.stopPropagation();" onclick="delItem($(this));"><i class="pull-right icon-trash bigger-130"></i></a>';
        if($(".dd-list").find('li').length == 0)
        {
            item += "<i name='edit' class='pull-right bigger-130 icon-edit orange2'></i>";
        }
        item += '</div><input type="hidden" comDesc="' + $(this).attr("comDesc") + '" layout_mod_tmpl_id="" inpTitle="" ';
        item += 'thumb_cell="' + $(this).attr("thumb_cell") + '" ';
        item += 'ready="0" title="0" more="0" linenum="1" name="' + $(this).attr("comName") + '"></li>';

        $(".dd-list").append(item);
    });


    /**
     * 验证分屏数量
     */
    $("#otherLineNum").keyup(function()
    {
        function disableBtn(info)
        {
            $("#btnSave").attr("disabled", "disabled");
            $("#btnPreview").attr("disabled", "disabled");

            $("#otherInputDiv").attr("class", "control-group error");
            $("#otherInputLbl").attr("for", "inputError");
            $("#otherInputSpan").text(info);
        }
        function enableBtn()
        {
            $("#btnSave").removeAttr("disabled");
            $("#btnPreview").removeAttr("disabled");

            $("#otherInputDiv").attr("class", "control-group info");
            $("#otherInputLbl").attr("for", "inputInfo");
            $("#otherInputSpan").text("");
        }
        var reg = /^[0-9]*[1-9][0-9]*$/;
        var value = $(this).val();
        var isFail = true;
        if(!reg.test(value))
        {
            disableBtn("请输入正整数！");
            return;
        }
        if($(this).val() < 1)
        {
            disableBtn("行数不得少于1！");
        }
        else if($(this).val() > 100)
        {
            disableBtn("行数不得超过100！");
        }
        else
        {
            isFail = false;
            enableBtn();
        }

        $("li[name='moduleId']").each(function()
        {
            if($(this).find('i[name="edit"]').length != 0)
            {
                if(!isFail)
                {
                    $(this).children("input").attr("linenum", $("#otherLineNum").val());
                }
            }
        });
    });

    $('#more').on('change', function()
    {
        $("li[name='moduleId']").each(function()
        {
            if($(this).find('i[name="edit"]').length != 0)
            {
                $(this).children("input").attr("more", $("#more option:selected").val());
            }
        });
    });

    $('#title').on('change', function()
    {
        $("li[name='moduleId']").each(function()
        {
            if($(this).find('i[name="edit"]').length != 0)
            {
                $(this).children("input").attr("title", $("#title option:selected").val());
            }
        });
        if($("#title option:selected").val() == "0")
        {
            $("#inpTitle").hide();
            $("#inpTitle").val("");
        }
        else
        {
            $("#inpTitle").show();
        }
    });

    $("#inpTitle").keyup(function()
    {
        var txt = $.trim($("#inpTitle").val());
        if(txt.length > 24)
        {
            $("#titleDiv").attr("class", "control-group error mt-30");
            $("#titleLbl").attr("for", "inputError");
            $("#spnTitle").text("最大长度不能超过24个字符！");

            $("#btnSave").attr("disabled", "disabled");
            return false;
        }
        else if(txt.length < 1)
        {
            $("#titleDiv").attr("class", "control-group error mt-30");
            $("#titleLbl").attr("for", "inputError");
            $("#spnTitle").text("请录入标题！");

            $("#btnSave").attr("disabled", "disabled");
            return false;
        }

        $("#btnSave").removeAttr("disabled");
        $("#titleDiv").attr("class", "control-group info mt-30");
        $("#titleLbl").attr("for", "inputInfo");
        $("#spnTitle").text("");

        $("li[name='moduleId']").each(function()
        {
            if($(this).find('i[name="edit"]').length != 0)
            {
                $(this).children("input").attr("inpTitle", txt);
            }
        });
    });

    $("#bannerLineNum").keyup(function()
    {
        function disableBtn(info)
        {
            $("#btnSave").attr("disabled", "disabled");
            $("#btnPreview").attr("disabled", "disabled");

            $("#inputDiv").attr("class", "control-group error");
            $("#inputLbl").attr("for", "inputError");
            $("#inputSpan").text(info);
        }
        function enableBtn()
        {
            $("#btnSave").removeAttr("disabled");
            $("#btnPreview").removeAttr("disabled");

            $("#inputDiv").attr("class", "control-group info");
            $("#inputLbl").attr("for", "inputInfo");
            $("#inputSpan").text("");
        }
        var reg = /^[0-9]*[1-9][0-9]*$/;
        var value = $(this).val();
        var isFail = true;
        if(!reg.test(value))
        {
            disableBtn("请输入正整数！");
            return;
        }
        if($(this).val() < 1)
        {
            disableBtn("分屏数不得少于1！");
        }
        else if($(this).val() > 8)
        {
            disableBtn("分屏数不得超过8！");
        }
        else
        {
            isFail = false;
            enableBtn();
        }

        $("li[name='moduleId']").each(function()
        {
            if($(this).find('i[name="edit"]').length != 0)
            {
                if(!isFail)
                {
                    $(this).children("input").attr("linenum", $("#bannerLineNum").val());
                }
            }
        });
    });

    $("#btnPreview").click(function()
    {
        $("#showPhone").modal('show');
        $("#divShowPhone").empty();

        $("li[name='moduleId']").each(function()
        {
            var count = $(this).children("input").attr("linenum");
            var img = $(this).find("img").attr("src");

            var item = "<div><img style='width: 100%' src='";
            item += img;
            item += "' />";

            if($(this).children("input").attr("name") != 'mod_banner')
            {
                var cell = $(this).children("input").attr("thumb_cell");
                for(var i = 0; i < count - 1; i++)
                {
                    item += "<img style='width: 100%' src='";
                    item += cell;
                    item += "' />";
                }
            }
            item += "</div>";
            $("#divShowPhone").append(item);
        });
    });

    //模板名称修改
    $("#templName").keyup(function()
    {
        var txt = $.trim($(this).val());
        if(txt.length > 24)
        {
            $("#templNameDiv").attr("class", "control-group error");
            $("#templNameLbl").attr("for", "inputError");
            $("#templNameSpan").text("最大长度不能超过24个字符");

            $("#btnSave").attr("disabled", "disabled");
            return false;
        }
        else if(txt.length < 1)
        {
            $("#templNameDiv").attr("class", "control-group error");
            $("#templNameLbl").attr("for", "inputError");
            $("#templNameSpan").text("请录入模板名称");
            $("#btnSave").attr("disabled", "disabled");

            return false;
        }
        $("#templNameDiv").attr("class", "control-group info");
        $("#templNameLbl").attr("for", "inputInfo");
        $("#templNameSpan").text("");
        $("#btnSave").removeAttr("disabled");

        $("#conTemplName").val(txt);
    });

    //模板名称确认
    $("#conTemplName").keyup(function()
    {
        var txt = $.trim($("#conTemplName").val());
        if(txt.length > 24)
        {
            $("#conTemplDiv").attr("class", "control-group error");
            $("#conTemplLbl").attr("for", "inputError");
            $("#conTemplSpan").text("最大长度不得超过24个字符！");

            return false;
        }
        else if(txt.length < 1)
        {
            $("#conTemplDiv").attr("class", "control-group error");
            $("#conTemplLbl").attr("for", "inputError");
            $("#conTemplSpan").text("请录入模板名称！");

            return false;
        }
        $("#conTemplDiv").attr("class", "control-group info");
        $("#conTemplLbl").attr("for", "inputInfo");
        $("#conTemplSpan").text("");

        $("#templName").val(txt);
    });

    $("#btnSave").click(function()
    {
        var txt = $.trim($("#templName").val());
        if(txt == "")
        {
            $("#templNameDiv").attr("class", "control-group error");
            $("#templNameLbl").attr("for", "inputError");
            $("#templNameSpan").text("请录入模板名称！");
            return false;
        }
        if(txt.length > 24)
        {
            $("#templNameDiv").attr("class", "control-group error");
            $("#templNameLbl").attr("for", "inputError");
            $("#templNameSpan").text("模板名称不能长于24个字符！");
            return false;
        }
        if($("#title option:selected").val() == "1")
        {
            txt = $.trim($("#inpTitle").val());
            if(txt == "")
            {
                $("#titleDiv").attr("class", "control-group error");
                $("#titleLbl").attr("for", "inputError");
                $("#spnTitle").text("请录入标题！");
                return false;
            }
            if(txt.length > 24)
            {
                $("#titleDiv").attr("class", "control-group error");
                $("#titleLbl").attr("for", "inputError");
                $("#spnTitle").text("标题不能长于24个字符！");
                return false;
            }
        }

        $("#btnSave").attr("disabled", "disabled");

        var i = 0;
        modules = "[";

        $("li[name='moduleId']").each(function()
        {
            i++;
            var module = new Object();
            var num = Math.random().toString();
            var tmp = new Date().getTime() + num;
            module.layout_mod_tmpl_id = $(this).children("input").attr("layout_mod_tmpl_id");
            module.name = hex_md5(tmp);
            module.sn = i;
            module.mod_tmpl_id = $(this).attr("data-id");
            module.show_items = $(this).children("input").attr("linenum");
            module.is_more = $(this).children("input").attr("more");
            module.is_show_title = $(this).children("input").attr("title");
            module.title = $(this).children("input").attr("inpTitle");

            if($(this).children("input").attr("name") == "mod_banner")
                module.is_top = "1";
            else
                module.is_top = "0";

            modules += JSON.stringify(module) + ",";
        });
        modules = modules.substr(0, modules.length - 1);
        modules += "]";
        if(i == 0)
        {
            bootbox.alert("请添加组件！");
            $("#btnSave").removeAttr("disabled");
            return false;
        }

        if($("#layoutid").val() != "")
        {
            $.ajax({
                url:'/templatemanage/get_user_page_module',// 跳转到 action
                data:
                {
                    layout_tmpl_id:$("#layoutid").val()
                },
                type:'post',
                success:function(data)
                {
                    if(data.e.code == 0)
                    {
                        var rdata = data.data
                        if(rdata.length == i)
                        {
                            replace = 1;
                            $("li[name='moduleId']").each(function()
                            {
                                if($(this).children("input").attr("layout_mod_tmpl_id") == "")
                                {
                                    replace = 0;
                                    return false;
                                }
                            });
                        }
                        if(replace == 1)
                        {
                            $("#saveUpdate").modal('show');
                        }
                        else
                        {
                            $("#saveNewFromUser").modal('show');
                        }
                    }
                    else
                    {
                        bootbox.alert("出错了，请稍后重试！");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    bootbox.alert("出错了，请稍后重试！");
                }
            });
        }
        else
        {
            replace = 0;
            $("#saveNewFromSys").modal('show');
        }
    });

    $("#btnNewFromUser").click(function()
    {
        var txt = $.trim($("#conTemplName").val());
        if(txt == "")
        {
            $("#conTemplDiv").attr("class", "control-group error");
            $("#conTemplLbl").attr("for", "inputError");
            $("#conTemplSpan").text("请录入新模板名称！");
            return false;
        }
        if(txt.length > 24)
        {
            $("#conTemplDiv").attr("class", "control-group error");
            $("#conTemplLbl").attr("for", "inputError");
            $("#conTemplSpan").text("最大长度不得超过24个字符！");
            return false;
        }
        $("#saveNewFromUser").modal('hide');
        sendDataToSave();
    });
    $("#btnUpdate").click(function()
    {
        $("#saveUpdate").modal('hide');
        sendDataToSave();
    });
    $("#btnNewFromSys").click(function()
    {
        $("#saveNewFromSys").modal('hide');
        sendDataToSave();
    });

    $("button[name='btnCancelNewFromUser']").click(function()
    {
        $("#saveNewFromUser").modal('hide');
        $("#btnSave").removeAttr("disabled");
    });
    $("button[name='btnCancelUpdate']").click(function()
    {
        $("#saveUpdate").modal('hide');
        $("#btnSave").removeAttr("disabled");
    });
    $("button[name='btnCancelNewFromSys']").click(function()
    {
        $("#saveNewFromSys").modal('hide');
        $("#btnSave").removeAttr("disabled");
    });

    function sendDataToSave()
    {
        var alias = $.trim($("#conTemplName").val());

        $("#saveModal").modal('show');

        var name = hex_md5(new Date().getTime() + Math.random().toString());

        $.ajax({
            url:'/templatemanage/create_template',// 跳转到 action
            data:{
                id:$("#layoutid").val(),
                name:name,
                alias:alias,
                pgid:$("#pageid").val(),
                tmpl_id:$("#templateid").val(),
                mod_tmpls:modules,
                is_replace : replace
            },
            type:'post',
            success:function(data)
            {
                if(data.e.code == 0)
                {
                    $("#saveModal").modal('hide');
                    $("#successModal").modal('show');
                }
                else
                {
                    $("#saveModal").modal('hide');
                    $("#failModal").modal('show');
                    $("#btnSave").removeAttr("disabled");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                $("#failModal").modal('show');
                $("#saveModal").modal('hide');
                $("#btnSave").removeAttr("disabled");
            }
        });
    }

    $("#btnBack").click(function()
    {
        location.href = '/templatemanage/init_template';
        //window.history.back(-1);
    });
});


/**
 * 获取被拖动的元素
 */
function getMovedItem(item)
{
    $("li[name='moduleId']").each(function()
    {
        if($(this).find('i[name="edit"]').length != 0)
        {
            $(this).find('i[name="edit"]').remove();
        }
    });

    var icon = "<i name='edit' class='pull-right bigger-130 icon-edit orange2'></i>";
    item.children("div").append(icon);

    if(item.children("input").attr("name") == 'mod_banner')
    {
        $("#bannerModuleName").val(item.children("input").attr("comDesc"));
        $("#bannerLineNum").val(item.children("input").attr("linenum"));

        $("#banner").show();
        $("#other").hide();
    }
    else
    {
        $("#otherModuleName").val(item.children("input").attr("comDesc"));
        $("#otherLineNum").val(item.children("input").attr("linenum"));
        $("#more").val(item.children("input").attr("more"));
        $("#title").val(item.children("input").attr("title"));
        $("#inpTitle").val(item.children("input").attr("inpTitle"));

        if(item.children("input").attr("title") == "1")
        {
            $("#inpTitle").show();
        }
        else
        {
            $("#inpTitle").hide();
        }

        $("#banner").hide();
        $("#other").show();
    }
}
/**
 * 删除被选中元素
 */
function delItem(item)
{
    item.closest("li").remove();

    var isExists = false;

    $("li[name='moduleId']").each(function()
    {
        if($(this).find('i[name="edit"]').length != 0)
        {
            isExists = true;
        }
    });

    if(!isExists && $("li[name='moduleId']").length > 0)
    {
        var editItem = $("li[name='moduleId']").first().children("input");
        var icon = "<i name='edit' class='pull-right bigger-130 icon-edit orange2'></i>";
        $("li[name='moduleId']").first().children("div").append(icon);

        if(editItem.attr("name") == 'mod_banner')
        {
            $("#bannerModuleName").val(editItem.attr("comDesc"));
            $("#bannerLineNum").val(editItem.attr("linenum"));

            $("#banner").show();
            $("#other").hide();
        }
        else
        {
            $("#otherModuleName").val(editItem.attr("comDesc"));
            $("#otherLineNum").val(editItem.attr("linenum"));
            $("#more").val(editItem.attr("more"));
            $("#title").val(editItem.attr("title"));
            $("#inpTitle").val(editItem.attr("inpTitle"));

            if(editItem.attr("title") == "1")
            {
                $("#inpTitle").show();
            }
            else
            {
                $("#inpTitle").hide();
                $("#inpTitle").val("");
            }

            $("#banner").hide();
            $("#other").show();
        }
    }
}