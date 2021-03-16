/*
 * @Author: xiaohuolong
 * @Date: 2020-07-08 11:02:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-08 11:03:00
 * @FilePath: /js-demo/leetcode/27.js
 */ 
var removeElement = function(nums, val) {
    if(nums.length <= 0) return nums.length
    let len = nums.length
    let i = 0

    for(var j = 0; j < len; j++) {
        if(nums[j] != val){
            nums[i] = nums[j]
            i++
        }
    }
    nums.length = i
    // console.log(nums)
    return i
};
