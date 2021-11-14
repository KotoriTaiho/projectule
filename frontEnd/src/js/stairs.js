! function($) {
    const loutinav = $('#loutinav'); //楼梯包含框
    const louti = $('#loutinav li').not('.last'); //楼梯,排除回到顶部
    const last = $('.last'); //回到顶部按钮
    const louceng = $('.show1');
    let num = null;

    // 1.显示隐藏整个楼梯（事件或者没有事件的情况都应该符合下面的条件，封装函数）
    function scrollEvent() {
        let scrolltop = $(window).scrollTop(); //滚动条的top值
        if (scrolltop >= 400) {
            loutinav.show();
        } else {
            loutinav.hide();
        }
        // 3.拖到滚动条，左侧的楼梯根据文档中楼层自动激活。
        // 楼层的位置是 - 已知的(第一层1000，第二层1600)
        // 滚动条的距离 - 可以获取
        // 思路：如果楼层的top值>滚动条的距离，激活对应的左侧的楼梯
        louceng.each(function(index, element) { //index:索引  element:原生js的元素
            let loucengtop = $(element).offset().top; //如果盒子的高度不一致，修改这里的值进行判断
            if (loucengtop >= scrolltop) {
                louti.eq(index).addClass('active').siblings('li').removeClass('active');
                return false; //终止循环，每一次触发滚轮，进行比较，满足一个立刻结束。
            }
        });


/*         $('title').html(scrolltop); */
    }
    scrollEvent(); //函数先调用一次
    $(window).on('scroll', function() {
        scrollEvent();
    });

    // 2.点击左侧的楼梯，右侧的楼层滚动到对应的位置。
    // 点击左侧的楼梯，获取对应的楼层的top值，将其赋给滚动条的top值(运动)。
    // 楼梯和楼层是一一对应关系(映射关系)
    louti.on('click', function() {
        $(window).off('scroll'); //取消scroll事件
        //当前点击的楼梯添加active，其他的移除active
        num = $(this).index();
        louti.eq(num).addClass('active').siblings('li').removeClass('active');
        //获取对应的楼层的top值
        let loucengtop = louceng.eq(num).offset().top;
        // document.documentElement.scrollTop  原生js
        // $(window).scrollTop();  jq
        //运动方法赋值的方式
        $('html').animate({
            scrollTop: loucengtop
        }, function() { //点击事件完成，开启滚轮事件
            $(window).on('scroll', function() {
                scrollEvent();
            });
        });
    });
    // 4.点击左侧楼梯，active激活状态会上下移动，影响视觉。
    // 思路：点击左侧楼梯，停止滚轮事件，左侧楼梯事件完成，开启滚轮事件。
    // $(window).off('scroll'); //取消scroll事件

    // $(window).on('scroll', function() {//点击事件完成，开启滚轮事件
    //     scrollEvent();
    // });

}(jQuery);