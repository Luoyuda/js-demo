/*
 * @Author: xiaohuolong
 * @Date: 2021-03-23 12:46:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-23 13:06:25
 * @FilePath: /js-demo/leetcode/offer/offer.66.js
 */
/**
 * @param {number[]} a
 * @return {number[]}
剑指 Offer 66. 构建乘积数组
    给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，
    其中 B[i] 的值是数组 A 中除了下标 i 以外的元素的积, 
    即 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。
示例:
    输入: [1,2,3,4,5]
    输出: [120,60,40,30,24]
提示：
    所有元素乘积之和不会溢出 32 位整数
    a.length <= 100000
 */
var constructArr = function(a) {
    if(!a || !a.length) return []
    let res = []
    res[0] = 1
    let tem = 1
    for (let i = 1; i < a.length; i++) {
        res[i] = res[i-1] * a[i - 1]
    }
    for (let j = a.length - 2; j >= 0; j--) {
        tem *= a[j + 1]
        res[j] *= tem
    }
    return res
};

console.log(constructArr([1, 2, 3, 4, 5]))