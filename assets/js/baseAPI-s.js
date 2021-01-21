$.ajaxPrefilter(function(option){
    console.log(option);
    option.url = "http://api-breakingnews-web.itheima.net/" + option.url
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
          Authorization: localStorage.getItem('token') || ''
        }
    }

    option.complete = function(res) {
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