/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 11:41:19
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-29 11:41:22
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