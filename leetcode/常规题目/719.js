/*
 * @Author: xiaohuolong
 * @Date: 2021-05-07 11:36:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-07 11:58:36
 * @FilePath: /js-demo/leetcode/常规题目/719.js
 */
/*
719. 找出第 k 小的距离对
    给定一个整数数组，返回所有数对之间的第 k 个最小距离。一对 (A, B) 的距离被定义为 A 和 B 之间的绝对差值。
示例 1:
    输入：
        nums = [1,3,1]
        k = 1
    输出：0 
解释：
    所有数对如下：
    (1,3) -> 2
    (1,1) -> 0
    (3,1) -> 2
    因此第 1 个最小距离的数对是 (1,1)，它们之间的距离为 0 
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function(nums, k) {
    nums.sort((a, b) => a - b)
    let l = 0
    let h = nums[nums.length - 1] - nums[0]
    while (l < h){
        let m = l + Math.floor((h - l) / 2)
        let count = 0
        let left = 0
        for (let right = 0; right < nums.length; right++) {
            while (nums[right] - nums[left] > m) left++
            count += right - left
        }
        if(count >= k) h = m
        else l = m + 1
    }
    return l
}
console.log(smallestDistancePair([1,3,1], 2))