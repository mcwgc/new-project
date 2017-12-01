 //1.提供一个构造函数
 function Ball(option) {
     this._init(option);
 };
//2.设置原型对象

 Ball.prototype={
     //修整构造器属性
     constructor:Ball,
     //初始化
     _init:function (option) {
         option=option||{};
         //圆心坐标
         this.x=option.x||0;
         this.y=option.y||0;
         this.r=option.r||0;
         //颜色
         this.color=option.color||'black';
         //会变化的量
        this.dx=Math.random()*20-10;
        this.dy=Math.random()*20-10;
        this.dr=Math.random()*2+1;
     },
     //绘制的方法
     render:function (ctx) {
         ctx.save();//保存
         ctx.beginPath();//开启路径
         ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
         ctx.fillStyle=this.color;
         ctx.fill();//绘制
         ctx.restore();//还原
     },
     //更新
      update:function () {
         this.x +=this.dx;
         this.y +=this.dy;
         this.r -=this.dr;
          //判断
          if(this.r<=0){
              //删除小球
              //第一个参数：要操作的数组
              //第二个参数：要删除的元素
              //this指向小球
              ballArray=_.without(ballArray,this);
          }

      }


 };