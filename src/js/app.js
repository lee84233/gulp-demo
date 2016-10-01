console.log(1);
// iconfont
var iconfontUrl = '//at.alicdn.com/t/font_1473830886_520488.css';
$('#iconfont').attr('href',iconfontUrl);

// 日期
var lcDate = new Date();
var lc_year = lcDate.getFullYear(); //获取完整的年份(4位,1970-????)
var lc_month = lcDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
var lc_date = lcDate.getDate(); //获取当前日(1-31)
var lc_day = lcDate.getDay(); //获取当前星期X(0-6,0代表星期天)
var lc_h = lcDate.getHours(); //获取当前小时数(0-23)
var lc_m = lcDate.getMinutes(); //获取当前分钟数(0-59)
var lc_s = lcDate.getSeconds(); //获取当前秒数(0-59)


$(document).ready(function() {

	// IE
	var currentTime = lc_year+'-'+lc_month+'-'+lc_date;
	if( myBrowser()=='IE' ){
		if(IEVersion()<=9){

			// placeholder
			$('input, textarea').placeholder();

			// cookie
			if( getCookie('browserWarn')!=currentTime  ){
				$('#browserCnt').show();
			}
		}
		// 关闭浏览器提示
		$('#closeBrowser').click(function() {
			$('#browserCnt').slideUp('fast');
			setCookie('browserWarn',currentTime,'d1');
		});
	}
	// 判断浏览器
	function myBrowser(){
		//取得浏览器的userAgent字符串
    	var userAgent = navigator.userAgent;
	    var isOpera = userAgent.indexOf("Opera") > -1;
	    //判断是否Opera浏览器
	    if (isOpera) {
	        return "Opera";
	    }
	    //判断是否Firefox浏览器
	    if (userAgent.indexOf("Firefox") > -1) {
	        return "FF";
	    }
	    //判断是否Chrome浏览器
	    if (userAgent.indexOf("Chrome") > -1){
	 		return "Chrome";
		}
		//判断是否Safari浏览器
	    if (userAgent.indexOf("Safari") > -1) {
	        return "Safari";
	    }
	    //判断是否IE浏览器
	    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
	        return "IE";
	    }
	}
	// 检测IE版本
	function IEVersion(){
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器

		if (isIE){
		    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
 			reIE.test(userAgent);
 			var fIEVersion = parseFloat(RegExp["$1"]);
			if (fIEVersion == 7) {
				return 7;
			} else if (fIEVersion == 8) {
				return 8;
			} else if (fIEVersion == 9) {
				return 9;
			} else if (fIEVersion == 10) {
				return 10;
			} else if (fIEVersion == 11) {
				return 11;
			} else if (fIEVersion == 12){
				return 12;
			} else {
				return 0;
			}
		}
	}
});

/* 设定过期时间
* s20是代表20秒
* h12是代表12小时
* d30是代表30天
* setCookie("name","hayden","s20");
*/
function setCookie(name,value,time){
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec*1);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

// 读取cookies
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if( arr=document.cookie.match(reg) ){
		return unescape(arr[2]);
	}else{
		return null;
	}
}
// 删除cookies
function delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
// 事件设置
function getsec(str){
  var str1=str.substring(1,str.length)*1;
  var str2=str.substring(0,1);
  if (str2=="s"){
    return str1*1000;
  }
  else if (str2=="h"){
    return str1*60*60*1000;
  }
  else if (str2=="d"){
    return str1*24*60*60*1000;
  }
}

// 插件扩展
;(function($){
	$.extend({
		hook:function(str){
			if(str!=''){
				return $('[data-hook='+str+']');
			}else{
				console.error('hook错误');
				return false;
			}
		}
	});
	
})(jQuery);