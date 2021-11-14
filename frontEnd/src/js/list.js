! function($) {
    const phpurl = 'http://localhost/projectule/backEnd/';
    // 1.渲染默认的第一页
    $.ajax({
        url: phpurl + 'list.php',
        dataType: 'json'
    }).then(function(resData) {
        let arrData = resData.pagecontent;
        let str = '';
        $.each(arrData, function(index, value) {
            str += `
               <a href="detail.html?sid=${value.id}">
                    <li>
                        <img class="lazy" data-original="${value.goods_img}"/>
                        <p>${value.goods_title}</p>
                        <span>${value.goods_price}</span>
                        <span>${value.goods_number}</span>
                    </li>
               </a>
            `;
        });
        $('.list ul').html(str);

        // 2.添加懒加载
        $('img.lazy').lazyload({ effect: 'fadeIn' });

        // 3.添加分页 - https://www.jq22.com/yanshi5697/
        // 引入js和css，熟悉配置
        $('.page').pagination({ //引入分页插件的方法
            pageCount: resData.pagesize, //分页的数量(接口)
            jump: true, //是否存在跳转按钮
            coping: true, //显示首页和末页
            prevContent: '上页', //设置展示文字
            nextContent: '下页', //设置展示文字
            callback: function(api) {
                console.log(api.getCurrent()); //输出当前点击的页码
                $.ajax({
                    method: 'get',
                    url: phpurl + 'list.php',
                    data: {
                        page: api.getCurrent()
                    },
                    dataType: 'json'
                }).then(function(resData) {
                    let arrData = resData.pagecontent; //当前页面对应的数据。
                    console.log(arrData);
                    let str = '';
                    $.each(arrData, function(index, value) {
                        str += `
                           <a href="detail.html?sid=${value.id}">
                                <li>
                                    <img class="lazy" data-original="${value.goods_img}"/>
                                    <p>${value.goods_title}</p>
                                    <span>${value.goods_price}</span>
                                    <span>${value.goods_number}</span>
                                </li>
                           </a>
                        `;
                    });
                    $('.list ul').html(str);
                    $('img.lazy').lazyload({ effect: 'fadeIn' });
                })
            }
        });

        // 4.排序操作。
        // 接口地址：
        // page:控制页数，接收前端出入的页码
        // sort:排序(asc升序/desc降序)
        $('.sort button').eq(1).on('click', function() { //排序
            //点击分页进行排序,添加分页结构进行操作。
            $('.page').pagination({ //引入分页插件的方法
                pageCount: resData.pagesize, //分页的数量(接口)
                jump: true, //是否存在跳转按钮
                coping: true, //显示首页和末页
                prevContent: '上页', //设置展示文字
                nextContent: '下页', //设置展示文字
                callback: function(api) {
                    console.log(api.getCurrent()); //输出当前点击的页码
                    $.ajax({
                        method: 'get',
                        url: phpurl + 'list.php',
                        data: {
                            page: api.getCurrent(),
                            sort: 'asc'
                        },
                        dataType: 'json'
                    }).then(function(resData) {
                        let arrData = resData.pagecontent; //当前页面对应的数据。
                        console.log(arrData);
                        let str = '';
                        $.each(arrData, function(index, value) {
                            str += `
                               <a href="detail.html?sid=${value.id}">
                                    <li>
                                        <img class="lazy" data-original="${value.goods_img}"/>
                                        <p>${value.goods_title}</p>
                                        <span>${value.goods_price}</span>
                                        <span>${value.goods_number}</span>
                                    </li>
                               </a>
                            `;
                        });
                        $('.list ul').html(str);
                        $('img.lazy').lazyload({ effect: 'fadeIn' });
                    })
                }
            });

            //点击排序按钮，回到第一页并且排序
            $.ajax({
                method: 'get',
                url: phpurl + 'list.php',
                data: {
                    page: 1,
                    sort: 'asc'
                },
                dataType: 'json'
            }).then(function(resData) {
                let arrData = resData.pagecontent;
                let str = '';
                $.each(arrData, function(index, value) {
                    str += `
                       <a href="detail.html?sid=${value.id}">
                            <li>
                                <img class="lazy" data-original="${value.goods_img}"/>
                                <p>${value.goods_title}</p>
                                <span>${value.goods_price}</span>
                                <span>${value.goods_number}</span>
                            </li>
                       </a>
                    `;
                });
                $('.list ul').html(str);
                $('img.lazy').lazyload({ effect: 'fadeIn' });
            });
        });

    });


}(jQuery);