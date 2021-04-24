$(function(){
    //当点击去注册的时候让登陆页面隐藏,注册页面显示
    $('#link_reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })
    //当点击去登陆让注册页面隐藏,登陆页面显示
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //判断正则用户输入的密码位数是否在6-2位之间
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //判断再次输入的密码和第一次注册密码是否一致
        repass:function(value, item){
            //value：表单的值、item：表单的DOM对象
            //利用if判断进行比较是否和第一个的密码保持一致
            //先获取第一次输入密码的值
            var psd = $('#form_reg [name = password]').val()
            if(psd != value){
                return '注册失败:两次密码不一致'
            }
        }   
    })
    //点击注册按钮将数据传送到服务器    
    $('#form_reg').on('click','.layui-btn',function(e){
        //阻止父级默认提交
        e.preventDefault()
        //获取form表单收集的数据
        var data = $(this).parents('#form_reg').serialize()
        console.log(data);
        //将收集的数据上传到服务器
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:data,
            success:function(res){
                //判断是否获取成功
                if(res.status != 0){
                    return layui.layer.msg('很抱歉注册失败',{icon:5})
                }
                //如果获取成功就跳转到登录页面
                layui.layer.msg('恭喜您账号注册成功',{icon:6},function(){
                    $('#link_login').click()
                })
            }
        })
    })
    //点击登录按钮,收集用户输入的数据去与注册数据比较是否存在数据
    $('#form_login').on('click','.layui-btn',function(e){
        //阻止form自动提交数据
        e.preventDefault()
        //获取用户输入的密码和账号
        var data = $(this).parents('#form_login').serialize()
        console.log(data);
        $.ajax({
            type:'post',
            url:'/api/login',
            data:data,
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg('登陆失败:可能账户或密码出错',{icon:5})
                }
                //登录成功后将进行页面的跳转
                layui.layer.msg('登录成功即将进行页面跳转',{icon:6},function(){
                    localStorage.setItem('token',res.token)
                    location.href='/index.html'
                })
            }
        })
    })
})