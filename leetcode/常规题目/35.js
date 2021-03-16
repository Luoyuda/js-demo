/*
 * @Author: xiaohuolong
 * @Date: 2020-07-08 21:43:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-08 21:53:12
 * @FilePath: /js-demo/leetcode/35.js
 */ 
var searchInsert = function(nums, target) {
    let len = nums.length
    if(len < 0) return 0
    let i = 0
    for(let j = 0; j < len; j++){
        if(nums[j] < target){
            i++
        }else{
            break
        }
    }
    return i
};

var searchInsert1 = (nums, target) => {
    let len = nums.length
    if(len < 0) return 0
    let left = 0
    let right = nums.length - 1
    while(left <= right){
        const mid = (left + right) >> 1
        if(nums[mid] === target)return mid
        if(nums[mid] < target){
            left = mid + 1
        }else{
            right = mid - 1
        }
    }
    return left
}

console.log(searchInsert1([1,3,5,6], 5))
console.log(searchInsert1([1,3,5,6], 2))
console.log(searchInsert1([1,3,5,6], 7))
console.log(searchInsert1([1,3,5,6], 0))