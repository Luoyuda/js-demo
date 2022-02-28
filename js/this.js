var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}
function Foo() {
  return this.value
}

Foo()
//示例1
foo.bar(); // 2
//示例2
(foo.bar)(); // 2
//示例3
(foo.bar = foo.bar)(); // 1
//示例4
(false || foo.bar)(); // 1
//示例5
(foo.bar, foo.bar)(); // 1