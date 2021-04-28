/*
 * @Author: xiaohuolong
 * @Date: 2021-04-27 08:50:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-28 07:41:25
 * @FilePath: /js-demo/leetcode/常规题目/376.js
 */
/* 
376. 摆动序列
    如果连续数字之间的差严格地在正数和负数之间交替，
    则数字序列称为摆动序列。第一个差（如果存在的话）可能是正数或负数。
    少于两个元素的序列也是摆动序列。
    例如， [1,7,4,9,2,5] 是一个摆动序列，因为差值 (6,-3,5,-7,3) 是正负交替出现的。
    相反, [1,4,7,2,5] 和 [1,7,4,5,5] 不是摆动序列，
    第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
    给定一个整数序列，返回作为摆动序列的最长子序列的长度。 
    通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。
示例 1:
    输入: [1,7,4,9,2,5]
    输出: 6 
    解释: 整个序列均为摆动序列。
示例 2:
    输入: [1,17,5,10,13,15,10,5,16,8]
    输出: 7
    解释: 这个序列包含几个长度为 7 摆动序列，其中一个可为[1,17,10,13,10,16,8]。
示例 3:
    输入: [1,2,3,4,5,6,7,8,9]
    输出: 2
进阶:
    你能否用 O(n) 时间复杂度完成此题?
*/
var uniqueList = function(nums){
    let l = 0
    let r = 1
    while (l < nums.length && r < nums.length){
        if(nums[l] == nums[r]){
            nums[r] = undefined
            r++
        }else{
            l = r
            r = l + 1
        }
    }
    let res = []
    for (let i = 0; i < nums.length; i++) {
        if(nums[i] != undefined){
            res.push(nums[i])
        }
    }
    return res
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
    nums = uniqueList(nums)
    let len = nums.length
    if(len <= 2)return len
    let res = 2
    for (let i = 1; i < len; i++) {
        let a = nums[i - 1]
        let b = nums[i]
        let c = nums[i + 1]
        if((a < b && b > c) || (a > b && b < c)) res++
    }
    return res
};

console.log(wiggleMaxLength([1,7,4,9,2,5]))