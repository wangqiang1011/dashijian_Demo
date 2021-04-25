$(function(){
    getData()
    //从服务器中获取用户的基本信息
    function getData(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg('获取信息失败',{icon:5})
                }
                //获取数据成功渲染页面
                /* $('[name = username]').val(res.data.username)
                $('[name = nickname]').val(res.data.nickname)
                $('[name = email]').val(res.data.email)
                $('[name = id]').val(res.data.id) */
                //快速一次性给表单赋值
                layui.form.val('formUserInfo',res.data)
            }
        })
    }
    //点击数据提交
    //点击重置按钮,重新输入
    $('#btnReset').on('click',function(e){
        //阻止默认行为不让情况数据
        e.preventDefault()
        getData()
    })
    //创建用户输入用户名长度的限制
    layui.form.verify({
        Length:function(value,item){
            if(value.length > 6){
                return '用户名的长度不得超过6位'
            }
        }
    })
    //点击layui-btn提交修改
    $('.layui-form').on('submit',function(e){
        //阻止表单提交信息
        e.preventDefault()
        //获取form表单的数据
        var data = $(this).serialize()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:data,
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg(res.message,{icon:5})
                }
                layui.layer.msg(res.message,{icon:6})
                console.log(window.parent);
                window.parent.getData()
            }
        })
    })
})