/*
 * @Author: xiaohuolong
 * @Date: 2021-04-11 08:14:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-11 09:46:41
 * @FilePath: /js-demo/leetcode/常规题目/993.js
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
993. 二叉树的堂兄弟节点
    在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。
    如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。
    我们给出了具有唯一值的二叉树的根节点 root ，以及树中两个不同节点的值 x 和 y 。
    只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false。
示例 1：
    输入：root = [1,2,3,4], x = 4, y = 3
    输出：false
示例 2：
    输入：root = [1,2,3,null,4,null,5], x = 5, y = 4
    输出：true
示例 3：
    输入：root = [1,2,3,null,4], x = 2, y = 3
    输出：false
提示：
    二叉树的节点数介于 2 到 100 之间。
    每个节点的值都是唯一的、范围为 1 到 100 的整数。
 */
var isCousins = function(root, x, y) {
    if(!root) return null
    if(root.val == x || root.val == y) return false
    let q = [root]
    let xParent = yParent = null
    let xNode = yNode = null
    while(q.length){
        let len = q.length
        for (let i = 0; i < len; i++) {
            let r = q.shift()
            if(!r) continue
            if(r.left){
                if(r.left.val == x){
                    xParent = r
                    xNode = r.left
                }else if(r.left.val == y){
                    yParent = r
                    yNode = r.left
                }
                q.push(r.left)
            }
            if(r.right){
                if(r.right.val == x){
                    xParent = r
                    xNode = r.right
                }else if(r.right.val == y){
                    yParent = r
                    yNode = r.right
                }
                q.push(r.right)
            }
        }
        if(!xNode && !yNode){
            continue
        }else if(xNode && yNode){
            return xParent != yParent
        }else if(xNode || yNode){
            return false
        }
    }
    return false
};

var isCousins = function(root, x, y){
    let depths = {}
    let parents = {}
    var dfs = function(root, parent) {
        if(root) {
            depths[root.val] = (root.val, parent ? depths[parent.val] + 1 : 0)
            parents[root.val] = parent
            dfs(root.left, root)
            dfs(root.right, root)
        }
    }
    dfs(root, null)
    // console.log(depths)
    // console.log(parents)
    // console.log(depths[x], depths[y])
    return depths[x] == depths[y] && parents[x] != parents[y]
}


function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.right = new TreeNode(4)
// root.right.right = new TreeNode(4)
root.right.left = new TreeNode(5)

console.log(isCousins(root, 2, 3))
console.log(isCousins(root, 4, 5))
console.log(isCousins(root, 3, 5))