
var msg_constant = {
	PAGE_LEN : 10,
	MSG_TYPE_PIC_TEXT : 5,
	MSG_TYPE_PIC : 2,
	MSG_TYPE_VIDEO : 4,
	
	SEARCH_CATE_MSG : 4,
	
	IMAGE_NAMESPACE : "uvod-res.cloud.youku.com",
	
	IMG_MAX_WIDTH : 900,
	IMG_MAX_HEIGHT : 500,
};

var msg_config = {
	"UPLOAD_SERVER" : "101.227.10.169",
	"STORAGE_SERVER" : "key.y.youku.com",
};

var msg_image_format = ["jpg", "jpeg", "png", "gif"];


function get_image_url(host, ns, fid){
	return "http://" + host + "/cloudvideo/kservice-route/get.json?ns=" + ns + "&fid=" + fid;
}

function get_file_url(ori_node) {
	var url;
	if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
		url = ori_node.value;
	} else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
		url = window.URL.createObjectURL(ori_node.files.item(0));
	} else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
		url = window.URL.createObjectURL(ori_node.files.item(0));
	}
	return url;
}

function check_img_dimension(ori_node, callback){
	var url = get_file_url(ori_node);
	var img = new Image();
	img.src = url;
	img.onload = function(){
		callback(this.naturalWidth, this.naturalHeight);
	};
}
		
function check_cover_image(cover){
	if(0 != cover[0].files.length){
		var size = cover[0].files[0].size;
		if(size > 2 * 1024 * 1024){
			return false;
		}
		
		var fname = cover[0].files[0].name;
		var piece = fname.split(".");
		var pos = $.inArray(piece[piece.length - 1], msg_image_format);
		if(-1 == pos){
			return false;
		}
	}else{
		return false;				
	}
	return true;
}
		
function inner_upload_image(file, success, error){
	var reader = new FileReader();
	reader.readAsBinaryString(file);					
	reader.onload = function(){
		var md5 = SparkMD5.hashBinary(reader.result, false);
		var ft = file.type.split("/")[1];
		$.ajax({
				'type':'get',
				'url':'/content/bg_create_sign_for_upload_image', 
				'data': {"ns" : msg_constant.IMAGE_NAMESPACE, "fmd5" : md5, "ft" : ft}, 
				'success':function(signRep){							
					if(0 != signRep.e.code){
						error();
					}else{
						var sign = signRep.data;
						var form = new FormData();
						form.append("ns", msg_constant.IMAGE_NAMESPACE);
						form.append("fmd5", md5);						
						form.append("ft", ft);
						form.append("sign", sign);
						form.append("file-data", file);
						var xhr = new XMLHttpRequest();					
						xhr.onreadystatechange = function () {
							if(4 == xhr.readyState){
								if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
									var ret = JSON.parse(xhr.responseText);
									if(0 == ret.e.code){
										success(ret);
									}else{
										error();
									}
									
								}else{
									error();
								}
							}
						};
						xhr.open("post", "http://" + msg_config.UPLOAD_SERVER + "/cloudvideo/uploader/put.json", true);
						xhr.send(form);							
					}
				},  
				'error':function(data){
					error();
				}        
		});
	}	
}


function check_upload_image(node, check_succ, check_err, upload_succ, upload_err){
	var isOk = check_cover_image(node);
	if(!isOk){
		check_err();
		return;
	}
	var check_callback = function(rw, rh){
		if((rw > msg_constant.IMG_MAX_WIDTH) || (rh > msg_constant.IMG_MAX_HEIGHT)){
			check_err();
			return;
		}
		check_succ();
		inner_upload_image(node[0].files[0], upload_succ, upload_err);
	};
	check_img_dimension(node[0], check_callback);
}
