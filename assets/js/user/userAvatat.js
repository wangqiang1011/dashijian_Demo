$(function(){
    // 1.1 获取裁剪区域的 元素对象
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)

//单击上传选择框弹出上传文件选择框
$('#btnChooseImage').on('click',function(){
    //点击上传自动触发input上传文件
    $('#file').click()
})

//点击上传选择新图片,绑定一个change事件
$('#file').on('change',function(){
    //获取用户选中的文件列表
    var fileList = this.files
    console.log(fileList);
    if(fileList.length === 0){
        return layui.layer.msg('请选择文件图片')
    }
    //获取到用户选中文件
    var file = fileList[0]
    console.log(file);
    //将选中文件生成一个路径
    var newImgURL = URL.createObjectURL(file)
     // 3. 重新初始化裁剪区域
    $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src',newImgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域
})
//点击确定将图片上传到服务器,然后更换头像
$('#btnUpload').on('click',function(){
    //判断用户是否上传图片,如果没有上传就进行提示
   var fileList = $('#file')[0].files
   console.log(fileList);
   //如果fileList的长度为0,那么就是没有选择文件
   if(fileList.length === 0){
       return layui.layer.msg('很抱歉,数据提交失败',{icon:5})
   }
   var dataURL = $image
   .cropper('getCroppedCanvas', {
     // 创建一个 Canvas 画布
     width: 100,
     height: 100
   })
   .toDataURL('image/png')
   //获取数据
   $.ajax({
       type:'post',
       url:'/my/update/avatar',
       data:{avatar:dataURL},
       success:function(res){
           if(res.status !== 0){
               return layui.layer.msg(res.message,{icon:5})
           }
           //获取数据成功
           layui.layer.msg(res.message,{icon:6},function(){
               //重新调用window方法渲染头像
               window.parent.getData()
           })
       }
   })
})
})