!function($){
const logininfo = $('#logininfo')//选取登录项的字段名
const loginname = window.localStorage.getItem('tel')//获取本地存储中tel的字段名
    if(window.localStorage.getItem('tel') !== null){
        logininfo.html(`<a href="./login.html">${loginname}</a>`)
}//查询本地存储中用户名字段是否有值,如果有值则输出登录名
else{
    logininfo.html('<a href="./login.html">[请登录]</a>')
}//否则将显示需要登录的状态
}(jQuery);