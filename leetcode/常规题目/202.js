/*
 * @Author: xiaohuolong
 * @Date: 2021-03-04 08:29:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 08:42:05
 * @FilePath: /js-demo/leetcode/202.js
 */
/**
 * @param {number} n
 * @return {boolean}
202. 快乐数
    编写一个算法来判断一个数 n 是不是快乐数。
    「快乐数」定义为：
    对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
    然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
    如果 可以变为  1，那么这个数就是快乐数。
    如果 n 是快乐数就返回 true ；不是，则返回 false 。
示例 1：
    输入：19
    输出：true
解释：
    1*1 + 9*9 = 82
    8*8 + 2*2 = 68
    6*6 + 8*8 = 100
    1*2 + 0*0 + 0*0 = 1
示例 2：
    输入：n = 2
    输出：false
提示：
    1 <= n <= 231 - 1
 */
var isHappy = function(n) {
    let getNext = (n) => {
        let totalSum = 0;
        while (n > 0) {
            let d = n % 10;
            n = Math.floor(n / 10);
            totalSum += d * d;
        }
        return totalSum;
    }
    let fast = getNext(n)
    let slow = n
    while(fast != 1 && fast != slow){
        fast = getNext(getNext(fast))
        slow = getNext(slow)
    }
    return fast == 1
};

console.log(isHappy(3))