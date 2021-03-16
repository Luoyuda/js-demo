/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 11:41:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-04 18:03:32
 * @FilePath: /js-demo/leetcode/1.js
 */ 
var twoSum = function(nums, target) {
    let len = nums.length
    let res = []
    if(!len) return res
    let hash = {}
    for(let i = 0; i < len; i++) {
        let el = nums[i]
        let self = target - el
        let index = hash[self]
        if(index != undefined){
            res.push(index, i)
        }
        hash[el] = i
    }
    return res
}

console.log(twoSum([2,7,11,15], 9))