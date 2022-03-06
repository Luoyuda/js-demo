(() => {
  Math.pow(2, 53) - 1 === Number.MAX_SAFE_INTEGER
  - (Math.pow(2, 53) - 1) === Number.MIN_SAFE_INTEGER
})();

(() => {
  1 + 1 // 2
  true + true // 2
  1 + true // 2
  'a' + 'bc' // "abc"
  1 + 'a' // "1a"
  false + 'a' // "falsea"
  '3' + 4 + 5 // "345"
  3 + 4 + '5' // "75"
  1 - '2' // -1
  1 * '2' // 2
  1 / '2' // 0.5
  {} + 2 // "[object Object]2"
  var obj = {
    valueOf: function () {
      return 1;
    }
  };
  obj + 2 // 3
  var obj = {
    toString: function () {
      return 'hello';
    }
  };
  obj + 2 // "hello2"
  var obj = new Date();
  obj.valueOf = function () { return 1 };
  obj.toString = function () { return 'hello' };
  obj + 2 // "hello2"
});

(() => {
  console.table(
    [1, null, undefined, '1', false, Symbol(''), 
  {a: 1}, [2], function(){}]
  .map(v => [v, function(){ 
    this.a = 2
    return v
  }])
  .map(([ret, Constructor]) => [Object.prototype.toString.call(ret), 
    new Constructor()])
  )
});

(() => {
  let x = 1;
  function a(){
    let y = 2;
    function b(){
      let z = 3;
      console.log(x, y, z)
    }
  }
});

(() => {
  class A {}
  A.__proto__ === Function.prototype // true
  A.prototype.__proto__ === Object.prototype // true
  
  class B extends A{}
  
  let a = new A()
  let b = new B()

  B.__proto__ === A
  B.prototype.__proto__ === A.prototype

  b.__proto__ === B.prototype
  b.__proto__.__proto__ === A.prototype
  b.__proto__.__proto__ === a.__proto__

  Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }
  // B 的实例继承 A 的实例
  Object.setPrototypeOf(B.prototype, A.prototype);

  // B 继承 A 的静态属性
  Object.setPrototypeOf(B, A);

})();

(() => {
  url.addEventListener('click',function(event){
    var target = event.target ||  event.srcElement;
    if(!!target  && target.nodeName.toUpperCase() === "LI"){
      console.log(target.innerHTML);
    }
  },false);
});

(() => {
  // 创建新节点
  createDocumentFragment() //创建一个DOM片段
  createElement() //创建一个具体的元素
  createTextNode() //创建一个文本节点
  // 添加、移除、替换、插入、复制
  appendChild() //添加
  removeChild() //移除
  replaceChild() //替换
  insertBefore() //在已有的子节点前插入一个新的子节点
  cloneNode() //复制
  //查找
  getElementsByTagName() //通过标签名称
  getElementsByName()//通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于 name值的)
  getElementById() //通过元素Id，唯一性
  querySelector() // . # 查找元素
  querySelectorAll() // 查询所有元素
});

(() => {
  // 窗口关系
  window.top // 最上层窗口（浏览器本身）
  window.self // 始终指向window对象自己
  window.parent // 指向当前窗口的父窗口
  // 窗口位置与像素比
  window.moveTo(x,y);//移动到（x，y）位置，x,y为绝对坐标
  window.moveBy(0,100); //窗口向下移动100px,参数为当前的相对位置
  window.devicePixelRatio; //像素比，手机屏幕的物理像素和css像素的比
  // 窗口大小
  window.innerWidth; //页面视口的宽度（不包含浏览器边框和工具栏）
  window.innerHeight; //页面视口的高度（不包含浏览器边框和工具栏）
  window.outerWidth; //浏览器自身宽度 （包含浏览器边框和工具栏）
  window.outerHeight; //浏览器自身高度
  window.resizeTo(100,100); //缩放到多少
  window.resizeBy(100,100); //在自身基础上缩放多少
});

(() => {
//   // 视口位置
//   window.scroll(0, 100); // 相对于当前视口向右滚动 40 像素
//   window.scrollBy(0, 100); // 相对于当前视口向右滚动 40 像素(与window.scroll相同)
//   window.scrollTo({ // 滚动到距离屏幕左边及顶边各 100 像素的位置(scroll,scrollBy也可以用此写法)
//     left: 100,
//     top: 100,
//     behavior: 'smooth' //smooth平滑滚动，auto自动
//   });
//   // 导航与打开新窗口
//   window.open(strUrl, strWindowName, strWindowFeatures) : WindowObjectReference
//   // 系统对话框
//   alert()  // 警告框，只有确认按钮
//   confirm() // 确认框，有确定，取消按钮
//   prompt() // 提示框，有确认，取消按钮，和一个输入框
//   window.print() // 显示打印对话框
//   window.find() // 显示查找对话框（ctrl+F）

//   history.go(); //方法可以在用户历史记录中沿任何方向导航，可以前进也可以后退。
//   history.back();// 后退一页
//   history.forward();// 前进一页
//   history.pushState(); // 新建当前的历史记录项
//   history.replaceState() // 修改当前的历史记录项
// <form action="" method="get">
//     <p>邮箱标签: <input type="email"></p>
//     <p>数字标签: <input type="number"></p>
//     <p>滑动条标签: <input type="range"></p>
//     <p>搜索框标签: <input type="search"></p>
//     <p>日期框: <input type="date"></p>
//     <p>星期框: <input type="week"></p>
//     <p>月份框: <input type="month"></p>
//     <p>颜色框: <input type="color"></p>
//     <p>网址框: <input type="url"></p>
//     <div>
//       <input type="submit">
//       <input type="reset">
//     </div>
// </form>
});

(() => {
  function deepCopy(obj) {
    // Hash表 记录所有的对象引用关系
    let map = new WeakMap();
    function dp(obj) {
        let result = null;
        let keys = null,
            key = null,
            temp = null,
            existObj = null;
        
        existObj = map.get(obj);
        // 如果这个对象已被记录则直接返回
        if (existObj) {
            return existObj;
        }
        keys = Object.keys(obj);
        result = {};
        // 记录当前对象
        map.set(obj,result);
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            temp = obj[key];
            // 如果字段的值也是一个对象则递归复制
            if (temp && typeof temp === 'object') {
                result[key] = dp(temp);
            } else {
                // 否则直接赋值给新对象
                result[key] = temp;
            }
        }
        return result;
    }
    return dp(obj);
  }
});