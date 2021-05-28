/*
 * @Author: xiaohuolong
 * @Date: 2021-05-21 15:16:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-21 16:02:14
 * @FilePath: /js-demo/leetcode/常规题目/365.js
 */
/*
365. 水壶问题
    有两个容量分别为 x升 和 y升 的水壶以及无限多的水。请判断能否通过使用这两个水壶，从而可以得到恰好 z升 的水？
    如果可以，最后请用以上水壶中的一或两个来盛放取得的 z升 水。
你允许：
    装满任意一个水壶
    清空任意一个水壶
    从一个水壶向另外一个水壶倒水，直到装满或者倒空
示例 1: (From the famous "Die Hard" example)
    输入: x = 3, y = 5, z = 4
    输出: True
示例 2:
    输入: x = 2, y = 6, z = 5
    输出: False
*/
/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
var canMeasureWater = function(x, y, z) {
    if(x + y < z) return false
    if(x == 0 || y == 0) return z == 0 || x + y == z
    return z % gcd(x, y) == 0
};

var gcd = (x, y) => {
    let z = x % y
    while(z != 0){
        x = y
        y = z
        z = x % y
    }
    return y
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
var canMeasureWater = function(x, y, z) {
    if(z < 0 || x + y < z) return false
    let set = new Set()
    let q = [0]
    while(q.length){
        let n = q.shift()
        if(n + x <= x + y && !set.has(n + x)){
            set.add(n + x)
            q.push(n + x)
        }
        if(n + y <= x + y && !set.has(n + y)){
            set.add(n + y)
            q.push(n + y)
        }
        if(n - x >= 0 && !set.has(n - x)){
            set.add(n - x)
            q.push(n - x)
        }
        if(n - y >= 0 && !set.has(n - y)){
            set.add(n - y)
            q.push(n - y)
        }
        if(set.has(z)) return true
    }
    return false
};
