$(function () {
   //1.根据屏幕的变化设置对应的样式
    $(window).on('resize',changeStyle);
    changeStyle();
    function changeStyle() {
        //获取屏幕的宽度和对应的某个具体的值比较然后设置对应的样式
        var clientW=$(window).width();
        //设置一个布尔值来表示是否显示对应的大图，我们如果屏幕的宽度大于790
        var showLg= clientW >=790;
        //如果是大屏幕我们就显示对应的大的背景图，我们就需要获取所有的div，然后遍历设置每一个div的背景
        var items=$('#wjs-show .item') ;
        //遍历所有的items然后设置每一个item的背景
        items.each(function (index,value) {
            //value是js对象，所以我们需要把这个对象设置为jquery对象
            var $item=$(value);
        // * 获取对应的数据*/
            var src = showLg?$item.data('lg-img'):$item.data('sm-img');
            //设置具体的样式‘
            var bgUrl='url('+src+')';
            $item.css({
                backgroundImage:bgUrl
            })

            //当小屏幕的时候，我们需要设置小图，我们要给对应的div添加一个img标签
            // var img='<img src="'+src+'" alt="123">';
            var img='<img src='+src+' alt="123">';
            if (!showLg){
                //显示小图，一般我们在添加新的小图之前清空掉旧的
                $item.empty().append(img)
            }else{
                //表示显示大图，当显示大图的时候，我们需要把对应的小图清空
                $item.empty();
            }
        })
    }

    //2.设置对应的进度条，监听屏幕的变化
    $(window).on('resize',changeW);
    changeW();
    function changeW() {
       //获取ul标签
       var oul=$('#wjs-product .nav');
       var parentW=oul.parent().width();
       //获取所有的li然后获取总的长度
        var oli=$('li[role="presentation"]');
        //遍历li设置总长度
        var totalLengeh=0;
        oli.each(function (index,value) {
            totalLengeh +=$(value).width();
        })
        //比较，如果当总长度大于parentW的时候，我们让对应的进度条显示，只需让ul的宽度设置为总的长度
        if (totalLengeh>=parentW){
            oul.css({
                width:totalLengeh
            })
        }else{
            //当小于的时候，我们设置让对应的属性移出就可以了
            oul.removeAttr('style');
        }

    }
    
});