/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 15:29:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 15:34:28
 * @FilePath: /js-demo/leetcode/42.js
 */
/**
 * @param {number[]} height
 * @return {number}
    42. 接雨水
        给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
    示例 1：
        输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
        输出：6
        解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
    示例 2：
        输入：height = [4,2,0,3,2,5]
        输出：9
    提示：
        n == height.length
        0 <= n <= 3 * 104
        0 <= height[i] <= 105
 */
var trap = function(height) {
    let left = 0
    let right = height.length - 1
    let leftHeight = 0
    let rightHeight = 0;
    let res = 0
    while(left < right){
        if(height[left] < height[right]){
            leftHeight = Math.max(leftHeight, height[left])
            res += leftHeight - height[left]
            left++
        }else{
            rightHeight = Math.max(rightHeight, height[right])
            res += rightHeight - height[right]
            right--
        }
    }
    return res
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))