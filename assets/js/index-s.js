$(function(){

    getUserInfo();

    var layer = layui.layer

  $('#btnLogout').on('click', function() {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {

      localStorage.removeItem('token')
      location.href = 'login-s.html'

      layer.close(index)
    })
  })
})
function getUserInfo(){
    console.log(11)
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
    })
}

function renderAvatar(user){
    // 获取用户名称
    var name = user.nickname || user.username
    console.log(name)

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if(user.user_pic !== null) {
        $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show()
        $('.text-avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
          .html(first)
          .show()
          
    }
}