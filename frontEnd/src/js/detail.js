! function ($) {
    //1.获取列表页面传入的sid
    const phpurl = 'http://localhost/projectule/backEnd/';
    const wrap = $('.wrap');
    const spic = $('#spic'); //小图
    const sf = $('#sf'); //小放
    const bpic = $('#bpic'); //大图
    const bf = $('#bf'); //大放
    const moveUl = $('#list ul'); //获取小图列表
    let sid = location.search.substring(1).split('=')[1];
    if (!sid) {
        sid = 1;
    }
    //2.将当前得到的sid传给后端，后端返回对应的数据。
    $.ajax({
        url: phpurl + 'detail.php',
        data: {
            sid: sid
        },
        dataType: 'json'
    }).then(function (resData) {
        $('#smallpic').attr('src', resData.goods_img); //小图
        $('.loadtitle').html(resData.goods_title)
        $('.loadpcp').html(resData.goods_price)
        $('#bpic').attr('src', resData.goods_img); //大图
        let picurl = resData.goods_smallpic.split(','); //数组
        let str = '';
        $.each(picurl, function (index, value) {
            str += `
                <li><img src="${value}"/></li>
            `;
        });
        $('#list ul').html(str);
    });


    //3.放大镜效果
    //显示隐藏小放和大放
    spic.hover(function () {
        sf.css('visibility', 'visible');
        bf.css('visibility', 'visible');

        // 计算小放的尺寸
        sf.width(bf.width() * spic.width() / bpic.width());
        sf.height(bf.height() * spic.height() / bpic.height());
        // 计算比例
        let bili = bpic.width() / spic.width();
        console.log(bili);
        // 鼠标移动，小放跟随鼠标的位置。
        spic.on('mousemove', function (ev) { //ev:事件对象
            //限定范围，控制小放的位置。
            let sfleft = ev.pageX - wrap.offset().left - sf.width() / 2;
            let sftop = ev.pageY - wrap.offset().top - sf.height() / 2;
            if (sfleft <= 0) {
                sfleft = 0;
            } else if (sfleft >= spic.width() - sf.width()) {
                sfleft = spic.width() - sf.width();
            }
            if (sftop <= 0) {
                sftop = 0;
            } else if (sftop >= spic.height() - sf.height()) {
                sftop = spic.height() - sf.height();
            }
            sf.css({
                left: sfleft,
                top: sftop
            });

            //大图跟着移动
            bpic.css({
                left: -bili * sfleft,
                top: -bili * sftop
            });
        });
    }, function () {
        sf.css('visibility', 'hidden');
        bf.css('visibility', 'hidden');
    });

    // 点击小图列表，切换小图和大图的图片 - 渲染的元素，添加事件委托
    // $(this)->指向委托的元素
    $('#list ul').on('click', 'li', function () {
        let url = $(this).find('img').attr('src');
        spic.find('img').attr('src', url); //获取的图片地址给小图
        bpic.attr('src', url); //获取的图片地址给大图
    });

    //3.小图列表左右箭头的操作 - 移动一张
    let num = 6; //小图列表默认可视的张数。
    $('#right').on('click', function () {
        let liwidth = $('#list ul li').eq(0).outerWidth(true); //一个小图列表的宽度,盒模型+margin值
        let listlen = $('#list ul li').length; //li的长度
        if (num < listlen) {
            num++;
            if (num === listlen) { //隐藏右箭头
                $(this).css('color', '#fff');
            }
            $('#left').css('color', '#333');
        }
        moveUl.animate({
            left: -liwidth * (num - 6)
        });
    });

    $('#left').on('click', function () {
        let liwidth = $('#list ul li').eq(0).outerWidth(true); //一个小图列表的宽度,盒模型+margin值
        let listlen = $('#list ul li').length; //li的长度
        if (num > 6) {
            num--;
            if (num === 6) { //隐藏右箭头
                $(this).css('color', '#fff');
            }
            $('#right').css('color', '#333');
        }
        moveUl.animate({
            left: -liwidth * (num - 6)
        });
    });

    //4.购物车 - 假设第一次，比较第二次及以后。
    let cartObj = {}; //对象的属性就是编号，对象属性值就是数量。
    if (localStorage.getItem('cartdata')) { //判断本地存储是否存在数据
        cartObj = JSON.parse(localStorage.getItem('cartdata'));
    }

    $('#count').on('input', function () {
        let reg = /^[1-9]\d*$/; //正则
        if (!reg.test($('#count').val())) {
            $('#count').val(1);
        }
    });
    $('.p-btn a').on('click', function () {
        //Object.keys(cartObj获取对象所有的key值，返回一个数组
        if (Object.keys(cartObj).includes(sid)) { //存在
            cartObj[sid] = parseInt(cartObj[sid]) + parseInt($('#count').val()); //新的数量+存在的数量，重新赋值，重新存储。
            localStorage.setItem('cartdata', JSON.stringify(cartObj));
        } else { //不存在,添加
            cartObj[sid] = $('#count').val(); //获取数量，传递给商品的编号
            localStorage.setItem('cartdata', JSON.stringify(cartObj));
        }
        alert('添加购物车成功');
    });

}(jQuery);