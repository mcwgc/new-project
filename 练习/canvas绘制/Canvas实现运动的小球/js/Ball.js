//1.提供一个自定义的构造函数
function  Ball(option) {
    this._init(option);
}
//2.设置原型对象
Ball.prototype={
    //修正构造器属性
    constructor:Ball,
    //初始化的方法
    _init:function (option) {
        option=option||{};
        //坐标
        this.x=option.x||{};
        this.y=option.y||{};
        //半径
        this.r=option.r||{};
        //颜色
        this.fillColor=option.fillColor||"black";
        //速度
        this.spend=option.spend||1;

},
    //绘制
    render:function (ctx) {
    ctx.save();//保存状态
    ctx.beginPath();//开启路径
    //绘制
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.fillStyle=this.fillColor;
    ctx.fill();
    ctx.restore();//还原状态
},
    update:function () {
        //速度
        this.x +=this.spend
    }
}