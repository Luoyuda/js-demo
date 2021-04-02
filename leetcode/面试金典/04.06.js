/*
 * @Author: xiaohuolong
 * @Date: 2021-04-01 21:14:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-01 21:42:08
 * @FilePath: /js-demo/leetcode/面试金典/04.06.js
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
面试题 04.06. 后继者
    设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。
    如果指定节点没有对应的“下一个”节点，则返回null。
示例 1:
    输入: root = [2,1,3], p = 1
  2
 / \
1   3
    输出: 2
示例 2:
    输入: root = [5,3,6,2,4,null,null,1], p = 6
      5
     / \
    3   6
   / \
  2   4
 /   
1
    输出: null
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
let dfs = (root, res) => {
    if(!root) return null
    dfs(root.left, res)
    res.push(root)
    dfs(root.right, res)
}
var inorderSuccessor = function(root, p) {
    let res = []
    dfs(root, res)
    // console.log(res)
    for (let i = 0; i < res.length; i++) {
        if(res[i].val == p.val){
            return i >= res.length - 1 ? null : res[i+1]
        }
    }
    return null
};
var inorderSuccessor = function(root, p){
    let pre = null
    while(root && root.val != p.val){
        if(root.val < p.val){
            root = root.right
        }else{
            pre = root
            root = root.left
        }
    }
    // console.log(pre, root)
    if(!root.right) return pre
    root = root.right
    while(root.left != null){
        root = root.left
    }
    return root
}

let root = new TreeNode(5)
root.left = new TreeNode(3)
root.right = new TreeNode(6)
root.left.left = new TreeNode(2)
root.left.right = new TreeNode(4)
root.left.left.left = new TreeNode(1)
// let root = new TreeNode(2)
// root.left = new TreeNode(1)
// root.right = new TreeNode(3)
console.log(inorderSuccessor(root, new TreeNode(1)))
console.log(inorderSuccessor(root, new TreeNode(2)))
console.log(inorderSuccessor(root, new TreeNode(3)))
console.log(inorderSuccessor(root, new TreeNode(4)))
console.log(inorderSuccessor(root, new TreeNode(5)))
console.log(inorderSuccessor(root, new TreeNode(6)))