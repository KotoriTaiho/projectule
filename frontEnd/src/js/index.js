!function($){
    const phpurl = 'http://localhost/projectule/backEnd/';
    $.ajax({
        url: phpurl + 'index.php',
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
    
})
}(jQuery);