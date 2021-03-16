/*
 * @Author: xiaohuolong
 * @Date: 2021-03-03 17:37:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-03 18:06:38
 * @FilePath: /js-demo/leetcode/204.js
 */
/**
 * @param {number} n
 * @return {number}
    204. 计数质数
        统计所有小于非负整数 n 的质数的数量。
    示例 1：
        输入：n = 10
        输出：4
        解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
    示例 2：
        输入：n = 0
        输出：0
    示例 3：
        输入：n = 1
        输出：0
    提示：
        0 <= n <= 5 * 106
 */
var countPrimes = function(n) {
    let arr = new Array(n).fill(0)
    let count = 0
    for (let i = 2; i < n; i++) {
        if(!arr[i]){
            count += 1
            for (let j = i * i; j < n; j+=i) {
                arr[j] = 1
            }
        }
    }
    return count
};

console.log(countPrimes(1))