/*
 * @Author: xiaohuolong
 * @Date: 2021-03-12 07:56:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-12 08:17:01
 * @FilePath: /js-demo/leetcode/offer.59.2.js
 */
/**
剑指 Offer 59 - II. 队列的最大值
    请定义一个队列并实现函数 max_value 得到队列里的最大值，
    要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。
    若队列为空，pop_front 和 max_value 需要返回 -1
示例 1：
    输入: 
        ["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]
        [[],[1],[2],[],[],[]]
    输出: [null,null,null,2,1,2]
示例 2：
    输入: 
        ["MaxQueue","pop_front","max_value"]
        [[],[],[]]
    输出: [null,-1,-1]
限制：
    1 <= push_back,pop_front,max_value的总操作数 <= 10000
    1 <= value <= 10^5
 */
var MaxQueue = function () {
  this.q = []
  this.d = []
}

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
  return this.d.length ? this.d[0] : -1
}

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
  this.q.push(value)
  while (this.d.length && this.d[this.d.length - 1] < value) {
    this.d.pop()
  }
  this.d.push(value)
}

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
  if (!this.q.length) return -1
  if (this.q[0] === this.d[0]) this.d.shift()
  return this.q.shift()
}

var obj = new MaxQueue()
console.log(obj.max_value())
console.log(obj.pop_front())
obj.push_back(1)
obj.push_back(2)
console.log(obj.pop_front())
obj.push_back(3)
obj.push_back(2)
obj.push_back(4)
// let funcs = ["max_value","pop_front","max_value","push_back","max_value","pop_front","max_value","pop_front","push_back","pop_front","pop_front","pop_front","push_back","pop_front","max_value","pop_front","max_value","push_back","push_back","max_value","push_back","max_value","max_value","max_value","push_back","pop_front","max_value","push_back","max_value","max_value","max_value","pop_front","push_back","push_back","push_back","push_back","pop_front","pop_front","max_value","pop_front","pop_front","max_value","push_back","push_back","pop_front","push_back","push_back","push_back","push_back","pop_front","max_value","push_back","max_value","max_value","pop_front","max_value","max_value","max_value","push_back","pop_front","push_back","pop_front","max_value","max_value","max_value","push_back","pop_front","push_back","push_back","push_back","pop_front","max_value","pop_front","max_value","max_value","max_value","pop_front","push_back","pop_front","push_back","push_back","pop_front","push_back","pop_front","push_back","pop_front","pop_front","push_back","pop_front","pop_front","pop_front","push_back","push_back","max_value","push_back","pop_front","push_back","push_back","pop_front"]
// let params = [[],[],[],[46],[],[],[],[],[868],[],[],[],[525],[],[],[],[],[123],[646],[],[229],[],[],[],[871],[],[],[285],[],[],[],[],[45],[140],[837],[545],[],[],[],[],[],[],[561],[237],[],[633],[98],[806],[717],[],[],[186],[],[],[],[],[],[],[268],[],[29],[],[],[],[],[866],[],[239],[3],[850],[],[],[],[],[],[],[],[310],[],[674],[770],[],[525],[],[425],[],[],[720],[],[],[],[373],[411],[],[831],[],[765],[701],[]]
// funcs.map((item, index) => {
//     console.log(item)
//     console.log(obj[item](...params[index]))
//     console.log(obj)
// })
