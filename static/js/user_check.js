$(function(){
   $('#create_time').datepicker({autoclose:true});

   $("#submit").click(function(){
		var check_id = $('#checkid').val();
		
        var time = $('#create_time').val();
		$.ajax({
                        'type':'post',
                        'url':'/checkmanage/userinfocheck', 
                        'data': {check_id:check_id, status:0, time:time},  //0:待审核
                        'success':function(data){
                            $('#info').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $("#submit").trigger("click");

    $('body').on('click', '#check_submit', function(){
        var time = $('#create_time').val();
        var check_id = $('#checkid').val();
        var data = new Array();
        var item = new Object();
        $('tbody.user tr').each(function(){
            item = new Object();
            item.uid = $(this).find('td').eq(1).attr("data-uid");
            item.check_id = $(this).attr("data-checkid");
            item.status = $(this).find('td').eq(5).find('input:checked').val();
            //alert(item.status);
            data.push(item);
        });
        //console.log(data);
        data = JSON.stringify(data);
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/submit_user_info_check', 
                        'data': {'data':data, time:time, check_id:check_id},  
                        'success':function(data){
                            $('#info').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

    $('body').on('click', '.pre_user_page', function(){
        
        var time = $('#create_time').val();
        var min_time = $('tbody.user tr').eq(0).find('td').eq(4).attr("data-time");
        //alert(new Date(parseInt(min_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '));
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/userinfocheck', 
                        'data': {'status':3, time:time, min_time:min_time},  
                        'success':function(data){
                            $('#info').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });
    $('body').on('click', '.next_user_page', function(){
        
        var time = $('#create_time').val();
        var max_time = $('tbody.user tr').last().find('td').eq(4).attr("data-time");
        // $('tbody.user tr').each(function(){
           
        //     max_time = $(this).find('td').eq(3).attr("date-time");
            
           
        // });
        //alert(new Date(parseInt(max_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '));
        $.ajax({
                        'type':'post',
                        'url':'/checkmanage/userinfocheck', 
                        'data': {'status':3, time:time, max_time:max_time},  
                        'success':function(data){
                            $('#info').html(data);
                        },  
                        'error':function(data){
                            bootbox.alert("操作失败");
                        }        
            });
    });

});