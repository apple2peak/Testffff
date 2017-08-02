/**
 * Created by renhong on 2016/9/22.
 */
function showdiffnode(is_succs) {
    if(is_succs==1){
        StandardPost("/comparelog/log", {"data": succData,"view":1,"newIp":newip,"oldIp":oldip});
    }
    if(is_succs==0){
        StandardPost("/comparelog/log", {"data": failData,"view":0,"newIp":newip,"oldIp":oldip});
    }
}
function logsave() {
    if (succData == undefined && failData == undefined) {
        bootbox.alert("没有运行结果");
    }
    var data = {};
    data["sucdata"] = succData!=undefined ? succData : "";
    data["faildata"] = failData!=undefined ? failData : "";
    data["casenum"] = casenum;
    data["failnum"] = fail;
    data["timeoutnum"] = timeoutnum;
    data["rightnum"] = casenum-fail;
    data["usetime"] = usetime;
    data["starttime"] = starttime;
    data["endtime"] = endtime;
    data["oldip"] = oldip;
    data["newip"] = newip;
    data["title"] = $('#difftitle').val();
    // alert(data);
    $.ajax({
        url: '/comparelog/add_log',
        type: 'post',
        dataType: 'text',
        data: data,
        success: function (result) {
            if (result == 1) {
                $('#add-project').modal('hide');
                bootbox.alert("保存成功");
                setTimeout(function () {
                   location.reload();
                }, 3000);
            } else {
                bootbox.alert("保存失败,error=" + result);
            }
        },
        error: function (result) {
            bootbox.alert("保存失败,error=" + result);
        }
    });
}
function logdel(logid) {
    var data = {};
    data["logid"] = logid;
    event.preventDefault();//这行代码就是用来阻止默认行为发生，防止异步的关键
    bootbox.confirm("你确定要删除该条记录？", function (confirmed) {
        if (confirmed == true) {
            $.ajax({
                url: '/comparelog/logdel',
                type: 'get',
                dataType: 'text',
                data: data,
                success: function (result) {
                    if (result == 1) {
                        //bootbox.alert("删除成功");
                        setTimeout(function () {
                            location.reload();
                        }, 500);
                    } else {
                        bootbox.alert("删除失败,error:" + result);
                    }
                },
                error: function (result) {
                    bootbox.alert("删除失败,error:" + result);
                }
            });
        }
    });
}
function StandardPost(url, args) {
    var form = $("<form method='post' target='_blank'></form>");
    form.attr({"action": url});
    for (arg in args) {
        var input = $("<input type='hidden'>");
        input.attr({"name": arg});
        input.val(args[arg]);
        form.append(input);
    }
    form.submit();
}