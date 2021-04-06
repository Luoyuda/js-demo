/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 09:20:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 10:53:28
 * @FilePath: /js-demo/leetcode/面试金典/10.10.js
面试题 10.10. 数字流的秩
假设你正在读取一串整数。每隔一段时间，你希望能找出数字 x 的秩(小于或等于 x 的值的个数)。
请实现数据结构和算法来支持这些操作，也就是说：
实现 track(int x) 方法，每读入一个数字都会调用该方法；
实现 getRankOfNumber(int x) 方法，返回小于或等于 x 的值的个数。
注意：本题相对原题稍作改动
示例:
输入:
    ["StreamRank", "getRankOfNumber", "track", "getRankOfNumber"]
    [[], [1], [0], [0]]
输出:
    [null,0,null,1]
提示：
    x <= 50000
    track 和 getRankOfNumber 方法的调用次数均不超过 2000 次
 */
var StreamRank = function() {
    this.rank = []
};

/** 
 * @param {number} x
 * @return {void}
 */
StreamRank.prototype.track = function(x) {
    let len = this.rank.length
    let mid = this.findMedian(x)
    // console.log(mid)
    for (let i = len; i >= mid; i--) {
        this.rank[i] = this.rank[i - 1]
    }
    this.rank[mid] = x
};

StreamRank.prototype.findMedian = function(x){
    let left = 0
    let right = this.rank.length
    let mid = 0
    while (left <= right) {
        mid = (left + right) >> 1
        if(this.rank[mid] < x){
            left = mid + 1
        }else if(this.rank[mid] > x){
            right = mid - 1
        }else{
            break
        }
    }
    if(this.rank[mid] < x) mid++
    return mid
}

/** 
 * @param {number} x
 * @return {number}
 */
StreamRank.prototype.getRankOfNumber = function(x) {
    let mid = this.findMedian(x)
    if (mid < 0) mid = -mid - 1;
    while (mid < this.rank.length && this.rank[mid] <= x) {
        mid++
    }
    return mid
};

var obj = new StreamRank()
// var funcs = ["track", "track", "track", "getRankOfNumber", "track", "getRankOfNumber", "track", "track", "getRankOfNumber", "getRankOfNumber", "track", "getRankOfNumber", "track", "getRankOfNumber", "track", "track", "getRankOfNumber", "track", "track", "track"]
// var params = [[4], [3], [5], [8], [3], [2], [1], [5], [3], [5], [1], [9], [6], [3], [4], [1], [7], [9], [2], [9]]
// var results =[null,null,null,3,null,0,null,null,3,6,null,7,null,4,null,null,10,null,null,null]

// var funcs = [ "track", "track", "track", "getRankOfNumber", "track", "track", "track", "track", "track", "getRankOfNumber", "getRankOfNumber", "track", "track", "track", "track", "track", "track", "getRankOfNumber", "track", "getRankOfNumber"]
// var params = [ [8], [7], [7], [2], [6], [5], [5], [0], [5], [1], [8], [9], [0], [8], [2], [6], [4], [0], [9], [5]]
// var results = [null,null,null,0,null,null,null,null,null,1,8,null,null,null,null,null,null,2,null,7]
// funcs.forEach((item, index) => {
//     let res = obj[item](...params[index])
//     let realRes = results[index]
//     // console.log(item, params[index], res, realRes)
//     // console.log(obj.rank)
//     console.log(res == realRes)
// })
// console.log(obj.track(1))
// console.log(obj)
console.log(obj.track(0))
console.log(obj.track(0))
console.log(obj.track(0))
console.log(obj.track(0))
console.log(obj.track(0))
console.log(obj.track(0))
console.log(obj.track(5))
console.log(obj.track(5))
console.log(obj.track(5))
console.log(obj.track(2))
console.log(obj)
// console.log(obj)
// console.log(obj.getRankOfNumber(2))
// console.log(obj.getRankOfNumber(0))
// console.log(obj.getRankOfNumber(1))