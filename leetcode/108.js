/*
 * @Author: xiaohuolong
 * @Date: 2020-07-03 20:53:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-03 21:40:52
 * @FilePath: /js-demo/leetcode/108.js
 */ 

var treeNode = (val) => {
    return {
        val,
        left: null,
        right: null,
    }
}

var sortedArrayToBST = function(nums) {
    return helper(nums, 0, nums.length - 1)
};

var helper = (arr, left, right) => {
    if(left > right) return null
    let mid = Math.floor((left + right) / 2)
    let node = treeNode(arr[mid])
    node.left = helper(arr, left, mid -1)
    node.right = helper(arr, mid + 1, right)
    return node
}

console.log(sortedArrayToBST([-10,-3,0,5,9]))