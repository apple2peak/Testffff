$(function(){
   
   $('#create_time').datepicker({autoclose:true});
   //筛选
   $("#submit").click(function(){
   		var begin = $('#create_time').val();

		var end = '';
		var status = $('#st').val();
        var reg_area = $('#reg_area').val();
		var nick = $("#nick").val();
		$.ajax({
                        'type':'post',
                        'url':'/usermanage/search', 
                        'data': {begin:begin, end:end, status:status, reg_area:reg_area, nick:nick},  
                        'success':function(data){
                            $('#basic').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });

		$.ajax({
                        'type':'post',
                        'url':'/usermanage/search2', 
                        'data': {begin:begin, end:end, status:status,  reg_area:reg_area, nick:nick},  
                        'success':function(data){
                            $('#relative').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });
    $("#submit").trigger("click");
   
    $('body').on('click','#user_page a', function(e){
        e.preventDefault();//阻止a链接的跳转行为         
        var pg = $(this).attr("href").split("=")[1];
        var opg = $("#user_rel_page li.active a").attr("href").split("=")[1];

        var begin = $('#create_time').val();
        var reg_area = $('#reg_area').val();
        var end = '';
        var status = $('#st').val();
        var nick = $('#nick').val();
        var skip = (pg-1) * 10;

        $.ajax({
                            'type':'post',
                            'url':'/usermanage/search', 
                            'data': {begin:begin, end:end, status:status, reg_area:reg_area, nick:nick, skip:skip},  
                            'success':function(data){
                                $('#basic').html(data);
                                if(pg != opg)
                                    $('#user_rel_page a[href="?page='+pg+'"]').click();
                            },  
                            'error':function(data){
                                bootbox.alert("操作失败");
                            }        
        });

    });

    $('body').on('click','#user_rel_page a', function(e){
        e.preventDefault();//阻止a链接的跳转行为         
        var pg = $(this).attr("href").split("=")[1];
        var opg = $("#user_page li.active a").attr("href").split("=")[1];

        var begin = $('#create_time').val();
        var reg_area = $('#reg_area').val();
        var end = '';
        var status = $('#st').val();
        var nick = $('#nick').val();
        var skip = (pg-1) * 10;

        $.ajax({
                            'type':'post',
                            'url':'/usermanage/search2', 
                            'data': {begin:begin, end:end, status:status, reg_area:reg_area, nick:nick, skip:skip},  
                            'success':function(data){
                                $('#relative').html(data);
                                if(pg != opg)
                                    $('#user_page a[href="?page='+pg+'"]').click();
                            },  
                            'error':function(data){
                                bootbox.alert("操作失败");
                            }        
        });
       
    });


    $('body').on('click', '.comment_page', function(){
        var type = $('#comment_type').val();
        var uid = $('uid').val();
        var user = $('#user').val();  //用户账号
        var skip = $(this).attr("data-skip");

        $.ajax({
                        'type':'post',
                        'url':'/userrel/comment_detail_table', 
                        'data': {uid:uid, type:type, user:user, skip:skip},  
                        'success':function(data){
                            $('#comment_table').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
         });
      
    });

    $('body').on('click', '.message_page', function(){
        var type = $('#message_type').val();
        var uid = $('uid').val();
        var user = $('#user').val();  //用户账号
        var skip = $(this).attr("data-skip");

        $.ajax({
                        'type':'post',
                        'url':'/userrel/message_detail_table', 
                        'data': {uid:uid, type:type, user:user, skip:skip},  
                        'success':function(data){
                            $('#message_table').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
         });
      
    });

	$('body').on('click', '.view_user', function(){
			var uid = $(this).parent().attr("data-uid");
			$.ajax({
	                        'type':'post',
	                        'url':'/usermanage/user', 
	                        'data': {uid:uid},  
	                        'success':function(html){
	                          
	                            $('.main-container').append(html); //向网页增加窗口
	            
	            				$('#user_info_' + uid).modal('show'); //显示窗口
	                        },  
	                        'error':function(data){
	                            bootbox.alert("操作失败");
	                        }        
	         });
	});

    $('body').on('click', '.change_user_rights', function(){
        var uid = $(this).parent().attr("data-uid");
            $.ajax({
                            'type':'post',
                            'url':'/usermanage/user_rights', 
                            'data': {uid:uid},  
                            'success':function(html){
                              
                                $('.main-container').append(html); //向网页增加窗口
                
                                $('#user_rights_' + uid).modal('show'); //显示窗口
                            },  
                            'error':function(data){
                                bootbox.alert("操作失败");
                            }        
             });

    });
    $('body').on('click', '#submit_user_rights', function(){
        var content = new Array();
        var object = new Object();
        var uid = $(this).attr("data-uid");
        var msg = $('input[name=message_right]').is(":checked") ? 6 : 0;
        var cmt = $('input[name=comment_right]').is(":checked") ? 4 : 0;
        var ssub = $('input[name=shut_subscribe_right]').is(":checked") ? 0 : 1;
        var scon = $('input[name=shut_conversation_right]').is(":checked") ? 0 : 1;
        object.uid = uid;
        object.msg = msg;
        object.cmt = cmt;
        object.ssub = ssub;
        object.scon = scon;
        content.push(object);
        content = JSON.stringify(content);
            $.ajax({
                            'type':'post',
                            'url':'/usermanage/submit_user_rights', 
                            'data': {content:content},  
                            'success':function(html){
                              
                            },  
                            'error':function(data){
                                bootbox.alert("操作失败");
                            }        
             });

    });

    


});