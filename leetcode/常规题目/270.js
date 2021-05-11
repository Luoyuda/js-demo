/*
 * @Author: xiaohuolong
 * @Date: 2021-05-07 08:24:40
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-07 08:32:22
 * @FilePath: /js-demo/leetcode/常规题目/270.js
 */
/*
270. 最接近的二叉搜索树值
    给定一个不为空的二叉搜索树和一个目标值 target，请在该二叉搜索树中找到最接近目标值 target 的数值。
注意：
    给定的目标值 target 是一个浮点数
    题目保证在该二叉搜索树中只会存在一个最接近目标值的数
示例：
输入: root = [4,2,5,1,3]，目标值 target = 3.714286
    4
   / \
  2   5
 / \
1   3
输出: 4
*/
var closestValue = function(root, target) {
    let val
    let closestVal = root.val
    while(root){
        val = root.val
        closestVal = Math.abs(val - target) > Math.abs(closestVal - target) ? closestVal : val
        root = root.val > target ? root.left : root.right
    }
    return closestVal
};