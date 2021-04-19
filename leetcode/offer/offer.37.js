/*
 * @Author: xiaohuolong
 * @Date: 2021-03-08 18:18:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 11:45:49
 * @FilePath: /js-demo/leetcode/offer/offer.37.js
 */
/**
剑指 Offer 37. 序列化二叉树
请实现两个函数，分别用来序列化和反序列化二叉树。
示例: 
你可以将以下二叉树：
    1
   / \
  2   3
     / \
    4   5
序列化为 "[1,2,3,null,null,4,5]"
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if(!root) return '[]'
    let res = ''
    let queue = [root]
    while(queue.length){
        let item = queue.shift()
        if(item){
            res += item.val + ','
            queue.push(item.left)
            queue.push(item.right)
        }else{
            res += 'null,'
        }
    }
    return `[${res.substr(0, res.length - 1)}]`
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(data == '[]')return null
    let vals = data.substring(1, data.length - 1).split(',')
    let root = new TreeNode(vals[0])
    let queue = [root]
    let i = 1
    while(queue.length){
        let item = queue.shift()
        if(vals[i] != 'null'){
            item.left = new TreeNode(vals[i])
            queue.push(item.left)
        }
        i++
        if(vals[i] != 'null'){
            item.right = new TreeNode(vals[i])
            queue.push(item.right)
        }
        i++
    }
    return root
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.right.left = new TreeNode(4)
root.right.right = new TreeNode(5)
console.log(serialize(root))
console.log(deserialize('[1,2,3,null,null,4,5,null,null,null,null]'))