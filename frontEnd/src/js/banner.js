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
        num = $(this).index(); //当前的索引
        // btnList.eq(num).addClass('active').siblings('li').removeClass('active');
        // picList.eq(num).animate({ opacity: 1 }, 200).siblings('li').animate({ opacity: 0 }, 200);
        tabSwitch();

    });

    //2.banner添加hover事件
    lunbo.hover(function() {
        left.show();
        right.show();
        clearInterval(timer); //鼠标移入关闭定时器
    }, function() {
        left.hide();
        right.hide();
        timer = setInterval(() => { //鼠标移出开启定时器
            right.click();
        }, 3000);
    });

    //3.左右箭头事件。
    right.on('click', function() {
        num++;
        if (num > btnList.length - 1) { //到了最后一张，重新从0开始
            num = 0;
        }
        // btnList.eq(num).addClass('active').siblings('li').removeClass('active');
        // picList.eq(num).animate({ opacity: 1 }, 200).siblings('li').animate({ opacity: 0 }, 200);
        tabSwitch();
    });

    left.on('click', function() {
        num--;
        if (num < 0) {
            num = btnList.length - 1;
        }
        // btnList.eq(num).addClass('active').siblings('li').removeClass('active');
        // picList.eq(num).animate({ opacity: 1 }, 200).siblings('li').animate({ opacity: 0 }, 200);
        tabSwitch();
    });


    // 4.封装切换过程，每一个事件下面都有
    function tabSwitch() {
        btnList.eq(num).addClass('active').siblings('li').removeClass('active');
        picList.eq(num).animate({ opacity: 1 }, 200).siblings('li').animate({ opacity: 0 }, 200);
    }

    // 5.自动轮播：每隔3s，主动触发右键事件，事件也叫做被动的方法。
    timer = setInterval(() => {
        right.click();
    }, 3000);

}(jQuery);