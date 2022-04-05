function cloneArrayBySlice(list){
  return list.slice()
}
function cloneArrayByConcat(list){
  return [].concat(list)
}
function cloneArrayBySpread(list){
  return [...list]
}

function assign(obj){
  return Object.assign(obj)
}

function cloneByJSON(obj){
  return JSON.parse(JSON.stringify(obj))
}

function cloneByMessageChannel(obj){
  return new Promise((res, rej) => {
    const { port1, port2 } = new MessageChannel()
    port1.onmessage = e => res(e.data)
    port2.postMessage(obj)
  })
}

function clone1(obj) {
  if(!obj) return null
  var target = Array.isArray(obj) ? [] : {}
  for(var key in obj){
    if(typeof obj[key] === 'object'){
      target[key] = clone1(obj[key])
    }else{
      target[key] = obj[key]
    }
  }
  return target
}

function clone(obj){
  var map = new WeakMap()
  function _clone(obj){
    var val = map.get(obj)
    if(val) return val
    var target = obj instanceof Array ? [] : {}
    map.set(obj, target)
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const el = obj[key];
        if(el && typeof el === 'object') {
          target[key] = _clone(el)
        }else{
          target[key] = el
        }
      }
    }
    return target
  }
  return _clone(obj)
}
exports.clone = clone