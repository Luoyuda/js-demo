/*
 * @Author: xiaohuolong
 * @Date: 2021-05-11 08:10:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-11 08:18:40
 * @FilePath: /js-demo/leetcode/常规题目/84.js
 */
/*
84. 柱状图中最大的矩形
    给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
    以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
    图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。
示例:
    输入: [2,1,5,6,2,3]
    输出: 10
*/
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    let n = heights.length
    // 使得最后所有元素都出栈
    heights.push(-1)
    let stack = []
    let max = 0
    for(let i = 0; i <= n; i++){
        // 如果当前元素高度小于栈顶元素
        while(stack.length && heights[i] < heights[stack[stack.length - 1]]){
            let cur = stack.pop()
            console.log(cur, stack)
            if(!stack.length){
                max = Math.max(max, heights[cur] * i)
            }else{
                max = Math.max(max, heights[cur] * (i - stack[stack.length - 1] - 1))
            }
        }
        stack.push(i)
    }
    return max
};

console.log(largestRectangleArea([2,1,5,2,5,6,2,2,3]))