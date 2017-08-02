$(function(){
   
   
    $('body').on('click','#user_comment_page a', function(e){
        e.preventDefault();//阻止a链接的跳转行为         
        var pg = $(this).attr("href").split("=")[1];
       
        var uid = $('#uid').val();
        var user = $('#user').val();  //用户账号

        var skip = (pg-1) * 10;

        $.ajax({
                            'type':'post',
                            'url':'/userrel/comment_detail_table', 
                            'data': {user:user, uid:uid, skip:skip},  
                            'success':function(data){
                                $('#comment_table').html(data);
                                
                            },  
                            'error':function(data){
                                bootbox.alert("操作失败");
                            }        
        });

    });

    $('body').on('click','#user_message_page a', function(e){
        e.preventDefault();//阻止a链接的跳转行为     
            
        var pg = $(this).attr("href").split("=")[1];
       
        var uid = $('#uid').val();
        var user = $('#user').val();  //用户账号

        var skip = (pg-1) * 10;

        $.ajax({
                            'type':'post',
                            'url':'/userrel/message_detail_table', 
                            'data': {user:user, uid:uid, skip:skip},  
                            'success':function(data){
                                $('#message_table').html(data);
                                
                            },  
                            'error':function(data){
                                bootbox.alert("操作失败");
                            }        
        });

    });


});