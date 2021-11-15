! function($) {
    const lunbo = $('.lunbo'); //banner盒子
    const picList = $('.lunbo ul li'); //图片列表
    const btnList = $('.lunbo ol li'); //圆圈列表
    const left = $('.left_arrow'); //左箭头
    const right = $('.right_arrow');
    let num = null; //存储当前点击的元素的索引。
    let timer = null;

    //1.当前的圆圈列表添加类名。其他的圆圈列表移出类名。
    btnList.on('mouseover', function() {
        num = $(this).index(); 
        tabSwitch();

    });
    lunbo.hover(function() {
        left.show();
        right.show();
        clearInterval(timer); 
    }, function() {
        left.hide();
        right.hide();
        timer = setInterval(() => { 
            right.click();
        }, 3000);
    });

    right.on('click', function() {
        num++;
        if (num > btnList.length - 1) { 
            num = 0;
        }
        tabSwitch();
    });

    left.on('click', function() {
        num--;
        if (num < 0) {
            num = btnList.length - 1;
        }
        tabSwitch();
    });


    function tabSwitch() {
        btnList.eq(num).addClass('active').siblings('li').removeClass('active');
        picList.eq(num).animate({ opacity: 1 }, 200).siblings('li').animate({ opacity: 0 }, 200);
    }

    timer = setInterval(() => {
        right.click();
    }, 3000);

}(jQuery);