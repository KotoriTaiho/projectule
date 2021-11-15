! function($) {
    //克隆实现渲染操作
    // 1.获取本地存储，转换成对象格式。
    const phpurl = 'http://localhost/projectule/backend/';
    let localObj = JSON.parse(localStorage.getItem('cartdata'));
    $.ajax({
        method: 'get',
        url: phpurl + 'alldata.php',
        dataType: 'json'
    }).then(function(resData) {
        //利用本地存储里面的sid和所有数据接口中的id进行比较，确定数据，克隆渲染。
        $.each(localObj, function(key, value) { //key:对象的属性名(sid)，value:对象的值(数量)
            $.each(resData, function(index, obj) {
                if (key == obj.id) { //sid和所有数据接口中的id进行比较
                    let clonebox = $('.goods-item:hidden').clone(true, true); //克隆隐藏的元素。
                    clonebox.attr('sid', obj.id);
                    clonebox.find('.goods-pic img').attr('src', obj.goods_img); //赋值小图
                    clonebox.find('.goods-d-info a').html(obj.goods_title); //赋值标题
                    clonebox.find('.b-price strong').html(obj.goods_price); //赋值价格
                    clonebox.find('.quantity-form input').val(value); //赋值数量
                    clonebox.find('.b-sum strong').html((obj.goods_price * value).toFixed(2)); //赋值小计
                    clonebox.css('display', 'block');
                    $('.item-list').append(clonebox);
                    calc(); //计算总价和总的数量。
                }
            });
        });

    });

    // 3.计算总价和总的件数 - 独立封装 - 很多情况下面都会发生变化。
    // 前提：复选框选中才计算。
    function calc() {
        let allprice = 0; //总价
        let allcount = 0; //总的数量
        $('.goods-item:visible').each(function(index, element) { //index:索引，element:原生js元素对象。
            if ($(element).find('.cart-checkbox input').prop('checked')) {
                allcount += parseInt($(element).find('.quantity-form input').val()); //计算总的数量
                allprice += parseFloat($(element).find('.b-sum strong').html()); //计算总的价格
            }
        });
        $('.amount-sum em').html(allcount); //总的数量赋值
        $('.totalprice').html('￥' + allprice); //总的商品价格
    }

    // 4.全选操作
    // 4.1.点击全选，其他的复选框选中。
    $('.allsel').on('click', function() {
        $('.goods-item:visible').find('.cart-checkbox input').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calc(); //重新统计总价和总的数量
    });

    // 4.2.事件委托给克隆的input:checkbox添加点击事件。
    // 克隆的input都选中，全选选中，否则全选不选中。
    $('.item-list').on('click', '.cart-checkbox input', function() {
        let len_checked = $('.goods-item:visible').find('.cart-checkbox input:checked').length; //选中的复选框的长度
        let len_checkbox = $('.goods-item:visible').find('.cart-checkbox input:checkbox').length; //复选框的长度
        if (len_checkbox === len_checked) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        calc(); //重新统计总价和总的数量
    });

    // 5.数量的改变(++，--，input)
    // ++
    $('.item-list').on('click', '.quantity-add', function() {
        let num = $(this).prev().val(); //获取当前+号上一个兄弟元素里面的值
        num++;
        $(this).prev().val(num); //赋值。
        $(this).parents('.goods-item').find('.b-sum strong').html(singleprice($(this))) //小计计算,赋值
        setlocal($(this)); //设置本地存储
        calc(); //重新统计总价和总的数量
    });
    // --
    $('.item-list').on('click', '.quantity-down', function() {
        let num = $(this).next().val(); //获取当前+号上一个兄弟元素里面的值
        num--;
        if (num < 1) {
            num = 1;
        }
        $(this).next().val(num); //赋值。
        $(this).parents('.goods-item').find('.b-sum strong').html(singleprice($(this))) //小计计算,赋值
        setlocal($(this)); //设置本地存储
        calc(); //重新统计总价和总的数量

    });
    // input输入
    $('.item-list').on('input', '.quantity-form input', function() {
        let reg = /^[1-9]\d*$/;
        if (!reg.test($(this).val())) {
            $(this).val(1)
        }
        $(this).parents('.goods-item').find('.b-sum strong').html(singleprice($(this))) //小计计算,赋值
        setlocal($(this)); //设置本地存储
        calc(); //重新统计总价和总的数量
    });

    // 封装函数实现小计。
    function singleprice(obj) { //当前操作的元素
        let price = parseFloat(obj.parents('.goods-item').find('.b-price strong').html()); //获取单价
        let num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val()); //获取数量
        return (price * num).toFixed(2);
    }

    // 封装函数实现修改数量后同步到本地存储。
    function setlocal(obj) {
        let localsid = obj.parents('.goods-item').attr('sid'); //获取当前操作的商品的sid
        let localdata = JSON.parse(localStorage.getItem('cartdata')); //获取本地存储，转换成对象。
        let num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val()); //获取数量
        //对象的属性名相同，会覆盖。
        localdata[localsid] = num;
        //重新存储
        localStorage.setItem('cartdata', JSON.stringify(localdata));

    }

    // 6.删除操作
    // 6.1.删除单个商品。
    $('.item-list').on('click', '.b-action a', function() {
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.goods-item').remove();
            calc();
            removelocal($(this).parents('.goods-item').attr('sid')); //删除本地存储
        }
    });

    // 6.2.删除选中的商品。
    $('.operation a').on('click', function() {
        if (window.confirm('你确定要删除吗?')) {
            $('.goods-item:visible').each(function(index, element) {
                if ($(element).find('.cart-checkbox input').prop('checked')) {
                    $(element).remove();
                    calc();
                    removelocal($(element).attr('sid')) //删除本地存储
                }
            });
        }
    });


    // 删除本地存储对应的数据。
    // delete关键字：删除对象的属性。
    function removelocal(sid) {
        let localdata = JSON.parse(localStorage.getItem('cartdata')); //获取本地存储，转换成对象。
        delete localdata[sid];
        //重新存储
        localStorage.setItem('cartdata', JSON.stringify(localdata));
    }

}(jQuery);