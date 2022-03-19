const runTests = (tests, fn) => {
  tests.forEach(( { input, output } ) => {
    const target = fn(input);
    if(!(JSON.stringify(target) === JSON.stringify(output))){
      console.log(input, output, target);
    }
  })
}
// 去重
(() => {
  const tests = [
    { input: ['a', 'b', 'c', 'a', 'b'], output: ['a', 'b', 'c'] },
    { input: ['1', '2', '3', '2', '3'], output: ['1', '2', '3'] },
    { input: [1, 2, 3, 3, 2], output: [1, 2, 3] },
    { input: [1, 2, 3, 3, 3], output: [1, 2, 3] },
    { input: [2, 2, 3, 3, 2], output: [2, 3] },
    { input: [1, 10, 10, 100, 100], output: [1, 10, 100] },
    { input: [1, 10, 10, NaN, NaN], output: [1, 10, NaN] },
  ]
  /**
   * unique - Set
   * @param {[string | number[]]} list
   * @return {[string | number[]]}
   */
  function unique(list) {
    return [...new Set(list)]
  }
  
  /**
   * unique - cache
   * @param {[string | number[]]} list
   * @return {[string | number[]]}
   */
  function unique(list) {
    let res = []
    let cache = {}
    list.forEach(item => {
      if(!cache[item]){
        res.push(item)
        cache[item] = true
      }
    })
    return res
  }
  
  /**
   * unique - indexOf 需要处理NaN
   * @param {[string | number[]]} list
   * @return {[string | number[]]}
   */
  function unique(list) {
    let res = []
    let pushNaN = false
    list.forEach(item => {
      if(res.indexOf(item) === -1){
        if(item !== item){
          if(pushNaN) return
          pushNaN = true
        }
        res.push(item)
      }
    })
    return res
  }
  
  /**
   * unique - map
   * @param {[string | number[]]} list
   * @return {[string | number[]]}
   */
  function unique(list) {
    let map = new Map()
    list.forEach(item => {
      map.set(item, item)
    })
    return [...map.keys()]
  }

  /**
   * unique - sort - NaN
   * @param {[string | number[]]} list
   * @return {[string | number[]]}
   */
  function unique(list) {
    let sort = list.slice().sort((a, b) => a < b ? -1 : 1)
    let res = []
    let i = 0
    let n = sort.length
    let pushNaN = false
    while (i < n) {
      let num = sort[i++]
      if(num !== res[res.length - 1]){
        if(num !== num){
          if(pushNaN) {
            continue
          }
          pushNaN = true
        }
        res.push(num)
      }
    }
    return res
  }


  runTests(tests, unique)
});
// 二分查找
(() => {
  const tests = [
    ...(new Array(10).fill(0))
    .map((item, index) => index)
    .map((item, index, array) => ({ input: [array, item], output: index })),
  ]
  /**
   * 二分查找
   * @param {number[]} list 
   * @param {number} x 
   */
  function binarySearch([list, x]) {
    let l = 0
    let r = list.length - 1
    while (l < r) {
      let m = l + ((r - l) >> 1)
      if(list[m] >= x) r = m
      else l = m + 1
    }
    return list[l] === x ? l : -1
  }
  
  /**
   * 二分查找
   * @param {number[]} list 
   * @param {number} x 
   */
  function binarySearch([list, x]) {
    let l = 0
    let r = list.length - 1
    while (l < r) {
      let m = l + ((r - l + 1) >> 1)
      if(list[m] <= x) l = m
      else r = m - 1
    }
    return list[l] === x ? l : -1
  }

  runTests(tests, binarySearch)
});

(() => {
  let test = (function (a) {
    this.a = a
    return function (b) {return this.a + b}
  }((function (a, b){ return a })(1, 2)));
  console.log(test(50));
});

(() => {
  let x = 1
  function a(){
    console.log(x)
    let x = 1
    x++ 
    console.log(x)
  }
  function b(){
    console.log(x)
    x++
    console.log(x)
  }
  if(0 < 100 < 0){
    a()
  }else{
    b()
  }
  if(0 < 100 < (0 + 4)){
    a()
  }else{
    b()
  }
});