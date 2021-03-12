/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 13:02:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-08 14:08:44
 * @FilePath: /js-demo/leetcode/offer.33.js
 */
/**
 * @param {number[]} postorder
 * @return {boolean}
    剑指 Offer 33. 二叉搜索树的后序遍历序列
        输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。
        如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。
        参考以下这颗二叉搜索树：
     5
    / \
   2   6
  / \
 1   3
    示例 1：
        输入: [1,6,3,2,5]
        输出: false
    示例 2：
        输入: [1,3,2,6,5]
        输出: true
    提示：
        数组长度 <= 1000
 */
var verifyPostorder = function(postorder) {
    if(!postorder || !postorder.length) return true
    return verify(0, postorder.length - 1, postorder)
};

var verify = (left, right, postorder) => {
    // console.log(left, right)
    if(left >= right)return true
    let first = left
    let root = postorder[right]
    while(postorder[first] < root){
        first++
    }
    let temp = first
    while(temp < right){
        if(postorder[temp++] < root){
            return false
        }
    }
    // console.log(left, first, right)
    return verify(left, first - 1, postorder) && verify(first, right - 1, postorder)
}

console.log(verifyPostorder([1,3,2,6,5]))
// console.log(verifyPostorder([1,6,3,2,5]))