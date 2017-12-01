//1.提供一个构造函数
function TextCircle(option) {
    this._init(option);
}
//2.设置原型对象
TextCircle.prototype={
    //修正构造器属性
     constructor:TextCircle,
 //初始化
 _init:function (option) {
     option=option||{};
     // 坐标
     this.x=option.x||0;
     this.y=option.y||0;
     //半径
     this.outerRadius=option.outerRadius||0;
     this.innerRadius=option.innerRadius||0;
     //颜色
     this.innerFill=option.innerFill||'black';
     this.outerColor=option.outerColor||'black';
     // 文字和文字颜色
     this.text=option.text||'XXX';
     this.textColor=option.textColor||'white';
 },
    //绘制
    render:function (layerOrGroup) {
        //1.创建组
        var group=new Konva.Group({
            x:this.x,
            y:this.y
        });
        layerOrGroup.add(group);
        //2.创建内圆
        var innerCircle=new Konva.Circle({
            Radius:this.innerRadius,
            fill:this.innerFill
        });

            group.add(innerCircle);
            //3.创建圆环
        var ring=new Konva.Ring({
            innerRadius:this.innerRadius,
            outerRadius: this.outerRadius,
            fill:this.outerColor
        });
        group.add(ring);
        //4.创建文字
        var text=new Konva.Text({
            x:-this.innerRadius,
            y:-8,
            width:2*this.innerRadius,
            text:this.text,
            fontSize:16,
            align:'center'
        });
        group.add(text);
    }
}