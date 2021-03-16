/*
 * @Author: xiaohuolong
 * @Date: 2021-03-13 10:07:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-13 10:11:36
 * @FilePath: /js-demo/leetcode/461.js
 */
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
461. 汉明距离
    两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
    给出两个整数 x 和 y，计算它们之间的汉明距离。
注意：
    0 ≤ x, y < 231.
示例:
    输入: x = 1, y = 4
    输出: 2
解释:
    1   (0 0 0 1)
    4   (0 1 0 0)
           ↑   ↑
    上面的箭头指出了对应二进制位不同的位置
 */
var hammingDistance = function(x, y) {
    // console.log(x.toString(2))
    // console.log(y.toString(2))
    // console.log((x ^ y).toString(2))
    let res = x ^ y
    let count  = 0
    while(res != 0){
        res &= (res - 1)
        count++
    }
    // console.log(count)
    return count
};

console.log(hammingDistance(1, 4))