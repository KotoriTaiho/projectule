! function ($) {
    const phpurl = 'http://localhost/projectule/backEnd/';
    const wrap = $('.wrap');
    const spic = $('#spic'); 
    const sf = $('#sf'); 
    const bpic = $('#bpic');
    const bf = $('#bf'); 
    const moveUl = $('#list ul'); 
    let sid = location.search.substring(1).split('=')[1];
    if (!sid) {
        sid = 1;
    }

    $.ajax({
        url: phpurl + 'detail.php',
        data: {
            sid: sid
        },
        dataType: 'json'
    }).then(function (resData) {
        $('#smallpic').attr('src', resData.goods_img); 
        $('.loadtitle').html(resData.goods_title)
        $('.loadpcp').html(resData.goods_price)
        $('#bpic').attr('src', resData.goods_img); 
        let picurl = resData.goods_smallpic.split(','); 
        let str = '';
        $.each(picurl, function (index, value) {
            str += `
                <li><img src="${value}"/></li>
            `;
        });
        $('#list ul').html(str);
    });

    spic.hover(function () {
        sf.css('visibility', 'visible');
        bf.css('visibility', 'visible');

        sf.width(bf.width() * spic.width() / bpic.width());
        sf.height(bf.height() * spic.height() / bpic.height());

        let bili = bpic.width() / spic.width();
        console.log(bili);

        spic.on('mousemove', function (ev) { 

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

            bpic.css({
                left: -bili * sfleft,
                top: -bili * sftop
            });
        });
    }, function () {
        sf.css('visibility', 'hidden');
        bf.css('visibility', 'hidden');
    });

    $('#list ul').on('click', 'li', function () {
        let url = $(this).find('img').attr('src');
        spic.find('img').attr('src', url); 
        bpic.attr('src', url); 
    });

    let num = 6; 
    $('#right').on('click', function () {
        let liwidth = $('#list ul li').eq(0).outerWidth(true); 
        let listlen = $('#list ul li').length; 
        if (num < listlen) {
            num++;
            if (num === listlen) { 
                $(this).css('color', '#fff');
            }
            $('#left').css('color', '#333');
        }
        moveUl.animate({
            left: -liwidth * (num - 6)
        });
    });

    $('#left').on('click', function () {
        let liwidth = $('#list ul li').eq(0).outerWidth(true); 
        let listlen = $('#list ul li').length; 
        if (num > 6) {
            num--;
            if (num === 6) { 
                $(this).css('color', '#fff');
            }
            $('#right').css('color', '#333');
        }
        moveUl.animate({
            left: -liwidth * (num - 6)
        });
    });

    let cartObj = {}; 
    if (localStorage.getItem('cartdata')) { 
        cartObj = JSON.parse(localStorage.getItem('cartdata'));
    }

    $('#count').on('input', function () {
        let reg = /^[1-9]\d*$/; 
        if (!reg.test($('#count').val())) {
            $('#count').val(1);
        }
    });
    $('.p-btn a').on('click', function () {

        if (Object.keys(cartObj).includes(sid)) { 
            cartObj[sid] = parseInt(cartObj[sid]) + parseInt($('#count').val()); 
            localStorage.setItem('cartdata', JSON.stringify(cartObj));
        } else { 
            cartObj[sid] = $('#count').val(); 
            localStorage.setItem('cartdata', JSON.stringify(cartObj));
        }
        alert('添加购物车成功');
    });
}(jQuery);