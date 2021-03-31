/*
 * @Author: xiaohuolong
 * @Date: 2021-03-28 07:59:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 08:39:25
 * @FilePath: /js-demo/leetcode/面试金典/17.21.js
 */
/**
 * @param {number[]} height
 * @return {number}
面试题 17.21. 直方图的水量
    给定一个直方图(也称柱状图)，假设有人从上面源源不断地倒水，最后直方图能存多少水量?直方图的宽度为 1。
示例:
    输入: [0,1,0,2,1,0,1,3,2,1,2,1]
    输出: 6
 */
var trap = function(height) {
    let stack = [];
    let water = 0
    if(height.length < 3) return water
    for (let i = 0; i < height.length; i++) {
        const el = height[i];
        while(stack.length && el > height[stack[stack.length - 1]]){
            let h = stack.pop()
            while(stack.length && height[h] == height[stack[stack.length - 1]]){
                stack.pop()
            }
            if(stack.length){
                let temp = height[stack[stack.length - 1]]
                let high = Math.min(temp - height[h], el - height[h])
                let weight = i - stack[stack.length - 1] - 1
                water += high * weight
            }
        }
        stack.push(i)
    }
    return water
};
console.log(trap([4,3,2,0,1,1,5]))