var MySymbol = (function(){
  var generateString = (function(){
    var id = 0
    return function(desc){
      return 'Symbol(' + (id++) + ') (' + desc + ')'
    }
  })();
  function generateId(val){
    return 'Symbol (' + this._description + ')'
  }
  // 只要引用不同就不会比较相等
  function _Symbol(description){
    // 不能被new调用
    if(this instanceof _Symbol) throw new TypeError('Symbol is not a constructor')
    var desc = description === undefined ? '' : String(description)
    var symbol = Object.create({
      toString: function(){
        return this._name
      }
    })
    Object.defineProperties(symbol, {
      '_description': {
        value: desc,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '_name': {
        value: generateString(desc),
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    return symbol
  }
  var _symbolKey = []
  var _symbolValue = []
  _Symbol.for = function(description){
    var i = 0
    var len = _symbolKey.length
    while (i < len) {
      if(_symbolKey[i] === description) return _symbolValue[i]
      i++
    }
    _symbolKey.push(description)
    _symbolValue.push(_Symbol(description))
    return _symbolValue[i]
  }
  _Symbol.keyFor = function(symbol){
    var i = 0
    var len = _symbolValue.length
    while (i < len) {
      if(symbol === _symbolValue[i]) return _symbolKey[i]
      i++
    }
    return undefined
  }
  return _Symbol
})();

const types = [1, '1', false, true, undefined, null, NaN, {}, [], function(){}]
const createSymbols = (fn, test) => {
  return test.map(item => fn(item)).reduce((prev, item) => {
    prev[item] = String(item)
    return prev
  }, {})
}
const tests = [...types, ...types]

// console.log(createSymbols(Symbol, tests))
// console.log(createSymbols(MySymbol, tests))

// console.log(MySymbol.for(1) === MySymbol.for(1)) // true

types.map(item => ({ item, symbol: MySymbol.for(item) })).forEach(({ item, symbol }) => {
  let sym = MySymbol.keyFor(symbol)
  if(!(sym === item)){
    if(sym !== sym) return
    console.log('no pass')
    console.log(item, sym, String(symbol))
  }
})