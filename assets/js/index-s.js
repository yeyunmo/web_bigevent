$(function(){

    getUserInfo();

    function getUserInfo(){
        $.ajax({
            method:'GET',
            url: 'my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {

                console.log(res);
                if (res.status !== 0) {
                  return layui.layer.msg(res.massage);
                }
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            },
            
            complete: function(res) {
                // console.log('执行了 complete 回调：')
                // console.log(res)
                // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                  // 1. 强制清空 token
                  localStorage.removeItem('token')
                  // 2. 强制跳转到登录页面
                  location.href = '/login.html'
                }
              }
        })
    }

    function renderAvatar(user){
        // 获取用户名称
        var name = user.nickname || user.username
        $('.text-inner').html('欢迎&nbsp;&nbsp;'+name);
        if(user.user_pic !== null) {
            $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar')
              .html(first)
              .show()
        }
    }

    var layer = layui.layer

  $('#btnLogout').on('click', function() {
    console.log(1);
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {

      localStorage.removeItem('token')
      location.href = 'login-s.html'

      layer.close(index)
    })
  })
})