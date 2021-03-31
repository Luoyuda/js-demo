/*
 * @Author: xiaohuolong
 * @Date: 2021-03-27 15:42:37
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 07:45:52
 * @FilePath: /js-demo/leetcode/常规题目/402.js
 */
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
402. 移掉K位数字
    给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。
注意:
    num 的长度小于 10002 且 ≥ k。
    num 不会包含任何前导零。
示例 1 :
    输入: num = "1432219", k = 3
    输出: "1219"
    解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。
示例 2 :
    输入: num = "10200", k = 1
    输出: "200"
    解释: 移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
示例 3 :
    输入: num = "10", k = 2
    输出: "0"
    解释: 从原数字移除所有的数字，剩余为空就是0。
 */
var removeKdigits = function(num, k) {
    let stack = []
    for (let i = 0; i < num.length; i++) {
        const d = num[i];
        while (k && stack[stack.length - 1] > d){
            stack.pop()
            k--
        }
        stack.push(d)
    }
    // console.log(stack)
    let res = stack.slice(0, stack.length-k)
    let j = 0
    let prev = '0'
    for (let i = 0; i < res.length; i++) {
        if(res[i] == '0' && prev == '0'){
            j++
        }else{
            break
        }
        prev = res[i]
    }
    // console.log(j, res)
    return res.slice(j).join('')
};

console.log(removeKdigits('1000001112', 1)) 