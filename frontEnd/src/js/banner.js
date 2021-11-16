! function($) {
    const lunbo = $('.lunbo'); 
    const picList = $('.lunbo ul li'); 
    const btnList = $('.lunbo ol li'); 
    const left = $('.left_arrow'); 
    const right = $('.right_arrow');
    let num = null;
    let timer = null;

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