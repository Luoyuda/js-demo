/*
 * @Author: xiaohuolong
 * @Date: 2021-04-02 08:31:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-02 08:31:51
 * @FilePath: /js-demo/leetcode/常规题目/100.js
 */
var isSameTree = function(p, q) {
    if(p == null && q == null) return true
    else if(p == null || q == null) return false
    else if(p.val != q.val) return false
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};