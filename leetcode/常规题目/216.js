/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 18:02:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-20 18:06:19
 * @FilePath: /js-demo/leetcode/216.js
 */
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
    216. 组合总和 III
    找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
    说明：
        所有数字都是正整数。
        解集不能包含重复的组合。 
    示例 1:
        输入: k = 3, n = 7
        输出: [[1,2,4]]
    示例 2:
        输入: k = 3, n = 9
        输出: [[1,2,6], [1,3,5], [2,3,4]]
 */
var combinationSum3 = function(k, n) {
    let res = []
    let dfs = (t, start, sum) => {
        if(sum === n && t.length == k){
            return res.push(t)
        }
        for (let i = start; i < 10; i++) {
            t.push(i)
            dfs(t.slice(), i + 1, sum + i)
            t.pop()
        }
    }
    dfs([], 1, 0)
    return res
};

console.log(combinationSum3(3, 7))
console.log(combinationSum3(3, 9))