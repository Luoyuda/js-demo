class _Delegator{
  constructor(proto, target){
    this.proto = proto;
    this.target = target;
    this.getters = []
    this.setters = []
    this.methods = []
    this.fluents = []
  }
  setter(name){
    const proto = this.proto
    const target = this.target
    this.setters.push(name)
    proto.__defineSetter__(name, function(val){
      this[target][name] = val
    })
    return this
  }
  getter(name){
    const proto = this.proto
    const target = this.target
    this.getters.push(name)
    proto.__defineGetter__(name, function(){
      return this[target][name]
    })
    return this
  }
  method(name) {
    const proto = this.proto
    const target = this.target
    this.methods.push(name)
    proto[name] = function(){
      return this[target][name].apply(this[target], arguments)
    }
    return this
  }
  access(name){
    return this.getter(name).setter(name)
  }
  fluent(name){
    const proto = this.proto
    const target = this.target
    this.fluents.push(name)
    proto[name] = function(val){
      if(typeof val === 'undefined'){
        return this[target][name]
      }else{
        this[target][name] = val
        return this
      }
    }
    return this
  }
}
const Delegator = (...arg) => new _Delegator(...arg);
var a = {
  a: 1,
  b: {
    a: 4,
    c: 2,
    d(){
      console.log(this.a)
    }
  }
};

Delegator(a, 'b').access('c').method('d').fluent('e')
console.log(a.e())
a.e(3)
console.log(a.b.e)
console.log(a.e())