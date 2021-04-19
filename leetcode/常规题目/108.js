/*
 * @Author: xiaohuolong
 * @Date: 2020-07-03 20:53:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 11:55:26
 * @FilePath: /js-demo/leetcode/常规题目/108.js
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

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var sortedArrayToBST = function(nums) {
    return helper(nums, 0, nums.length - 1)
};
var helper = function(nums, left, right) {
    if(left > right) return null
    let mid = Math.floor((left + right) / 2)
    let root = new TreeNode(nums[mid], helper(nums, left, mid - 1), helper(nums, mid + 1, right))
    return root
}
console.log(sortedArrayToBST([-10,-3,0,5,9]))