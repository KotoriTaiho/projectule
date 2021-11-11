!function(){
    const tel = $('.tel');
    const password = $('.password');
    const checkspan = $('.checkspan');
    const btn = $('.btn');
    const phpurl = 'http://localhost/projectule/backend/';
    tel.on('focus',function(){
        checkspan.eq(0).css('color','#000').html('请输入您的手机号')
    });
    tel.on('blur',function(){
        checkspan.eq(0).html(''); //防止用户名由不存在改成存在的提示信息
        if ($(this).val() !== '') {
            $.ajax({
                method: 'post',
                url: phpurl + 'login.php',
                data: {
                    tel: $(this).val()
                },
                dataType: 'json'
            }).then(function(resObj) {
                if (resObj.status === 2) {
                    checkspan.eq(0).css('color', 'red').html('用户名不存在');
                }
            });
        } else {
            checkspan.eq(0).css('color', 'red').html('手机号不能为空');
        }
    });
    btn.on('click', function() {
        if (password.val() !== '') {
            $.ajax({
                method: 'post',
                url: phpurl + 'login.php',
                data: {
                    tel: tel.val(),
                    password: password.val()
                },
                dataType: 'json'
            }).then(function(resObj) {
                if (resObj.status == 3) {
                    location.href = 'index1.html';
                    window.localStorage.setItem('tel', tel.val());
                } else {
                    checkspan.eq(1).css('color', 'red').html('密码错误');
                }
            });
        } else {
            checkspan.eq(1).css('color', 'red').html('密码不能为空');
        }
    });
}(jQuery);