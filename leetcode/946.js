/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 15:44:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 15:56:02
 * @FilePath: /js-demo/leetcode/946.js
 */
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
    946. 验证栈序列
        给定 pushed 和 popped 两个序列，每个序列中的 值都不重复，
        只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，
        返回 true；否则，返回 false 。
    示例 1：
        输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
        输出：true
        解释：我们可以按以下顺序执行：
        push(1), push(2), push(3), push(4), pop() -> 4,
        push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
    示例 2：
        输入：pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
        输出：false
        解释：1 不能在 2 之前弹出。
    提示：
        0 <= pushed.length == popped.length <= 1000
        0 <= pushed[i], popped[i] < 1000
        pushed 是 popped 的排列。
 */
var validateStackSequences = function(pushed, popped) {
    let stack = []
    for (let i = 0; i < pushed.length; i++) {
        const element = pushed[i];
        stack.push(element)
        while(stack.length && stack[stack.length-1] === popped[0]){
            // console.log(stack.pop())
            // console.log(popped.shift())
            stack.pop()
            popped.shift()
        }
    }
    return !stack.length
};

console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1]))
console.log(validateStackSequences([1,2,3,4,5], [4,3,5,1,2]))