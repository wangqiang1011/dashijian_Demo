$(function(){
    getData()
    //获取服务器内的数据
    function getData(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                console.log(res.data);
               if(res.status !== 0){
                   return layui.layer.msg('很抱歉获取数据失败',{icon:5})
               }
               //获取数据成功
               upData(res.data)
            }
        })
    }
    function upData(data){
        //获取了数据先查看用户是否设置名字
        //如果没有设置名称就默认使用文本名称
        var name = data.nickname || data.username
        $('#welcome').html('欢迎&nbsp&nbsp'+name)
        //接下判断用户是否设置了头像,如果设置了头像使用用户设置的
        //如果没有设置使用文本内容的首字开头
        //如果user_pic不等于空就代表用户设置了头像
        if(data.user_pic !== null){
            //将img换成用户自己的
            $('.layui-nav-img').attr('src',data.user_pic).show()
            //让文本头像隐藏
            $('.text-avatar').hide()
        }else{
            //那么就是没有设置头像
            //使用文本头像
            //先获取文本的第一个名称并且如果是字母的统一转为大写
            var first = name[0].toUpperCase()
            console.log(first);
            //将头像换成文本的
            $('.text-avatar').html(first).show()
            $('.layui-nav-img').hide()
        }
    }
    //点击退出登录按钮进行页面的退出操作
    $('#logout').on('click',function(){
        //进行提示用户是否退出
        layui.layer.confirm('确定退出登录吗?', {icon: 3, title:'来自星星的提示'}, function(index){
            //确定后清除本地数据
            localStorage.removeItem('token')
            //进行页面的跳转
            location.href = '/login.html'
            layer.close(index);
          });
    })
})