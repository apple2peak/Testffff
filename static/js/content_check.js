$(function(){
   $('#create_time').datepicker({autoclose:true});

   $("#submit_ncomment").click(function(){  //筛选按钮
		var type = $('#type').val();
        var time = $('#create_time').val();
		
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/ncommentcheck', 
                        'data': {status:1, time:time, type:type},  
                        'success':function(data){
                            $('#comment').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });
    $("#submit_ncomment").trigger("click");

    $("#submit_hcomment").click(function(){  //筛选按钮
        var type = $('#type').val();
        var time = $('#create_time').val();

        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/hcommentcheck', 
                        'data': {status:0, time:time, type:type},  
                        'success':function(data){
                            $('#comment').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });
    $("#submit_hcomment").trigger("click");

    $("#submit_nmessage").click(function(){  //筛选按钮
        var type = $('#type').val();
        var time = $('#create_time').val();
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/nmessagecheck', 
                        'data': {type:type, time:time},
                        'success':function(data){
                            $('#message').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });
    $("#submit_nmessage").trigger("click");

    $("#submit_hmessage").click(function(){  //筛选按钮
        var type = $('#type').val();
        var time = $('#create_time').val();
        var msg_title = $('#msg_title').val();
        //alert(msg_title);
        if(msg_title == ''){
            $.ajax({
                        'type':'post',
                        'url':'/checkmanage/hmessagecheck', 
                        'data': {type:type, time:time},
                        'success':function(data){
                            $('#message').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
        }else{
            $.ajax({
                        'type':'post',
                        'url':'/checkmanage/hmessagecheck_bytitle', 
                        'data': {type:type, time:time,msg_title:msg_title},
                        'success':function(data){
                            $('#message').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
        }
        
    });
    $("#submit_hmessage").trigger("click");

    $('body').on('click', '#check_message_submit', function(){
        var data = new Array();
        var item = new Object();
        $('tbody.message tr').each(function(){
            item = new Object();
            item.msgid = $(this).attr('data-msgid');
            //alert($(this).find('td').eq(4).find('input[name=option_'+item.msgid+']:checked').val());
            // item.status = ($(this).find('td').eq(4).find('input[name=option_'+item.msgid+']:checked').val() ==0) ? 2 : 6;  //2:不作限制即正常  6：采取措施即受限

            // item.is_blocked = $(this).find('td').eq(4).find('input[name=block_message]').is(":checked") ? 1 : 0;
            // item.shut_comment = $(this).find('td').eq(4).find('input[name=block_comment]').is(":checked") ? 1 : 0;
            // item.shut_like = $(this).find('td').eq(4).find('input[name=block_like]').is(":checked") ? 1 : 0;   
            // item.shut_transmit = $(this).find('td').eq(4).find('input[name=block_transmit]').is(":checked") ? 1 : 0;   //1:禁止  0：通过
            // item.shut_favorite = $(this).find('td').eq(4).find('input[name=block_favorite]').is(":checked") ? 1 : 0;
            item.status = $(this).find('td').eq(5).find('input[name=option_'+item.msgid+']:checked').val();
           // alert($(this).find('td').eq(5).find('input[name=option_'+item.msgid+']:checked').val());
            data.push(item);
        });
        //console.log(data);
        data = JSON.stringify(data);
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/submit_message_check', 
                        'data': {'data':data},  
                        'success':function(data){
                            $('#message').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $('body').on('click', '#check_comment_submit', function(){
        //alert("tt");
        var data = new Array();
        var item = new Object();
        var auth = 0;
        var reply = 0;
        var like = 0;
        $('tbody.comment tr').each(function(){
            item = new Object();
            item.id = $(this).attr('data-commentid');

            // if($(this).find('td').eq(4).find('input[name=option_'+item.id+']:checked').val() ==0){ //不作处理，即正常
            //     item.status = 1;
            //     item.auth = 0;
            // }else{
            //     if($(this).find('td').eq(6).find('input[name=block_comment]').is(":checked") )
            //         item.status = 2;
            //     if($(this).find('td').eq(6).find('input[name=block_reply]').is(":checked"))
            //         auth = auth | 1;
            //     if($(this).find('td').eq(6).find('input[name=block_like]').is(":checked"))
            //         auth = auth | 2;
            //     item.auth = auth;
            // }
            item.status = $(this).find('td').eq(6).find('input[name=option_'+item.id+']:checked').val();
           
            data.push(item);
        });
        //console.log(data);
        data = JSON.stringify(data);
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/submit_comment_check', 
                        'data': {'content':data},  
                        'success':function(data){
                            $('#comment').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    // $('body').on('change', 'input[type=radio]', function(){
    //     if($(this).val() ==1){  //采取措施，需要使checkbox可选
    //         $(this).parent().parent().find('input[type=checkbox]').removeAttr("disabled");
    //     }else{
    //         $(this).parent().parent().find('input[type=checkbox]').attr("disabled",true);
    //         $(this).parent().parent().find('input[type=checkbox]').attr("checked", false);
    //     }
    // });

    $('body').on('click', '#message_page a', function(e){
        e.preventDefault();//阻止a链接的跳转行为         
        var pg = $(this).attr("href").split("=")[1];

        var type = $("#type").val();
        var time = $('#create_time').val();

        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/hmessagecheck', 
                        'data': {'status':0, page:pg, time:time, type:type},  
                        'success':function(data){
                            $('#message').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $('body').on('click', '#message_page_bytitle a', function(e){
        e.preventDefault();//阻止a链接的跳转行为         
        var pg = $(this).attr("href").split("=")[1];
        var skip = (pg-1)*10;
        var type = $("#type").val();
        var time = $('#create_time').val();
        var msg_title = $('#msg_title').val();
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/hmessagecheck_bytitle', 
                        'data': {'status':0, skip:skip, time:time, msg_title:msg_title, type:type},  
                        'success':function(data){
                            $('#message').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $('body').on('click', '#comment_page a', function(e){
        e.preventDefault();//阻止a链接的跳转行为         
        var pg = $(this).attr("href").split("=")[1];
        var type = $("#type").val();
        var time = $('#create_time').val();

        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/hcommentcheck', 
                        'data': {'status':0, page:pg, time:time, type:type},  
                        'success':function(data){
                            $('#comment').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $('body').on('click', '.msg-check-button', function(e){
        e.preventDefault();//阻止a链接的跳转行为         
        var status = $(this).attr("data-status");
        var msgid = $(this).parent().parent().attr("data-msgid");
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/msgcheckdialog', 
                        'data': {'status':status, msgid:msgid},  
                        'success':function(html){
                            $('.main-container').append(html); //向网页增加窗口
                
                            $('#msg_check_' + msgid).modal('show'); //显示窗口
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $('body').on('click', '#submit_msg_dialog', function(e){
        e.preventDefault();//阻止a链接的跳转行为  
        var msgid = $(this).attr("data-msgid");
        var status = $('input[name=option_'+msgid+']:checked').val();
        var text = ''
        if(status ==1)
            text = '<span class="label label-success">通过</span>';
        if(status ==3)
            text = '<span class="label label-important">屏蔽</span>';
        
        //alert(status);
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/msgcheckdialog_submit', 
                        'data': {'status':status, msgid:msgid},  
                        'success':function(data){
                            //if(data.e.code ==0)
                               $('tr[data-msgid=' + msgid + ']').find('td').eq(5).html(text);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $('body').on('click', '.comment-check-button', function(e){
        e.preventDefault();//阻止a链接的跳转行为         
        var status = $(this).attr("data-status");
        var commentid = $(this).parent().parent().attr("data-commentid");
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/comcheckdialog', 
                        'data': {'status':status, commentid:commentid},  
                        'success':function(html){
                            $('.main-container').append(html); //向网页增加窗口
                
                            $('#com_check_' + commentid).modal('show'); //显示窗口
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $('body').on('click', '#submit_com_dialog', function(e){
        e.preventDefault();//阻止a链接的跳转行为  
        var commentid = $(this).attr("data-comid");
        var status = $('input[name=option_'+commentid+']:checked').val();
        var text = ''
        if(status ==1)
            text = '<span class="label label-success">通过</span>';
        if(status ==3)
            text = '<span class="label label-important">屏蔽</span>';

        var data = new Array();
        var item = new Object();

        item.id = commentid;
        item.status = status;
           
        data.push(item);
        data = JSON.stringify(data);
        //alert(status);
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/comcheckdialog_submit', 
                        'data': {'content':data},  
                        'success':function(data){
                            //if(data.e.code ==0)
                               $('tr[data-commentid=' + commentid + ']').find('td').eq(6).html(text);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });


});