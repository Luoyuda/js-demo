/*
 * @Author: xiaohuolong
 * @Date: 2021-03-22 18:47:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-22 18:56:32
 * @FilePath: /js-demo/leetcode/面试金典/08.01.js
 */
/**
 * @param {number} n
 * @return {number}
    面试题 08.01. 三步问题
        三步问题。有个小孩正在上楼梯，楼梯有n阶台阶，
        小孩一次可以上1阶、2阶或3阶。实现一种方法，
        计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。
    示例1:
        输入：n = 3 
        输出：4
        说明: 有四种走法
    示例2:
        输入：n = 5
        输出：13
    提示:
        n范围在[1, 1000000]之间
 */
var waysToStep = function(n) {
    // f(x) = f(x-1) + f(x-2) + f(x-3)
    if(n == 1) {
        return 1;
    }

    if (n == 2) {
        return 2;
    }

    if (n == 3) {
        return 4;
    }
    let dp1 = 1
    let dp2 = 1
    let dp3 = 2
    let dp4 = 0
    for (let i = 3; i <= n; i++) {
        dp4 = ((dp1 + dp2) % 1000000007 + dp3) % 1000000007
        dp1 = dp2
        dp2 = dp3
        dp3 = dp4
    }
    return dp4
};

console.log(waysToStep(61))