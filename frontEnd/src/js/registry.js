!function($){
    const tel = $('.tel');
    const comfrimcode = $('.comfrimcode');
    const password = $('.password');
    const repass = $('.repass');
    const checkspan = $('.checkspan');
    const submit = $('.submit');
    const phpurl = 'http://localhost/projectule/backend/';
    let telflag = false;
    let comfrimcodeflag = false;
    let passflag = false;
    let repassflag = false;
    let code = parseInt(Math.random()*101);
    submit.prop('disabled', true);
    tel.on('focus',function(){
        checkspan.eq(0).css('color','#000').html('请输入您的手机号')
    });
    tel.on('blur',function(){
        if($(this).val() !== ''){
            let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
            if (reg.test($(this).val())) {
                $.ajax({
                    method: 'post',
                    url: phpurl + 'registry.php',
                    data: {
                        tel: $(this).val()
                    },
                    dataType: 'json'
                }).then(function(resObj)
                {
                    if (resObj.status === 2){
                        checkspan.eq(0).css('color', 'green').html('√');
                    telflag = true;
                }   else { //手机号不能使用
                    checkspan.eq(0).css('color', 'red').html('手机号码已经存在');
                    userflag = false;
                }
                
                })}
                else {
                    checkspan.eq(0).css('color', 'red').html('手机号码格式不正确');
                    telflag = false;
                }  
        }
        else {
            checkspan.eq(0).css('color', 'red').html('手机号码不能为空')
            telflag = false;
        }
        if (telflag && comfrimcodeflag && passflag && repassflag) {
            submit.prop('disabled', false); //启用
        } else {
            submit.prop('disabled', true); //禁用
        }
    })
    comfrimcode.on('focus',function(){
        checkspan.eq(1).css('color', '#000').html(`${code}请输入左侧的验证码`);
    })
    comfrimcode.on('blur',function(){
        if ($(this).val() !== ''){
            if ($(this).val() == code){
                checkspan.eq(1).css('color', 'green').html('√');
                comfrimcodeflag = true;
                if (telflag && comfrimcodeflag && passflag && repassflag) {
                    submit.prop('disabled', false); //启用
                } else {
                    submit.prop('disabled', true); //禁用
                }
                return code = parseInt(Math.random()*101);
            }
            else{
                checkspan.eq(1).css('color', 'red').html('验证码有误');
                comfrimcodeflag = false;
                if (telflag && comfrimcodeflag && passflag && repassflag) {
                    submit.prop('disabled', false); //启用
                } else {
                    submit.prop('disabled', true); //禁用
                }
                return code = parseInt(Math.random()*101);
            }
        }
        else{
            checkspan.eq(1).css('color', 'red').html('验证码不能为空');
            comfrimcodeflag = false;
            if (telflag && comfrimcodeflag && passflag && repassflag) {
                submit.prop('disabled', false); //启用
            } else {
                submit.prop('disabled', true); //禁用
            }
            return code = parseInt(Math.random()*101);
        }
        
    })
    password.on('focus', function() {
        checkspan.eq(2).css('color', '#000').html('长度8-14个字符，至少包含两种字符');
    });
    password.on('input', function() {
        let reg1 = /\d+/;
        let reg2 = /[a-z]+/;
        let reg3 = /[A-Z]+/;
        let reg4 = /[\W\_]/; //特殊符号  非字母数字 + 下划线
        let count = 0; //统计字符的种类
        if (reg1.test($(this).val())) {
            count++;
        }
        if (reg2.test($(this).val())) {
            count++;
        }
        if (reg3.test($(this).val())) {
            count++;
        }
        if (reg4.test($(this).val())) {
            count++;
        }

        //判断弱中强
        switch (count) {
            case 1:
                checkspan.eq(2).css('color', 'red').html('弱');
                passflag = false;
                break;
            case 2:
            case 3:
                checkspan.eq(2).css('color', 'orange').html('中');
                passflag = true;
                break;
            case 4:
                checkspan.eq(2).css('color', 'green').html('强');
                passflag = true;
                break;
        }
    });
    password.on('blur', function() {
        if ($(this).val() !== '') {
            if ($(this).val().length >= 8 && $(this).val().length <= 14) {
                if (passflag) {
                    checkspan.eq(2).css('color', 'green').html('√');
                }
            } else {
                checkspan.eq(2).css('color', 'red').html('密码长度有问题');
                passflag = false;
            }
        } else {
            checkspan.eq(2).css('color', 'red').html('密码不能为空');
            passflag = false;
        }
        //最终的验证通过页面进行跳转。
        if (telflag && comfrimcodeflag && passflag && repassflag) {
            submit.prop('disabled', false); //启用
        } else {
            submit.prop('disabled', true); //禁用
        }
    });

    //密码确认
    repass.on('focus', function() {
        checkspan.eq(3).css('color', '#000').html('请再次输入密码');
    });

    repass.on('blur', function() {
        if ($(this).val() !== '') {
            if (password.val() === $(this).val()) {
                checkspan.eq(3).css('color', 'green').html('√');
                repassflag = true;
            } else {
                checkspan.eq(3).css('color', 'red').html('两次输入的密码不一致');
                repassflag = false;
            }
        } else {
            checkspan.eq(3).css('color', 'red').html('密码确认不能为空');
            repassflag = false;
        }
        //最终的验证通过页面进行跳转。
        if (telflag && comfrimcodeflag && passflag && repassflag) {
            submit.css('background','red').prop('disabled', false); //启用
        } else {
            submit.prop('disabled', true); //禁用
        }
    });
}(jQuery);