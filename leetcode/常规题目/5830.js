/*
 * @Author: xiaohuolong
 * @Date: 2021-08-02 08:58:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-02 08:59:18
 * @FilePath: /js-demo/leetcode/常规题目/5830.js
 */
/*
5830. 三除数
    给你一个整数 n 。如果 n 恰好有三个正除数 ，返回 true ；否则，返回 false 。
    如果存在整数 k ，满足 n = k * m ，那么整数 m 就是 n 的一个 除数 。
示例 1：
    输入：n = 2
    输出：false
    解释：2 只有两个除数：1 和 2 。
示例 2：
    输入：n = 4
    输出：true
    解释：4 有三个除数：1、2 和 4 。
提示：
    1 <= n <= 104
*/
/**
 * @param {number} n
 * @return {boolean}
 */
var isThree = function(n) {
    let cnt = 0 
    for(let i = 1; i * i <= n; i++){
        if(n % i === 0){
            if(i != n / i){
                cnt+=2
            }else{
                cnt++
            }
        }
    }
    return cnt == 3
};