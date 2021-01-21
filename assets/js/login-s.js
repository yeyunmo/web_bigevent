$(function(){
    // 点击去注册账号的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $("#link_login").on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 验证密码框
    var form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value){
            var pwd = $('.reg-box [name=repassword]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求

        var data = {
          username: $('.reg-box [name=username]').val(),
          password: $('.reg-box [name=password]').val()
        }
        console.log(data.username)
        console.log(data.password)

        $.ajax({
            method:'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录',{time:1500},function(){
                    $('#link_login').click();
                })
            }
        })
    })



    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功',{time:1500},function(){
                    localStorage.setItem('token',res.token);
                    location.href = "index.html"
                })
            }
        })

    })
})