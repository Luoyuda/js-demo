/*
 * @Author: xiaohuolong
 * @Date: 2021-04-27 07:40:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 08:05:09
 * @FilePath: /js-demo/leetcode/常规题目/421.js
 */
/*
421. 数组中两个数的最大异或值
    给定一个非空数组，数组中元素为 a0, a1, a2, … , an-1，其中 0 ≤ ai < 231 。
    找到 ai 和aj 最大的异或 (XOR) 运算结果，其中0 ≤ i,  j < n 。
    你能在O(n)的时间解决这个问题吗？
示例:
    输入: [3, 10, 5, 25, 2, 8]
    输出: 28
解释: 
    最大的结果是 5 ^ 25 = 28.

*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function(nums) {
    let trie = {
        0: {}
    }
    // 1.建立一个trie树
    for (const num of nums) {
        let p = trie[0]
        for (let i = 30; i >= 0; i--) {
            let t = (num >> i) & 1
            if(!p[t]){
                p[t] = {}
            }
            p = p[t]
        }
    }
    // console.log(trie)
    // 贪心思路，每次尽量往不同的分支查找，尽量往最大的不同位数查找
    let res = 0
    for (const num of nums) {
        let p = trie[0]
        let xor = 0
        for (let i = 30; i >= 0; i--) {
            let t = (num >> i) & 1
            let z = t == 0 ? 1 : 0
            if(p[z]){
                p = p[z]
                xor += 1 << i
            }else{
                p = p[t]
            }
        }
        res = Math.max(res, xor)
    }
    return res
};

console.log(findMaximumXOR([3, 10, 5, 25, 2, 8]))