/*
 * @Author: xiaohuolong
 * @Date: 2021-04-25 14:44:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-25 15:14:20
 * @FilePath: /js-demo/leetcode/常规题目/113.js
 */
/**
113. 路径总和 II
    给你二叉树的根节点 root 和一个整数目标和 targetSum ，
    找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
    叶子节点 是指没有子节点的节点。
示例 1：
    输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
    输出：[[5,4,11,2],[5,8,4,5]]
示例 2：
    输入：root = [1,2,3], targetSum = 5
    输出：[]
示例 3：
    输入：root = [1,2], targetSum = 0
    输出：[]
提示：
    树中节点总数在范围 [0, 5000] 内
    -1000 <= Node.val <= 1000
    -1000 <= targetSum <= 1000
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  let res = []
  if (!root) return res
  let dfs = (root, target, path) => {
    if (!root) return
    let val = root.val
    let diff = target - val
    path.push(root.val)
    if (!diff && !root.left && !root.right) {
      res.push(path)
      return
    }
    dfs(root.left, diff, path.slice())
    dfs(root.right, diff, path.slice())
  }
  dfs(root, targetSum, [])
  return res
}
var root = new TreeNode(
  5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
  new TreeNode(
    8,
    new TreeNode(13),
    new TreeNode(4, new TreeNode(5), new TreeNode(1))
  )
)
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const result = []
  const dfs = (root, res, sum) => {
    if (!root) return
    sum -= root.val
    res.push(root.val)
    if (sum === 0 && !root.left && !root.right) return result.push(res.slice())
    dfs(root.left, res.slice(), sum)
    dfs(root.right, res.slice(), sum)
  }
  dfs(root, [], targetSum)
  return result
}
// var root = new TreeNode(
//     -2,
//     new TreeNode(-3,
//     ),
// )
let paths = pathSum(root, 22)
// let paths = pathSum(root, -5)
for (const path of paths) {
  console.log(path)
}
