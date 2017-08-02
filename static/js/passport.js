$(function(){
	
	var evts = {
		"login" : function(e){
			e.preventDefault();//阻止a链接的跳转行为	
			var list = $("ul.login-form li");
			var name = $(list[0]).find("input").val();
			var passwd = $(list[1]).find("input").val();
			
			var isOk = true;
			
			if(0 == name.length){
				$(list[0]).find("p").html("<i>*</i>请输入登陆账号");
				isOk = false;
			}else{
				$(list[0]).find("p").html("");
			}
			if(0 == passwd.length){
				$(list[1]).find("p").html("<i>*</i>请输入登陆密码");
				isOk = false;
			}else{
				$(list[1]).find("p").html("");
			}
			
			
			var params = {};			
			if(evts.is_email(name)){
				params['email'] = name;
				$(list[0]).find("p").html("");
			}else{
				$(list[0]).find("p").html("<i>*</i>无效的邮箱");
				isOk = false;
			}
			
			if(!isOk){
				return;
			}
			
			
			params['password'] = passwd;
			params['domain'] = evts.get_domain_from_url();
			
			/*
			params['email'] = "aa21@youku.com";
			params['password'] = "1111111";
			*/
			if(!isOk){
				return;
			}
			
			
			$.ajax({
					'type':'get',
					'url':"/passport/login", 
					'data': params, 
					//'async' : false,
					'success':function(json){
						if(0 == json.e.code){
							window.location.href = "/system/index";							
						}else{
							if(-107 == json.e.code){
								$(list[0]).find("p").html("<i>*</i>无效的账号");
							}else{
								$(list[1]).find("p").html("<i>*</i>错误的密码");
							}							
						}
					},  
					'error':function(xhr, status, error){
						$(list[0]).find("p").html("<i>*</i>无效的账号");
					}        
			});
			
			
		},
		
		"is_email" : function(value) {
			var rs = new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]{1,4}$/).test(value);
			return rs;
		},
		
		"is_mobile" : function(value) {
			var rs = /^1[3,5,8,4,7]\d{9}$/.test(value);
			return rs;
		},
		
		"forget_password_click" : function(e){
			e.preventDefault();
		},
		
		"logout" : function(e){
			e.preventDefault();
			var domain = evts.get_domain_from_cookie();			
			$.ajax({
					'type':'get',
					'url':"/passport/logout", 
					'data': {}, 					
					'success':function(json){
						if(0 == json.e.code){
							var url = "/passport/index?domain=" + domain;							
							window.location.href = url;						
						}else{
							alert("退出失败");							
						}
					},  
					'error':function(){
						alert("退出失败");
					}        
			});			
		},
		
		'get_domain_from_url' : function(){
			var domain = "youku";
			var data = {};
			if(0 != window.location.search){
				var query = window.location.search.substr(1);
				var str_arr = query.split("&");
				for(var i = 0; i < str_arr.length; i++){
					var item = str_arr[i].split("=");
					data[item[0]] = item[1];
				}
			}
			if((undefined != data["domain"]) && (0 != data["domain"].length)){
				domain = data["domain"];
			}
			
			return domain;
		},
		
		'get_domain_from_cookie' : function(){
			var domain = "youku";
			var tmp = $.cookie('domain');
			if(undefined != tmp){
				domain = tmp;
			}
			return domain;
		},
		'set_nick' : function(){			
			var nick = "";
			var tmp = $.cookie('nick');
			if(undefined != tmp){
				nick = tmp;
			}
			$("div.navbar-fixed-top ul.nav span.user-info").html(nick);
		},
		
	};
	
	var bindEvents = function(){
		$("a.login-btn").click(evts.login);
		$("a.forget-href").click(evts.forget_password_click);
		$("#cms-logout").click(evts.logout);
	};
   
	var init = function(){
		//alert(evts.get_domain_from_url());
		
		bindEvents();
		evts.set_nick();
	};
	
	init();
});