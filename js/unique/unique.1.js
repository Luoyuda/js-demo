/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueBySet (list){
  return [...new Set(list)]
}

/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueByFor (list){
  let result = []
  for (let i = 0; i < list.length; i++) {
    let hasEl = false
    for(let j = 0; j < result.length; j++) {
      // 检查收录的数据
      if(result[j] === list[i]){
        hasEl = true
        break
      }
    }
    if(!hasEl) result.push(list[i])
  }
  return result
}
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueByForEachAndSome (list){
  let result = []
  list.forEach(item => {
    if(result.some(el => el === item)) return
    result.push(item)
  })
  return result
}

/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueByReduceAndSome (list){
  return list.reduce((prev, item) => {
    if(!prev.some(el => el === item)) prev.push(item)
    return prev
  }, [])
}

/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueByReduceAndIndexOf (list){
  return list.reduce((prev, item) => {
    if(prev.indexOf(item) === -1) prev.push(item)
    return prev
  }, [])
}

/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueByCache (list){
  const result = []
  const cache = {}
  // 处理 1 和 '1' 情况
  const key = el => `[${typeof el} ${el}]`
  for (let i = 0; i < list.length; i++) {
    let el = list[i]
    // 注意这里也会有消耗,
    // 如果是不需要特别处理 1 和 '1' 不需要额外生成key
    let k = key(el)
    if(!cache[k]) {
      cache[k] = true
      result.push(el)
    }
  }
  return result
}
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueByForEachCache (list){
  const result = []
  const cache = {}
  const key = el => `[${typeof el} ${el}]`
  list.forEach(item => {
    let k = key(item)
    if(cache[k]) return
    cache[k] = true
    result.push(item)
  })
  return result
}

/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueByFilterCache (list){
  const cache = {}
  const computed = el => {
    let k = `[${typeof el} ${el}]`
    return cache[k] ? false : cache[k] = true
  }
  return list.filter(computed)
}
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueByValues (list){
  return [
    ...Object.values(
      list.reduce((prev, cur) => {
        prev[`${typeof cur} ${cur}`] = cur
        return prev
      }, {})
    )
  ]
}

/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueBySorted (list){
  let sort = list.slice().sort((a, b) => a < b ? -1 : 1)
  let result = []
  let last
  for (let i = 0; i < sort.length; i++) {
    const element = sort[i];
    if(!i || last !== element){
      result.push(element)
    }
    last = element
  }
  return result
}

/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function uniqueBySortFilter (list){
  return list.slice()
  .sort((a, b) => a < b ? -1 : 1).
  filter((el, i, arr) => !i || arr[i - 1] !== el)
}


module.exports.unique = unique