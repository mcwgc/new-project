//1.提供一个自定义的构造函数
function  ColorBall(option) {
    this._init(option);
}
//2.设置原型对象
ColorBall.prototype={
    //修正构造器属性
    constructor:ColorBall,
    //初始化的方法
    _init:function (option) {
        option=option||{};
        //圆心坐标
        this.x=option.x||0;
        this.y=option.y||0;
        //路径
        this.r=option.r||0;
        //颜色
        this.color=option.color||"black";
        //变化的量
        this.dx=Math.random()*20-10;//0~20 ->-10~10
        this.dy=Math.random()*20-10;
        this.dr=Math.random()*2+1;//保证至少变化1
    },
    //绘制
    render:function (ctx) {
        ctx.save();//保存状态
        ctx.beginPath() ;//开启路径
        //路径
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        //填充颜色
        ctx.fillStyle=this.color;
        //填充
        ctx.fill();
        ctx.restore();
    },
    //更新
    update:function () {
        this.x +=this.dx;
        this.y +=this.dy;
        this.r +=this.dr;

    //判断
    if(this.r<=0){
        //this.r=0;
    //删除小球
    //第一参数：要操作的数组
    //第二参数：要参数的元素
    //this指向小球
    ballArray=_.without(ballArray,this)
        }
    }

}

