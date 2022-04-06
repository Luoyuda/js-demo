// 默认绑定
(() => {
  var c = 'window'
  var a = {
    b:function(){
      console.log(this.c)
    },
    c: 'a'
  }
  var d = a.b;
  d();
  ((a.b, a.b))();
  ((a.b = a.b))();
  ((a.b || a.b))();
  ((a.b && a.b))();
  setTimeout(a.b);
  setInterval(a.b, 1000);
});

(() => {
  var c = 'window'
  var a = {
    b:function(){
      console.log(this.c)
    },
    c: 'a',
    d: {
      b:function(){
        console.log(this.c)
      },
      c: 'd'
    }
  }

  a.b() // a
  a.d.b() // d 就近
});

(() => {
  var c = 'window'

  function b(){
    console.log(this.c)
  }
  var a = {
    c: 'a'
  }
  var d = {
    c: 'd'
  }
  var e = {
    c: 'e'
  }

  b() // window
  b.call(a) // a
  b.apply(d) // d
  b.bind(e)() // e
});

(() => {
  function b(a){
    this.a = a
  }
  
  console.log(new b(1).a) // 1
});

(() => {
  var a = () => {
    console.log(this)
  }
  
  var b = {
    c: () => {
      console.log(this)
    },
    d(){
      return () => {
        console.log(this)
      }
    }
  }
  
  "use strict";
  var _this = void 0;

  var a = function a() {
    console.log(_this);
  };

  var b = {
    c: function c() {
      console.log(_this);
    },
    d: function d() {
      var _this2 = this;

      return function () {
        console.log(_this2);
      };
    }
  };
});