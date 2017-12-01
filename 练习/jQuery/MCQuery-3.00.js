//1.提供闭包的结构
(function (windon,undefined) {
    //2.定义jQuery工厂函数
    var MCQuery=function (selector) {
        return new MCQuey.fn.init(selector)
    };
    //3.设置jQuery的原型对象
    MCQuery.fn=MCQuery.prototype={
        constructor:MCQuery,
        init:function (selector) {
            //[1]条件判断为假
            if (!selector){
                //返回空的jQuery[init]对象
                return this
            }
            //[2]字符串
            else if(MCQuery.toISOString(selector))
            {
                //容错性处理：清除空格
                selector=MCQuery.trim(selector);

                //[2-1] 标签

                //返回jQ实例对象，把参数中传递一级标签以键值对的方式保存到jQ实例对象中返回，key从0开始依次递增
                //思考：如何判断字符串是否是标签
                //"<div>" “<>”
                //"div"
                //① 以<开头
                //② 以>结尾
                //③ 长度限制 至少三个字符
                if(MCQuery.ishtml(selector))
                {
                    //console.log("是标签");
                    //具体的处理
                    //结果返回...
                    // console.log($("<div>我ishi</div><div>我ishi</div>"));
                    //var obj = {};
                    //{0:selector};
                    //this[0] = selector;

                    //001 参数转换为标签（字符串--->标签）
                    //innerHTML?innerText
                    var oDiv=document.createElement('diiv');
                    oDiv.innerHTML=selector;
                    //console.log(oDiv.children);
                    //console.log("+++");
                    //002 遍历所有的一级标签，没遍历一次就保存到jQ实例对象
                    //var nodes = oDiv.children;
                    //var len = nodes.length;
                    //for(var i= 0 ;i<len;i++)
                    //{
                    //console.log(nodes[i]);
                    // this[i] = nodes[i];
                    //}
                    //this.length = nodes.length;
                    //003 把处理好的jQ对象返回
                    [].push.apply(this,oDiv.children);
                    //return this;
                }
                //[2-2]选择器
                else{
                    //"div"   ---> 获取所有的div保存到实例对象中返回
                    //".class1" --> 获取所有类为class1的标签保存到实例对象中返回
                    //#demo
                    //001 根据参数来获取指定的所有标签
                    //var nodes = document.querySelectorAll(selector);

                    //002 把所有的标签保存到对象中
                    //for(var i = 0;i<nodes.length;i++)
                    //{
                    //this[i] = nodes[i];
                    //}
                    //this.length = nodes.length;
                    [].push.apply(this,document.querySelector(selector));
                    //把对象返回
                    //return this；
                }
            }
            //数组
            else if(MCQuery.isArray(selector)){
                //返回jQ实例对象，把数组中每个元素依次取出并作为value的值保存到对象中返回，key从0开始依次递增
                //console.log("是数组");
                [].push().apply(this,selector);
                //return this;

            }
            //伪数组
            else if(MCQuery.isLikeArray(selector)){
                //console.log("是伪数组");
                //遍历selector，把selector里面所有的元素都依次取出保存到this这个对象，更新length的值
                //伪数组 ---> 数组var arrM = [];
                //var arrM = [];
                //for(var i = 0;i<selector.length;i++)
                //{
                //arrM.push(selector[i]);
                //}
                [].push().apply(this,[].slice.apply(selector));
                //return this;
            }
            //函数
            else if(MCQuery.isFunction(selector)){
                if (document.readayState=='complete')selector();
                //检查是否 addEventListener方法，如果支持使用
                if(document.addEventListener){
                    document.addEventListener('DOMContentLoaded',selector)
                }
                else{
                    document.attachEvent('onreadystatechang',function () {
                        if(document.readyState=='complete'){
                            selector();
                        }
                    })
                }
            }
            //其他情况
            else{
                this[0]=selector;
                this.length=1;
            }

        },
        ready:function (fn) {
            return this.init(fn);

        },
        jQuery:'2.0.0',
        length:0,
        selector:'',
        toArray:function () {
            // console.log("++++");
            // console.log(this);
            // console.log("++++");
            // var arrM = [];
            // for(var i in this)
            // {
            //     if(Object.hasOwnProperty(i))
            //     {
            //         arrM.push(this[i]);
            //     }
            //
            // }
            // return arrM;
            return [].slice.apply(this);
        },
get:function (index) {
    //没有参数的情况
    if(arguments.lengeh==0){
        return this.toArray();

    }
    //参数为正数的情况
    else if(arguments.length==1 && index >=0)
    {
        return this[index];
    }else if (arguments.length==1&& index<0){
        //0 1 2
        //-1 倒数第一个  2  -1 + 3 == 2
        //-2 倒数第二个  1  -2 + 3 == 1
        //-3 倒数第三个  0  -3 + 3 == 0
        //===？ length + index
        return this[this.length +index];
    }
       },
        eq:function (index) {
            // 没有参数，返回空的实例对象
            if(arguments.length==0){
                return $();
            }
            //(2) 传递参数
            /*
            else if(arguments.length ==1 && index >=0)
            {
                //DOM ---> jQ
                return $(this[index]);
            }
            else if(arguments.length == 1 && index <0)
            {
                return $(this[this.length + index]);
            }*/
            else{
                return $(this.get(index));
            }
        },
        first:function () {
            return this.eq(0)
        },
        last:function () {
            return this.eq(-1);
        },
        push:Array.prototype.push,
        sort:[].sort,
        splice:[].splice
    }
    // 设置init方法的原型对象共享
    MCQuery.fn.init.prototype=MCQuery.fn;

    //05 访问的问题(在外面要访问闭包内部的数据)
    //[1] 在闭包中通过返回函数来实现
    //[2] 把变量绑定给全局变量 （jQ）
    windon.MCQuery=MCQuery.$=MCQuery;
    //抽取工具方法
    MCQuery.prototype.extend=MCQuery.extend=function (obj) {
        for(var i in obj)
        {
            this[i]=obj[i];
        }

    }
    MCQuery.extend({
        isString:function (string) {
            return typeof string=='string';
        },
        ishtml:function (html) {
            return html.chatAt(0)=='<'&&html.chatAt(html.length-1)=='>'&& html.length>=3
        },
        trim:function (str) {
            //消除这个字符串前面或者后面的空格
            if(str.trim){
                return str.trim();
            }
            else{
                return str.replace(/^\s+|\s+$/g,'')
            }

        },
        isArray:function (arr) {
            if (Array.isArray){
                return Array.isArray(arr);
            }
            else {
                return Object.prototype.toString().call(arr)=='[object Array]'
            }
        },
        isArray:function (obj) {
            //重点：伪数组的判断
            //(1) 是对象   typeof obj == "object"
            //(2) 拥有length属性 "length" in obj
            //(3) 拥有length-1这个属性
            //(4) 不是window  ? 如何判断
            return this.isObject(obj)&&'length' in obj && obj.length-1in obj&&!this.isWindow(obj)
        },
        isObject:function (obj) {
            return typeof  obj == 'object' && obj  !=null;
        },
        isWindow:function (w) {
            return w==window.window;
        },
        isFunction:function (fn) {
            return typeof  fn =='function';
        }
    });
                MCQuery.prototype.extend({
                    isGoodMan:function () {
                        console.log('别看了，她早已走远');
                    }
                })
//操作样式的方法
    MCQuery.prototype.extend({
        attr:function (paramA,paramB) {
            //判断：没有参数(报错)|一个参数[2]（获得第一个标签属性节点的值）|
            if (arguments.length==0){
                throw'参数错误';

            }else if(arguments.length==1) {
                if (MCQuery.isObject(paramA)) {
                    // 是对象
                } else {
                    return this[0].getAttribute(paramA);
                }
            }else if(arguments.length==2)
                {
                    //...
                }
            },
            css:function(){

            },
        addClass:function () {

        },
        removeClass:function () {

        },
        toggleClass:function () {

        },
        hasClass:function () {

        },
        text:function () {

        }
    })
    //操作网络请求
    MCQuery.extend({
        each:function (objM,fn) {
            //..........
            //遍历第一个参数(数组|对象|伪数组)
            //每循环一次，就把当前的键值对传递给回调函数
            //for（i objM）
            //{
            //    fn(i，objM[i])
            //}
            //判断数组和伪数组
            if (MCQuery.isArray(objM)||MCQuery.isLikeArray(objM)){
                //for
                for(var i=0,len=objM.length;i<len;i++){
                    //主动绑定函数中this指向，设置让this指向value的值
                    //obj1.show.call(obj2);
                    //window.fn(i,objM[i]);
                    //window.fn.call(objM[i],i,objM[i])

                    //参数：
                    //第一个参数：fn函数中this绑定的对象
                    //后面的两个参数：作为实际参数传递给fn的
                    var endValue=fn.call(objM[i],i,objM[i])

                    //break:结束循环
                    //continue：跳出当前循环继续执行下一个循环
                    //break;
                    //console.log(endValue);
                    if(endValue==false)break;
                }

            } else if(MCQuery.isObject(objM)){
                //for  in
                for(var i in objM)
                {
                    //fn(i,objM[i]);
                    if (fn.call(objM[i]),i,objM[i]==false)break;
                }
            }
        },
        map:function (objM,fn) {
            var arrM=[];
            //........
            //判断数组和伪数组
            if(MCQuery.isArray(objM)||MCQuery.isLikeArray(objM))
            {
                //for
                for(var i=0,len=objM.length;i<len;i++)
                {
                    arrM.push(fn(objM[i],i));
                }
            }else if(MCQuery.isObject(objM)){
                //for  in
                for (var i in objM){
                    arrM.push(fn(objM[i],i));
                }
            }
            return arrM
        }
    })
        MCQuery:prototype.extend({
        each:function (fn) {
            MCQuery.each(this,fn);
        }
    })
    //操作样式的的方法
                   MCQuery:prototype.extend({
        attr:function (paramA,paramB) {
            //判断：没有参数（报错）|一个参数[2]（获取第一个标签属性节点的值）|
            if(arguments.length==0||(!MCQuery.isObject(paramA)&&!MCQuery.isString(paramA)))
            {
                throw '参数错误';
            }   else if (arguments.length==1){
                if (MCQuery.isObject(paramA)){
                    //是对象..
                    //paramA == {"A":"DEMO-A","B":"DEMO-B"}
                    //遍历所有的DOM标签
                    //for(var i = 0 ;i<this.length;i++)
                    //{
                    //console.log(this[i]);  div
                    //for(var key in paramA)
                    //{
                    //把当前的属性节点值设置到标签上面
                    //this[i].setAttribute(key,paramA[key]);
                    //}
                    //}
                    this.each(function (index,dom) {
                        $.each(paramA,function (key,value) {
                            dom.setAttribute(key,value);
                        })
                    })
                }
                else {
                    return this[0].getAttribute(paramA);

                }
            }
            else if (arguments.length==2){
                //....
                //paramA ==> A
                //paramB ==> DEMO-A
                //for(var i = 0 ;i<this.length;i++)
                //{
                //jQ.attr("key',"value")
                // this[i].setAttribute(paramA,paramB);
                //}
                this.each(function (index,dom) {
                    //dom当前的标签==this
                    dom.setAttribute(paramA,paramB);
                })
            }
        },
        removeAttr:function (name) {
            //判断是否传递了参数
            //   if(arguments.length == 0)
            //   {
            //       return this;
            //   }else
            if (arguments.length==1){

                //批量删除标签中对应的属性节点
                //遍历实例对象，获取每个标签实现删除
                //for(var i = 0;i<this.length;i++)
                //{
                //this[i].removeAttribute(name);
                //}
                this.each(function (index,dom) {
                    //this  指向的是当前dom的值
                    this.removeAttribute(name);
                    //dom:removeAttribute(name)
                })
            }
            return this;
        },
                       prop:function (paramA,paramB) {
                           if (arguments.length==0||(!MCQuery.isObject(paramA)&&!MCQuery.isString(paramA))){
                               throw '参数错误';
                           }
                           else if (arguments.length==1){
                               if (MCQuery.isObject(paramA)){
                                   //是对象..
                                   //paramA == {"A":"DEMO-A","B":"DEMO-B"}
                                   //遍历所有的DOM标签
                                   //for(var i = 0 ;i<this.length;i++)
                                   //{
                                   //console.log(this[i]);  div
                                   //for(var key in paramA)
                                   //{
                                   //把当前的属性节点值设置到标签上面
                                   //this[i].setAttribute(key,paramA[key]);
                                   //}
                                   //}
                                   this.each(function (index,dom) {
                                       $.each(paramA,function (key,value) {
                                           //dom.setAttribute(key,value);
                                           //给标签设置属性
                                           dom[key]==value;

                                       })
                                   })
                               }
                               else {
                                   //....
                                   //return this[0].getAttribute(paramA);
                                   return this[0][paramA];
                               }
                           }
                           else if(arguments.length == 2){

                               //....
                               //paramA ==> A
                               //paramB ==> DEMO-A
                               //for(var i = 0 ;i<this.length;i++)
                               //{
                               //jQ.attr("key',"value")
                               // this[i].setAttribute(paramA,paramB);
                               //}
                               this.each(function (index,dom) {
                                   //dom当前的标签 == this
                                   //dom.setAttribute(paramA,paramB);
                                   dom[paramA] = paramB;
                               })
                           }
                           return this;
                       },

                 })
    MCQuery.prototype.extend({
        addClass:function (name) {
            //检查参数：
            if (arguments.length==1&&MCQuery.isString(name)){

                //(1) 遍历实例对象本身
                //(2) 拿到当前的DOM标签
                //(3) 判断当前标签中是否存在指定的样式，如果不存在那么就添加，否则就不动
                // this.each(function () {
                //     //this ==》 DOM  并不是jQ实例对象
                //     if(!$(this).hasClass(name))
                //     {
                //         //拿到标签的class
                //         this.className = XMGQuery.trim(this.className +" "+ name);
                //     }
                // })
                //AAA
                //["demo", "AAA"]
                //(4) 先切割字符串==>数组
                var arrM = name.split(" ");
                var self = this;
                $.each(arrM,function (index,classValue) {
                    //classValue demo|AAA
                    //console.log(classValue);
                    self.each(function (key,value) {
                        if(!$(this).hasClass(classValue))
                        {
                            //拿到标签的class
                            console.log("+++不存在指定的标签");
                            this.className = XMGQuery.trim(this.className +" "+ classValue);
                        }
                    });
                })
            }
            return this;
        },
        removeClass:function (name) {
            //没有参数的情况：清空所有标签的样式
            if(arguments.length==0){

                this.each(function () {
                    this.className='';
                })
            }
            //传递参数：遍历所有标签，如果该标签中存在这个样式，那么就删除
            else if(arguments.length==1&&MCQuery.isString(name)){
                var arrM = name.split(" ");
                var self = this;

                $.each(arrM,function (index,classValueT) {
                    self.each(function () {

                        //this当前的DOM标签
                        if ($(this).hasClass(classValueT)) {
                            //先拿到className之后，替换字符串
                            var classValue = " " + this.className + " "
                            this.className = XMGQuery.trim(classValue.replace(" " + classValueT + " ", " "));
                        }
                    })
                });
            }
        },
        toggleClass:function (name) {
            //没有参数：清空所有标签的样式 ==> removeClass()
if(arguments.length==0){
    return this.removeClass();
}else if(arguments.length==1&&MCQuery.isString(name)){
    //遍历所有标签，检查是否存在指定的样式
    this.each(function () {
        if($(this).hasClass(name))
        {
            console.log("___",name);
            $(this).removeClass(name);
        }else{
            console.log("+++");
            $(this).addClass(name);
        }
    })
}
return this;
        },
        hasClass:function (classValue) {
            //检查指定标签中是否存在特定的样式（class）,如果某个标签中存在那么就返回true,如果所有的标签中都没有，那么就返回false
            var flag = false;
            //遍历实例对象
            this.each(function (index,dom) {
                //dom == this == 当前的标签
                //(1) 获取class字符串
                var className = " " + this.className + " ";   //a bb c
                //(2) 匹配
                if(className.indexOf(" " + classValue + " ") != -1)  //bb
                {
                    flag = true;

                    //退出循环
                    return false;
                }
            })
            return flag;
        }

    })
    //操作DOM的方法
    MCQuery.prototype.extend({
        remove:function () {
            //遍历jQ实例对象，获取当前标签的父标签，调用removeChild方法来删除
            this.each(function () {
                //this == 当前标签
                var fatherNode = this.parentNode;
                fatherNode.removeChild(this);
            })

            return this;
        },
        empty:function () {
            //遍历jQ实力对象（DOM标签），没循环一次就吧当前的标签的innerHTML设置为"",最后返回this
            //for(var i = 0 ;i<this.length;i++)
            //{
            //this[i] ==》 当前的标签
            //this[i].innerHTML = "";
            //}

            this.each(function () {
                this.innerHTML = "";
            })
            return this;
        },
        html:function (html) {
            //总结：
            //没有参数：返回第一个标签的标签内容（innerHTML）
            //传递参数：批量设置所有标签的内容
            //返回值：jQ实力对象本身
            if(arguments.length == 0)
            {
                return this[0].innerHTML;
            }else if(arguments.length == 1)
            {
                this.each(function () {
                    this.innerHTML = html;
                })
            }
            return this;
        },
        text:function (text) {
            if(arguments.length == 0 )
            {
                //return this[0].innerText;
                var str = "";
                //for(var i = 0;i<this.length;i++)
                //{
                //str = str + this.innerText;
                //str += this[i].innerText;
                //}

                this.each(function (key,value) {
                    //this ==> value
                    str += this.innerText;
                })

                return str;
            }
            else if(arguments.length ==1 )
            {
                this.each(function(){
                    this.innerText = text;
                })
            }
            return this;
        },
        appendTo:function (jQ) {
            //（1）遍历当前的jQ实例对象(this)
            // for(var i = 0 ;i<this.length;i++)
            // {
            //     var dom = this[i];
            //     //（2）遍历接收到的参数(jQ)
            //     for(var j = 0;j<jQ.length;j++)
            //     {
            //         if (j == 0)
            //         {
            //             jQ[j].appendChild(dom);
            //         }
            //         else
            //         {
            //             jQ[j].appendChild(dom.cloneNode(true));
            //         }
            //     }
            // }
            //each改写：
            jQ = $(jQ);
            var arrM = [];
            this.each(function () {
                var self = this;
                $.each(jQ,function (j,value) {
                    if (j == 0)
                    {
                        this.appendChild(self);
                        arrM.push(self);
                    }
                    else
                    {
                        var temp = self.cloneNode(true);
                        this.appendChild(temp);
                        arrM.push(temp);
                    }
                })
            })

            return $(arrM);
        },
        append:function (jQ) {
            //console.log($("li").appendTo($("div")));
            //console.log($("div").append($("li")))
            //
            //jQ.appendTo(this);
            if(!XMGQuery.isObject(jQ))
            {
                this.each(function () {
                    this.innerHTML += jQ;
                })
            }else
            {
                jQ.appendTo(this);
            }
        },
        prependTo:function (jQ) {
            //prependTo:把选中的所有标签都插入到指定标签内容的前面
            //$("li").prependTo($("div"));
            //this.prependTo(jQ)
            if(arguments.length==0){
                return $();
            }
            jQ=$(jQ);
            var arrM=[];
            //(1) 遍历JQ实例对象，拿到每一个人li标签
            this.each(function () {
                //this==>当前的li标签  li1 li2 li3..
                var self=this;
                //(2)遍历接收到的参数
                jQ.each(function (j) {
                    //this ==> 当前的div标签
                    //(3) 把每个li标签插入到当前div标签内容的前面
                    //insertBefore参数说明：
                    //第一个参数：要插入的标签
                    //第二个参数：插入到哪里
                    if(j == 0)
                    {
                        this.insertBefore(self,this.lastChild);
                        arrM.push(self);
                    }else{
                        this.insertBefore(self.cloneNode(true),this.lastChild);
                        arrM.push(self.cloneNode(true));
                    }

                })
            })
            return $(arrM);
        },
        prepend:function (jQ) {
            if(!XMGQuery.isObject(jQ))
            {
                this.each(function () {
                    this.innerHTML =  jQ + this.innerHTML;
                })
            }else
            {
                jQ.prependTo(this);
            }

            return this;
        }
    })
    //操作事件的方法
    MCQuery.prototype.extend({
        on:function (type,fn) {
            //遍历JQ实例对象，给所有的标签添加事件
            this.each(function () {
                //this==>当前DOM标签
                $.addEvent(this,type,fn);

            })
            return this;
        },
        off:function (type,fn) {
            //遍历jQ实例对象，给所有的标签添加事件
            this.each(function () {
                //this指向DOM的标签
                console.log('+++');
                $.removeEvent(this,type,fn);
            })
            return this;
        },
        click:function (fn) {
            this.on('0click',fn);
        },
        mouseenter:function (fn) {
            this.on('mouseenter',fn);
        }
    })
    MCQuery.extend({
        addEvent:function (dom,type,fn) {
            if(dom,nodeType !=1||MCQuery.isString(type)){
                throw '参数错误';
            }
            if(dom.addEventListener){
                dom.addEventListener(type,fn);
            }
            else{
                dom.attachEvent('on'+type,fn);
            }
        },
        removeEvent:function (dom,type,fn) {

            if (dom.nodeType!=1||MCQuery.isString(type)){
                throw '参数错误';
            }
            //判断fn没有传参的情况
            //if(fn == undefined)
            //{
            //要获取所有点击事件相关的方法
            //遍历
            //}
            if(dom.removeEventListener){
                console.log('~~~~~');
                dom.removeEventListener(type,fn);

            }else {
                dom.detachEvent('on' + type, fn);
            }

        }
    })
    //05 访问的问题(在外面要访问闭包内部的数据)
    //[1] 在闭包中通过返回函数来实现
    //[2] 把变量绑定给全局变量 （jQ）
    window.MCQuery=window.$ = MCQuery;
})(window);