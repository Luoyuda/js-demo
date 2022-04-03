---
title: 去重到底有多少种写法？（JavaScript）
tags: 
 - ES6
 - JavaScript
 - 去重
categories:
 - 技术
comments: true
date: 2022-04-02 15:00
---

## 测试用例

在写代码之前写一组测试（使用 `Jest` ），这有利于我们每次修改后完善代码，我们先写一个对基本类型进行去重的版本（忽略 `NaN`）

```js
const { unique } = require('./unique.1.js')
describe('unique', function() {
  var genArray = (len, cb) => new Array(len).fill(0).map(cb)
  var genNumbers = (gap, len = 20) => genArray(len, (el, i) => i % gap)
  var genStrings = (gap, len = 20) => genArray(len, (el, i) => (i % gap) + '')
  var genBooleans = (gap, len = 4) => genArray(len, (el, i) => (i % gap) === 1)
  var genUndefined = (len = 4) => genArray(len, () => void 0)
  var genNull = (len = 4) => genArray(len, () => null)
  var tests = [
    {
      message: 'numbers',
      input: genNumbers(5)
    },
    {
      message: 'strings',
      input: genStrings(10, 20)
    },
    {
      message: 'booleans',
      input: genBooleans(2, 4)
    },
    {
      message: 'undefined',
      input: genUndefined()
    },
    {
      message: 'null',
      input: genNull()
    },
    {
      message: 'complex',
      input: [
        ...genNumbers(5),
        ...genStrings(5),
        ...genBooleans(2),
        ...genUndefined(),
        ...genNull(),
      ]
    }
  ]
  tests.forEach(({message, input}) => {
    test(message, () => {
      expect(unique(input)).toEqual([...new Set(input)])
    })
  })
})
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f067ddde3fae46dea70431d6a54273b1~tplv-k3u1fbpfcp-watermark.image?)

## 接着开始实现

```js
function unique (list){
}
module.exports.unique = unique
```

保存后运行测试用例，必然没通过，因为啥也没有嘛

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f5c92f98f4e4bb4963a02ee531f2a8d~tplv-k3u1fbpfcp-watermark.image?)

## Set 方式

上面使用 `new Set` 已经是一种去重方式了, 保存后运行

```js
function unique (list){
  return [...new Set(list)]
}
```

这样肯定过的，没啥疑问

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84ffacd9010a4b58a9b0b84d3c4f33ed~tplv-k3u1fbpfcp-watermark.image?)

## 最土的办法 双重 `for`

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
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
```

也可以写成这样

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
  let result = []
  list.forEach(item => {
    if(result.some(el => el === item)) return
    result.push(item)
  })
  return result
}
```

甚至你可以用万能的 `reduce`

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
  return list.reduce((prev, item) => {
    if(!prev.some(el => el === item)) prev.push(item)
    return prev
  }, [])
}
```

当然你也可以不用 `some` 换成 `indexOf`

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
  return list.reduce((prev, item) => {
    if(prev.indexOf(item) === -1) prev.push(item)
    return prev
  }, [])
}

```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f22fbfbc6ab43c58cd18e469f073f1f~tplv-k3u1fbpfcp-watermark.image?)

### 优化时间复杂度的版本

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
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
```

也可以这么写

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
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
```

可以通过 `filter`

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
  const cache = {}
  const computed = el => {
    let k = `[${typeof el} ${el}]`
    return cache[k] ? false : cache[k] = true
  }
  return list.filter(computed)
}
```

还是可以用万能的 `reduce` 

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
  return [
    ...Object.values(
      list.reduce((prev, cur) => {
        prev[`${typeof cur} ${cur}`] = cur
        return prev
      }, {})
    )
  ]
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/409094868cbb4ca0ae8a56d5c04365eb~tplv-k3u1fbpfcp-watermark.image?)

## 排序后比对元素

注意这个会把数组重新排序，输出顺序不稳定

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
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
```

利用 `filter`

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
  return list.slice()
  .sort((a, b) => a < b ? -1 : 1).
  filter((el, i, arr) => !i || arr[i - 1] !== el)
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e8515d3c504439f894780c289d84da0~tplv-k3u1fbpfcp-watermark.image?)

## 总结

正常的情况到这里就已经差不多一共就 `Set` , `for循环`，`cache`和排序后比对前后元素四种方法。

是这个世界存在一个神奇的东西 `NaN`，
它并不等于自身，所以上面存在比较相等逻辑的方法被 `NaN` 爆杀，只剩`Set` 和 键值对才能对付 `NaN` 了

```js
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
  return [...new Set(list)]
}
/**
 * unique
 * @param {[]} list 
 * @returns 
 */
function unique (list){
  const cache = {}
  const computed = el => {
    let k = `[${typeof el} ${el}]`
    return cache[k] ? false : cache[k] = true
  }
  return list.filter(computed)
}
```

谨慎使用 `NaN` （最好不要让它出现）

### 如果追求对象也去重

可以键值对的键值基础上 `JSON.stringify(value)`

```js
/**
 * 去重
 * @param {[]} array 待去重数组
 * @param {Boolean} isSorted 是否排序
 * @param {function} iteratee 比较函数
 * @param {object} context 作用域
 */
function unique(array, isSorted, iteratee, context){
  if(typeof isSorted !== 'boolean'){
    context = iteratee
    iteratee = isSorted
    isSorted = false
  }
  if(isSorted === true){
    iteratee = function(value){ return value }
  }else if(typeof iteratee !== "function"){
    iteratee = function(value){
      value = value instanceof RegExp ? value.toString() : value
      var key = (typeof value) + JSON.stringify(value)
      if(this[key]) return false
      this[key] = true
      return true
    }
  }
  iteratee = iteratee.bind(context || {})
  var result = []
  var last
  for(var i = 0; i < array.length; i++){
    var value = array[i]
    var computed = iteratee(value, i, array)
    if(isSorted){
      if(!i || computed !== last) result.push(value)
      last = value
    }else{
      if(computed) result.push(value)
    }
  }
  return result
}
```

[源码地址](https://github.com/Luoyuda/js-demo/tree/master/js/unique)
