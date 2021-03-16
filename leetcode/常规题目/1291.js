/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 10:22:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-18 11:09:54
 * @FilePath: /js-demo/leetcode/1291.js
 */
/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 * 我们定义「顺次数」为：每一位上的数字都比前一位上的数字大 1 的整数。
 * 请你返回由 [low, high] 范围内所有顺次数组成的 有序 列表（从小到大排序）。
 * 示例 1：
 * 输出：low = 100, high = 300
 * 输出：[123,234]
 * 示例 2：
 * 输出：low = 1000, high = 13000
 * 输出：[1234,2345,3456,4567,5678,6789,12345]
 */
var sequentialDigits = function(low, high) {
    const result = []
    let lowLen = low.toString().length
    let highLen = high.toString().length
    for(let i = lowLen; i <= highLen; i++){
        for(let j = 1; j <= 10-i ; j++){
            let str = ''
            let num = j
            let k = i
            while(k){
                str += num
                num++
                k--
            }
            let ans = parseInt(str)
            if(ans >= low && ans <= high){
                result.push(ans)
            }else if(ans >= high){
                break
            }
        }
    }
    return result
};

console.log(sequentialDigits(1000, 13000))