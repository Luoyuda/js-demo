var b = 1
a = 1222
function set(val){
  b = val
}
function get(){
  return b
}
exports = {} 
exports.set = set
exports.get = get
module.exports = exports
console.log(exports)