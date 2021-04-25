$(function(){
    layui.form.verify({
        //定义输入密码币6到12位
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //校验新密码和旧密码不得一致
        samePwd:function(value,item){
            if(value === $('[name = oldPwd]').val()){
                return '新旧密码不得一致'
            }
        },
        //判断确认密码和输入密码是否一致
        rePwd:function(value){
            if(value !== $('[name = newPwd]').val()){
                return '两次密码不一致'
            }
        }
    })
    $('.layui-form').on('submit',function(e){
        //阻止默认表单提交
        e.preventDefault()
        //获取表单数据
        var data = $(this).serialize()
        console.log(data);
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:data,
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg(res.message,{icon:5})
                }
                //修改密码成功
                layui.layer.msg(res.message,{icon:6},function(){
                    //修改完成密码以后将form表单数据清空
                    //reset位dom原生方法,使用jquery方法的时候需要进行转换成为dom对象
                    $('.layui-form')[0].reset()
                })
            }
        })
    })
})