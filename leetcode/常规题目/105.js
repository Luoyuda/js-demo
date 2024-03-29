/*
 * @Author: xiaohuolong
 * @Date: 2021-04-13 20:47:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 10:22:56
 * @FilePath: /js-demo/leetcode/常规题目/105.js
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
105. 从前序与中序遍历序列构造二叉树
    根据一棵树的前序遍历与中序遍历构造二叉树。
注意:
    你可以假设树中没有重复的元素。
例如，给出
    前序遍历 preorder = [3,9,20,15,7]
    中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：
    3
   / \
  9  20
    /  \
   15   7
 */
var build = function (
  preorder,
  inorder,
  preorderLeft,
  preorderRight,
  inorderLeft,
  inorderRight,
  map
) {
  if (preorderLeft > preorderRight) return null
  let preorderRoot = preorderLeft
  let inorderRoot = map.get(preorder[preorderRoot])
  let root = new TreeNode(preorder[preorderRoot])
  let leftSize = inorderRoot - inorderLeft
  root.left = build(
    preorder,
    inorder,
    preorderLeft + 1,
    preorderLeft + leftSize,
    inorderLeft,
    inorderRoot - 1,
    map
  )
  root.right = build(
    preorder,
    inorder,
    preorderLeft + leftSize + 1,
    preorderRight,
    inorderRoot + 1,
    inorderRight,
    map
  )
  return root
}
var buildTree = function (preorder, inorder) {
  let map = new Map()
  let n = preorder.length
  for (let i = 0; i < n; i++) {
    map.set(inorder[i], i)
  }
  return build(preorder, inorder, 0, n - 1, 0, n - 1, map)
}
var build = function (
  preorder,
  inorder,
  preorderLeft,
  preorderRight,
  inorderLeft,
  inorderRight,
  map
) {
  if (preorderLeft > preorderRight) return null
  let rootIndex = preorderLeft
  let rootVal = preorder[rootIndex]
  let inorderIndex = map.get(rootVal)
  let root = new TreeNode(rootVal)
  let size = inorderIndex - inorderLeft
  root.left = build(
    preorder,
    inorder,
    preorderLeft + 1,
    preorderLeft + size,
    inorderLeft,
    inorderIndex - 1,
    map
  )
  root.right = build(
    preorder,
    inorder,
    preorderLeft + 1 + size,
    preorderRight,
    inorderIndex + 1,
    inorderRight,
    map
  )
  return root
}
var buildTree = function (preorder, inorder) {
  let map = new Map()
  inorder.forEach((item, index) => {
    map.set(item, index)
  })
  return build(
    preorder,
    inorder,
    0,
    preorder.length - 1,
    0,
    inorder.length - 1,
    map
  )
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const map = new Map()
  inorder.forEach((root, i) => map.set(root, i))
  const n = preorder.length
  const build = (pL, pR, iL, iR) => {
    if (pL > pR) return null
    const rootVal = preorder[pL]
    const root = new TreeNode(rootVal)
    const idx = map.get(rootVal)
    const leftSize = idx - iL
    root.left = build(pL + 1, pL + leftSize, iL, idx - 1)
    root.right = build(pL + leftSize + 1, pR, idx + 1, iR)
    return root
  }
  return build(0, n - 1, 0, n - 1)
}
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))
