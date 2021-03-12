/*
 * @Author: xiaohuolong
 * @Date: 2021-02-25 16:27:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-25 17:20:17
 * @FilePath: /js-demo/leetcode/offer.17.js
 */
/**
 * @param {number} n
 * @return {number[]}
    剑指 Offer 17. 打印从1到最大的n位数
        输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。
        比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。
    示例 1:
        输入: n = 1
        输出: [1,2,3,4,5,6,7,8,9]
    说明：
        用返回一个整数列表来代替打印
        n 为正整数
 */
var printNumbers = function(n) {
    let res = []
    let num = []
    let dfs = (t) => {
        if(t == n){
            // console.log(num)
            let target = parseInt(num.join(''))
            if(target <= 0) return
            res.push(target)
            return;
        }
        for (let i = 0; i < 10; i++) {
            num[t] = i
            // num += String(i)
            dfs(t + 1)
        }
    }
    dfs(0)
    return res
};

console.log(printNumbers(1))