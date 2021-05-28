/*
 * @Author: xiaohuolong
 * @Date: 2021-04-18 11:24:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-22 21:00:47
 * @FilePath: /js-demo/leetcode/常规题目/297.js
 */
/**
297. 二叉树的序列化与反序列化
    序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，
    同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
    请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑
    ，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
    提示: 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。
    你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。
示例 1：
    输入：root = [1,2,3,null,null,4,5]
    输出：[1,2,3,null,null,4,5]
示例 2：
    输入：root = []
    输出：[]
示例 3：
    输入：root = [1]
    输出：[1]
示例 4：
    输入：root = [1,2]
    输出：[1,2]
提示：
    树中结点数在范围 [0, 104] 内
    -1000 <= Node.val <= 1000
 */
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if(!root) return '[]'
    let q = [root]
    let ans = ''
    while(q.length){
        let node = q.shift()
        if(!node) ans += 'null,'
        else {
            ans +=  node.val + ','
            q.push(node.left)
            q.push(node.right)
        }
    }
    return '[' + ans.substring(0, ans.length-1) + ']';
};
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(data == '[]') return null
    let values = data.substring(1, data.length - 1).split(',')
    let root = new TreeNode(values.shift())
    let q = [root]
    while(q.length){
    // for (let index = 0; index < 10; index++) {
        let node = q.shift()
        if(node) {
            let left = values.shift()
            let right = values.shift()
            node.left = left == 'null' ? null : new TreeNode(left)
            node.right = right == 'null' ? null : new TreeNode(right)
            q.push(node.left)
            q.push(node.right)
        }
    }
    return root
};

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if(!root) return '[]'
    let q = [root]
    let res = []
    while(q.length){
        let node = q.shift()
        if(!node) res.push('#')
        else{
            res.push(node.val + '')
            q.push(node.left)
            q.push(node.right)
        }
    }
    return '[' + res.join(',') + ']'
};
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(data == '[]') return null
    let values = data.substring(1, data.length - 1).split(',')
    let i = 0
    let root = new TreeNode(values[i++])
    let q = [root]
    while(q.length){
        let node = q.shift()
        if(node){
            let left = values[i++]
            let right = values[i++]
            node.left = left == '#' ? null : new TreeNode(left)
            node.right = right == '#' ? null : new TreeNode(right)
            q.push(node.left)
            q.push(node.right)
        }
    }
    return root
};

function TreeNode(val, left, right) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
};
var root = new TreeNode(1, 
    new TreeNode(2, 
    ), 
    new TreeNode(3, 
        new TreeNode(4),
        new TreeNode(5)
    )
)

let res = serialize(root)
console.log(res)
console.log(deserialize(res))