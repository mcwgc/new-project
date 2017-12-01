   //1.提供一个构造函数
   function Girl(option) {
       this._init(option)
   };
//2.设置原型对象
   Girl.prototype={
       //修改构造属性器
       constructor:Girl,
       //初始化的方法
       _init:function (option) {
           //兼容性的处理
           option=option||{};
           //图片
           this.imgSrc=option.imgSrc;
           //裁剪的宽度和高度
           this.clipW=option.clipW||256;
           this.clipH=option.clipH||256;
           //显示的位置
           this.x=option.x||100;
           this.y=option.y||100;
           //显示的宽度和高度
           this.width=option.width||256;
           this.height=option.height||256;
           //时间
           this.duration=option.duration||300;
           //方向
           this.dir=option.dir||0;
       },
       //绘制
       render:function (ctx) {
          //备份this
           var self=this;
           //创建图片对象
           var image=new Image();
           image.src=this.imgSrc
           //索引
           var index=0;
           //图片加载完毕后进行绘制
           image.onload=function () {
               //定时器
               setInterval(function () {
                   //清屏
                   console.log(this);
                   ctx.  clearRect(self.x,self.y,self.width,self.height);
                   //绘制         image  ,裁剪X坐标，裁剪Y坐标，裁剪图片的宽度，裁剪图片的高度，放在画板X的坐标，放在画板Y的坐标，放在画板的宽度，放在画板的高度
                   ctx.drawImage(image,index*self.clipW,self.dir*self.clipH,self.clipW,self.clipH,self.x,self.y,self.width,self.height)
                   //累加索引
                   index ++;
                   //0-7  无线循环
                   index%=8;
               },self.duration)

           }
     },
     //改变方向
       changeDir:function (dir) {
       this.dir=dir;

   }
   }