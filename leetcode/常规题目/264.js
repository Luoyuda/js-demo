/*
 * @Author: xiaohuolong
 * @Date: 2020-07-13 17:06:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-11 08:08:36
 * @FilePath: /js-demo/leetcode/常规题目/264.js
 */ 
/*
264. 丑数 II
    给你一个整数 n ，请你找出并返回第 n 个 丑数 。
    丑数 就是只包含质因数 2、3 和/或 5 的正整数。
示例 1：
    输入：n = 10
    输出：12
    解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。
示例 2：
    输入：n = 1
    输出：1
    解释：1 通常被视为丑数。
提示：
    1 <= n <= 1690
*/
const { Heap } = require('../../data-structures/Heap/Heap.js')

class MaxHeap extends Heap {
    constructor(list, max){
        super(list, max, 'max')
    }
    max(a, b){
        return a > b
    }
}

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
    min(a, b){
        return a < b
    }
}

/**
 * @param {number} n
 * @return {number}
 */

var Ugly = function(n=1690) {
    const res = []
    let minHeap = new MinHeap([])
    let num = 1
    let mask = [2,3,5]
    let hash = {}
    minHeap.heapPush(1)
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < mask.length; j++) {
            const el = num*mask[j]
            // console.log(el)
            if(!hash[el]) {
                minHeap.heapPush(el)
                hash[el] = true
            }
        }
        // console.log(`before`, num, minHeap.heapList)
        num = minHeap.heapPop()
        res.push(num)
        // console.log(`after-`, num, minHeap.heapList)
        // if(minHeap.heapList.length >= n) break
    }
    return res
}
var ugly = Ugly()
var nthUglyNumber = function(n) {
    return ugly[n-1]
};

var nthUglyNumber = function(n) {
    let a = b = c = 0
    let dp = []
    dp[0] = 1
    for (let i = 1; i < n; i++) {
        let n2 = dp[a] * 2    
        let n3 = dp[b] * 3    
        let n5 = dp[c] * 5
        dp[i] = Math.min(n2, n3, n5)
        if(dp[i] == n2) a++
        if(dp[i] == n3) b++
        if(dp[i] == n5) c++
    }
    return dp[n - 1]
}

console.log(nthUglyNumber(1690))