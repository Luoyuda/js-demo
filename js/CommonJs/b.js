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