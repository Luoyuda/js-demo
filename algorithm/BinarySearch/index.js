const runTests = (tests, fn) => {
  let pass = tests.every(( { input, output } ) => {
    const result = fn(...input);
    if(!(JSON.stringify(result) === JSON.stringify(output))){
      console.log(input, output, result);
      return false;
    }
    return true
  })
  return console.log(pass ? '通过' : 'gg')
}

const createTests = (len, gap, other) => new Array(len + other).fill(0)
.map((item, index) => ({ 
  input:[new Array(len).fill(0).map((item, i) => i * gap), index * gap], 
  output: index > len - 1 ? -1 : index
}))

const Tests = [
  ...createTests(10, 1, 2),
  ...createTests(10, 5, 2),
]

/**
 * binarySearch
 * @param {number[]} list 已经排序数组
 * @param {number} target 查找对象
 * @return {number} 找到返回下标，没找到返回 -1
 */
function binarySearch(list, target){
  let l = 0
  let r = list.length - 1
  while(l < r){
    let mid = l + ((r - l) >> 1) 
    if(list[mid] >= target) r = mid
    else l = mid + 1
  }
  return list[l] === target ? l : -1
}

runTests(Tests, binarySearch)

/**
 * binarySearch
 * @param {number[]} list 已经排序数组
 * @param {number} target 查找对象
 * @return {number} 找到返回下标，没找到返回 -1
 */
function binarySearch(list, target){
  let l = 0
  let r = list.length - 1
  while(l < r){
    let mid = l + ((r - l + 1) >> 1) // 这里得处理下溢出的情况
    if(list[mid] <= target) l = mid // 左往右缩范围
    else r = mid - 1
  }
  return list[l] === target ? l : -1
}

console.log(binarySearch([0,1,1,1,1,2], 1))