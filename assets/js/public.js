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
    })
})