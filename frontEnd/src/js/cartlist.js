! function($) {
    const phpurl = 'http://localhost/projectule/backend/';
    let localObj = JSON.parse(localStorage.getItem('cartdata'));
    $.ajax({
        method: 'get',
        url: phpurl + 'alldata.php',
        dataType: 'json'
    }).then(function(resData) {
        $.each(localObj, function(key, value) { 
            $.each(resData, function(index, obj) {
                if (key == obj.id) { 
                    let clonebox = $('.goods-item:hidden').clone(true, true); 
                    clonebox.attr('sid', obj.id);
                    clonebox.find('.goods-pic img').attr('src', obj.goods_img); 
                    clonebox.find('.goods-d-info a').html(obj.goods_title); 
                    clonebox.find('.b-price strong').html(obj.goods_price); 
                    clonebox.find('.quantity-form input').val(value); 
                    clonebox.find('.b-sum strong').html((obj.goods_price * value).toFixed(2)); 
                    clonebox.css('display', 'block');
                    $('.item-list').append(clonebox);
                    calc(); 
                }
            });
        });

    });

    function calc() {
        let allprice = 0; 
        let allcount = 0; 
        $('.goods-item:visible').each(function(index, element) { 
            if ($(element).find('.cart-checkbox input').prop('checked')) {
                allcount += parseInt($(element).find('.quantity-form input').val()); 
                allprice += parseFloat($(element).find('.b-sum strong').html()); 
            }
        });
        $('.amount-sum em').html(allcount); 
        $('.totalprice').html('￥' + allprice); 
    }


    $('.allsel').on('click', function() {
        $('.goods-item:visible').find('.cart-checkbox input').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calc(); 
    });

    $('.item-list').on('click', '.cart-checkbox input', function() {
        let len_checked = $('.goods-item:visible').find('.cart-checkbox input:checked').length; 
        let len_checkbox = $('.goods-item:visible').find('.cart-checkbox input:checkbox').length; 
        if (len_checkbox === len_checked) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        calc(); 
    });


    $('.item-list').on('click', '.quantity-add', function() {
        let num = $(this).prev().val(); 
        num++;
        $(this).prev().val(num); 
        $(this).parents('.goods-item').find('.b-sum strong').html(singleprice($(this))) 
        setlocal($(this)); 
        calc(); 
    });
    // --
    $('.item-list').on('click', '.quantity-down', function() {
        let num = $(this).next().val(); 
        num--;
        if (num < 1) {
            num = 1;
        }
        $(this).next().val(num); 
        $(this).parents('.goods-item').find('.b-sum strong').html(singleprice($(this))) 
        setlocal($(this)); 
        calc(); 

    });
    $('.item-list').on('input', '.quantity-form input', function() {
        let reg = /^[1-9]\d*$/;
        if (!reg.test($(this).val())) {
            $(this).val(1)
        }
        $(this).parents('.goods-item').find('.b-sum strong').html(singleprice($(this))) 
        setlocal($(this)); 
        calc(); 
    });

    function singleprice(obj) { 
        let price = parseFloat(obj.parents('.goods-item').find('.b-price strong').html()); 
        let num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val()); 
        return (price * num).toFixed(2);
    }

    function setlocal(obj) {
        let localsid = obj.parents('.goods-item').attr('sid'); 
        let localdata = JSON.parse(localStorage.getItem('cartdata')); 
        let num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val()); 
        localdata[localsid] = num;
        localStorage.setItem('cartdata', JSON.stringify(localdata));

    }

    $('.item-list').on('click', '.b-action a', function() {
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.goods-item').remove();
            calc();
            removelocal($(this).parents('.goods-item').attr('sid')); 
        }
    });

    $('.operation a').on('click', function() {
        if (window.confirm('你确定要删除吗?')) {
            $('.goods-item:visible').each(function(index, element) {
                if ($(element).find('.cart-checkbox input').prop('checked')) {
                    $(element).remove();
                    calc();
                    removelocal($(element).attr('sid')) 
                }
            });
        }
    });

    function removelocal(sid) {
        let localdata = JSON.parse(localStorage.getItem('cartdata')); 
        delete localdata[sid];
        localStorage.setItem('cartdata', JSON.stringify(localdata));
    }

}(jQuery);