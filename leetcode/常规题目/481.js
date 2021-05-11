/*
 * @Author: xiaohuolong
 * @Date: 2021-05-06 08:23:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-06 08:30:24
 * @FilePath: /js-demo/leetcode/常规题目/481.js
 */
/*
481. 神奇字符串
    神奇的字符串 S 只包含 '1' 和 '2'，并遵守以下规则：
    字符串 S 是神奇的，因为串联字符 '1' 和 '2' 的连续出现次数会生成字符串 S 本身。
    字符串 S 的前几个元素如下：S = “1221121221221121122 ......”
    如果我们将 S 中连续的 1 和 2 进行分组，它将变成：
    1 22 11 2 1 22 1 22 11 2 11 22 ......
    并且每个组中 '1' 或 '2' 的出现次数分别是：
    1 2 2 1 1 2 1 2 2 1 2 2 ......
    你可以看到上面的出现次数就是 S 本身。
    给定一个整数 N 作为输入，返回神奇字符串 S 中前 N 个数字中的 '1' 的数目。
    注意：N 不会超过 100,000。
示例：
    输入：6
    输出：3
    解释：神奇字符串 S 的前 6 个元素是 “12211”，它包含三个 1，因此返回 3。
*/
/**
 * @param {number} n
 * @return {number}
 */
var magicalString = function(n) {
    let s = '122'
    for (let i = 2, k = 1; i < n; i++, k = 3 - k) {
        for (let j = 0; j < s[i] - 0; j++) {
            s += String(k)
        }
    }
    let ans = 0
    for (let i = 0; i < n; i++) {
        if(s[i] == '1') ans++
    }
    return ans
};

console.log(magicalString(6))