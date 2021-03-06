/*
 * @Author: xiaohuolong
 * @Date: 2021-03-13 09:20:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-26 08:16:22
 * @FilePath: /js-demo/leetcode/常规题目/231.js
 */
/* 
& 两个1才1
101
001
----
001

| 只要有一个是1就是1
101
001
----
101

^ 两个不一样的是1
101
001
----
100

～ 取反
101
010

>> 左移 下取整 / 2N次方 取整
1101 >> 1 = 110
<< 右移 上取整 * 2N次方 取整
1 << 2 = 100

x = 11010101000
-x = 00101010111 + 1
-x = 00101011000 
&x = 11010101000
---------------------
   = 00000001000

x & -x 等于二进制表示里面的最右边的1
x < -x < x
x & -x = x

1000
0111
-----
0000
*/

/**
 * @param {number} n
 * @return {boolean}
    231. 2的幂
        给定一个整数，编写一个函数来判断它是否是 2 的幂次方。
    示例 1:
        输入: 1
        输出: true
        解释: 20 = 1
    示例 2:
        输入: 16
        输出: true
        解释: 24 = 16
    示例 3:
        输入: 218
        输出: false
 */
var isPowerOfTwo = function(n) {
    // 如果是整数幂，1000 & 0111 会等于0
    // return n > 0 && ((n & (n - 1)) == 0)
    // 最大的整数幂模n
    // return n > 0 && (1 << 30) % n == 0
    // x & -x 拿到最右的第一个1 如果相等则是整数幂
    return n > 0 && (n & -n) == n
};

console.log(isPowerOfTwo(2))