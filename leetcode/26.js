/*
 * @Author: xiaohuolong
 * @Date: 2020-07-08 00:13:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-08 11:00:02
 * @FilePath: /js-demo/leetcode/26.js
 */ 
var removeDuplicates = function(nums) {
    if(nums.length <= 1) return nums.length
    let i = 0

    for(var j = 1; j < nums.length; j++) {
        if(nums[i] != nums[j]){
            i++;
            nums[i] = nums[j];
        }
    }
    nums.length = i + 1

    return nums.length
};

// console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
// console.log(removeDuplicates([1,1,2,3]))

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



console.log(removeElement([0,0,1,1,1,2,2,3,3,4],1))
console.log(removeElement([1],1))