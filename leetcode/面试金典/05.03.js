/*
 * @Author: xiaohuolong
 * @Date: 2021-03-31 09:00:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-31 21:34:28
 * @FilePath: /js-demo/leetcode/面试金典/05.03.js
 */
/**
 * @param {number} num
 * @return {number}
面试题 05.03. 翻转数位
    给定一个32位整数 num，你可以将一个数位从0变为1。请编写一个程序，找出你能够获得的最长的一串1的长度。
示例 1：
    输入: num = 1775(110111011112)
    输出: 8
示例 2：
    输入: num = 7(01112)
    输出: 4
 */

var reverseBits = function (num) {
    let maxLen = 1  //最大连续1的长度，由于可以反转一次0，所以最小值为1
    if (num < 0){
        num = num >>> 0                               // 负数位运算，转换成10进制整数
        num = parseInt(num).toString(2).split(0)      // 10进制整数转化成32位2进制整数,并按0截取
        if (num.length == 1) return num[0].length     // 如果全部连续，那么返回其长度
    }else{
        num = parseInt(num).toString(2).split(0)      // 直接转化并截取，由于没有进行进制运算，其截取前长度最大为31
        if (num.length == 1) return num[0].length + 1 // 如果全部连续，那么返回其长度＋1
    }
    for (let i = 0; i < num.length - 1; i++) {
        maxLen = Math.max(num[i].length + num[i + 1].length + 1, maxLen)
    }
    return maxLen
};
console.log(reverseBits(1775))
console.log(reverseBits(7))
console.log(reverseBits(-1))
console.log(reverseBits(7))