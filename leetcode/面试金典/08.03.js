/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 19:15:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 19:43:12
 * @FilePath: /js-demo/leetcode/面试金典/08.03.js
 */
/**
 * @param {number[]} nums
 * @return {number}
面试题 08.03. 魔术索引
    魔术索引。 在数组A[0...n-1]中，有所谓的魔术索引，满足条件A[i] = i。
    给定一个有序整数数组，编写一种方法找出魔术索引，
    若有的话，在数组A中找出一个魔术索引，如果没有，则返回-1。若有多个魔术索引，返回索引值最小的一个。
示例1:
    输入：nums = [0, 2, 3, 4, 5]
    输出：0
    说明: 0下标的元素为0
示例2:
    输入：nums = [1, 1, 1]
    输出：1
说明:
    nums长度在[1, 1000000]之间
    此题为原书中的 Follow-up，即数组中可能包含重复元素的版本
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function(nums) {
    for(let i = 0; i < nums.length; i++){
        if(i == nums[i]){
            return i
        }
    }
    return -1
};
var search = function(arr, left, right) {
    if(left > right) return null
    let mid = left + parseInt((right - left) / 2)
    if(arr[mid] == mid){
        let res = search(arr, left, mid - 1)
        return res === null ? mid : res
    }else{
        let res1 = search(arr, left, mid - 1)
        if(res1 !== null) return res1
        let res2 = search(arr, mid + 1, right)
        return res2
    }
}
var findMagicIndex = function(nums){
    let res = search(nums, 0, nums.length - 1)
    return res === null ? -1 : res
}
console.log(findMagicIndex([0, 2, 3, 4, 5]))
console.log(findMagicIndex([1,1,2,3,4,5]))
console.log(findMagicIndex([5,3,4,1]))