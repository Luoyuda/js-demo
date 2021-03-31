/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 19:59:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 20:05:35
 * @FilePath: /js-demo/leetcode/面试金典/04.02.js
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
面试题 04.02. 最小高度树
    给定一个有序整数数组，元素各不相同且按升序排列，编写一个算法，创建一棵高度最小的二叉搜索树。
示例:
    给定有序数组: [-10,-3,0,5,9],
    一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
          0 
         / \ 
       -3   9 
       /   / 
     -10  5 
 */
var sortedArrayToBST = function(nums) {
    return buildTree(nums, 0, nums.length - 1)
};
var buildTree = function(nums, left, right){
    if(left <= right){
        let mid = (left + right) >> 1;
        let root = new TreeNode(nums[mid])
        root.left = buildTree(nums, left, mid - 1)
        root.right = buildTree(nums, mid + 1, right)
        return root
    }
    return null
}
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

console.log(sortedArrayToBST([-10,-3,0,5,9]))