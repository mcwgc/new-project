$(function () {

    //01实现吸顶效果
    //1.监听滚动条的滚动
    //2.获取滚动条距离窗口顶部的数据值
    //3.和特定的值进行判断（临界值判断）
    //4.如果超过这个数据，那么显示顶部效果（设置对应标签的样式），否则就恢复原样
    var nav_top=$(".nav").offset().top;
     // $(window).scroll(function () {
     $(window).on("scroll",function () {

         var scroll_Top=$(window).scrollTop();
           if (scroll_Top>nav_top){
               //显示顶部
               $(".nav").css({
                   "position":"fixed",
                   "top":0,
                   "box-shadow":"0 1px 3px rgba(0,0,0,0.3)"
               });
               $('.nav img').css("opacity",1)
           }else {

               //恢复顶部
               $(".nav").css({
                   "position":"absolute",
                   "top":"100px",
                   "box-shadow":"none"

               });
               $('.nav img').css("opacity",0)
           }
     });
    //02实现返回顶部的效果
    //1.在页面添加对应的标签，设置样式
    //2.监听页面的滚动，当滚动到一定位置的时候显示标签，否则就隐藏
    //3.当我们点击标签的时候回到顶部
    $(window).on("scroll",function () {
        var scroll_Top=$(window).scrollTop();
        if (scroll_Top>nav_top){
            //设置标签显示
            $(".back_top").css({
                "display":"block"
            })
        }else{
            //设置标签隐藏
            $(".back_top").css({
                "display":"none"
            })
        }
    })
    $(".back_top").click(function () {
     document.documentElement.scrollTop=document.body.scrollTop=0;
     // $("body").animate({
     //     "scrollTop":0,
     //     'background':'red'
     })



//#003 实现添加数据的操作

//  (1) 获取添加按钮，给按钮添加点击事件
//     (2) 点击按钮之后，需要：
   var dataArray=store.get("key")||[];
    function UI(arr) {
        //清空原有的标签
        $(".task").empty();
        $("._task").empty();
        for(var i=0;i<arr.length;i++){
         if(arr[i]==undefined) continue;
            var oli= '<li data-index='+i+'>'+
                '<input type="checkbox" class="checkbox_first"'+(arr[i]["isCheck"]?"checked":"")+'>'+
                '<span class="titleClass">'+arr[i]["title"]+'</span>'+
                '<span class="span_right">删除</span>'+
                '<span class="span_right1">详情</span>'+
                '</li>' ;
          if(arr[i]["isCheck"]){
              $("._task").prepend(oli);
          }else{
              $(".task").prepend(oli);
          }

        }
    }
    UI(dataArray);
$(".nav_rightA").click(function (e) {
    e.preventDefault();
    //       [1] 获取文本框中的内容
var title=$(".nav_leftA").val();

  //添加动画效果
    //       [4] 清空文本输入框
    $(".nav_leftA").val("");
    var objM={
        "title":title,
        "isCheck":false,


    }

    // (3) 需要考虑数据存储的问题：
    // // [1] 添加一条数据之后，除了更新UI之外，还应该保存起来
    //   [2] 当刷新页面的时候，我们需要读取之前保存的数据，然后根据数据来生成界面
    dataArray.push(objM);
    store.set("key",dataArray);
    UI(dataArray);
    $(".task>li:first").hide().slideDown(500);

})

// //#004 实现添加删除的操作
// /*
// * (1) 获取删除标签，给标签添加点击事件(? 事件委托)
// * (2) 点击标签之后，需要：
// *       [1] 更新数据
// *       [2] 更新UI
    $(".task").on("click",".span_right",function () {
        //知道数组中对应的一条数据把他删掉
        var nodeLi=$(this).parent();
        var index=nodeLi.data("index");
        delete dataArray[index];
        store.set("key",dataArray);
        nodeLi.remove();
    })

    // //#005 实现Tab切换的功能
    // /*
    // * (1) 获取已完成事项和未完成事项的标签，给标签添加点击事件
    // * (2) 设置让当前的标签被选中
    // * (3) 切换事件列表
    // * */

$(".content_header ul>li").click(function () {
   $(this).addClass("oli").siblings().removeClass("oli")
    var index=$(this).index();
$(".content_body").eq(index).addClass("active").siblings().removeClass("active")
})

    // //#006 实现事件已完成标记功能
    // /*
    // * (1) 获取复选框标签，监听该标签的事件（？事件委托）
    // * (2) 更新数据
    // * (3) 更新UI
    // * */

$(".content_body").on("click",".checkbox_first",function () {
    //获取当前标签复选框的状态
    var status=$(this).is(":checked");
    //获取当前便签的父标签，并且获取对应的索引
    var node=$(this).parent();
    var index=node.data("index");
    //根据索引获取当前标签对应的数据
    var objM=dataArray[index];
    objM.isCheck=status;
    dataArray[index]=objM;
    //同步数据
    store.set("key",dataArray);
    //更新UI
    UI(dataArray);
})

// #007 实现展示详情信息
//
//  (1) 获取详情标签，添加点击事件（事件委托）
// (2) 当点击详情的时候，弹出蒙版和展示信息
//  (3) 关闭蒙版
//       [1] 点击灰色背景的时候（mask）
//        [2] 点击关闭标签的时候

    var tmp;
$(".content_body").on("click",".span_right1",function () {

    $(".mask").fadeIn(1000);

//使用当前标签对应的数据来设置蒙版
    var index=$(this).parent().data("index");
    tmp=index;
    var objM=dataArray[index];
    console.log(objM);
    $(".title").text(objM.title);
    $("#textareaID").val(objM.contentText);
    $("#inputID").val(objM.time);

})
    $(".mask").click(function () {
        $(this).focusout(1000);
    });
    $(".close").click(function () {

        $(".mask").focusout(1000);
    })
    $(".detail_content").click(function (e) {
        e.stopPropagation()
    })

    //008 更新详情的功能
    //
    // (1) 获取更新详情的按钮标签，添加点击事件
    //  (2) 根据最新的数据来设置dataArray,同步数据
    // (3) 关闭蒙版

    $("#updateBtnID").click(function () {
        var objM=dataArray[tmp];
        objM.contentText=$("#textareaID").val();
        objM.time=$("#inputID").val();
        dataArray[tmp]=objM;
        //同步数据
        store.set("key",dataArray);
        $(".mask").fadeOut(1000);
    })
    //
    $.datetimepicker.setLocale("ch")
    $("#inputID").datetimepicker();





     })