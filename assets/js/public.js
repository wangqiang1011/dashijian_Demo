$(function(){
    //ajaxPrefilter可以获取发送请求包含的url地址存放位置
    $.ajaxPrefilter(function(options){
        options.url = 'http://api-breakingnews-web.itheima.net'+ options.url
        //判断/my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
        if(options.url.indexOf('/my/') !== -1){
            options.headers = {
                Authorization:localStorage.getItem('token')
            }
        }
        //调用ajax中自定义complete方法
        options.complete = function(res){
            console.log(res);
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                //清除本地token的数据
                localStorage.removeItem('token')
                //强制跳转到登陆页面
                location.href='/login.html'
            }
        }
    })
})