(function(root){
  var _ = function(obj){
    if(!(this instanceof _)){
      return new _(obj);
    }
    this.wrap = obj
  }
  
  _.map = function(array, callback){
    var result = []
    for (var i = 0; i < array.length; i++) {
      result.push(callback(array[i]))
    }
    return result
  }

  _.unique = function(array, callback){
    var result = []
    for (var i = 0; i < array.length; i++) {
      var target = callback ? callback(array[i], i, array) : array[i]
      if(result.indexOf(target) === -1){
        result.push(target)
      }
    }
    return result
  }

  _.each = function(array, callback){
    for (var i = 0; i < array.length; i++) {
      callback(array[i], i, array)
    }
  }

  _.chain = function(obj){
    var instance = _(obj)
    instance._chain = true
    return instance
  }

  _.functions = function(obj){
    var result = []
    for (var key in obj) {
      result.push(key)
    }
    return result
  }

  var result = function(instance, obj){
    if(instance._chain){
      instance.wrap = obj
      return instance
    }
    return obj
  }

  _.prototype.value = function(){
    return this.wrap
  }

  _.mixin = function(obj){
    _.each(_.functions(obj), function(key){
      var func = obj[key]
      _.prototype[key] = function(){
        var args = [this.wrap]
        // 合并参数
        Array.prototype.push.apply(args, arguments)
        return result(this, func.apply(this, args))
      }
    })
  }

  _.mixin(_)
  root._ = _
})(global);

console.log(_.unique([1,2,3,3,4,5,5,6]))
console.log(_([1,2,3,3,4,5,5,6]).unique())
console.log(_.map([1,2,3,3,4,5,5,6], val => val * 2))
console.log(_([1,2,3,3,4,5,5,6]).chain().unique().map(val => val * 2).value())