$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })

    getUserInfo();

    // 初始化用户基本信息
    function getUserInfo(){
        $.ajax({
            method: 'GET',
            url: 'my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                  return layer.msg(res.message)
                }
                // layui快速给表单赋值需要给对应form表单添加lay-filter属性
                form.val('formUserInfo',res.data)
              }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        getUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        console.log(1)
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                console.log(res)
                if(res.status != 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
  })