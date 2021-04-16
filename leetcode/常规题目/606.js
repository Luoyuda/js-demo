/*
 * @Author: xiaohuolong
 * @Date: 2021-04-15 18:03:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-15 18:14:50
 * @FilePath: /js-demo/leetcode/常规题目/606.js
 */
/**
 * @param {TreeNode} t
 * @return {string}
606. 根据二叉树创建字符串
    你需要采用前序遍历的方式，将一个二叉树转换成一个由括号和整数组成的字符串。
    空节点则用一对空括号 "()" 表示。而且你需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。
示例 1:
输入: 二叉树: [1,2,3,4]
       1
     /   \
    2     3
   /    
  4     

输出: "1(2(4))(3)"
解释: 原本将是“1(2(4)())(3())”，
在你省略所有不必要的空括号对之后，
它将是“1(2(4))(3)”。
示例 2:
输入: 二叉树: [1,2,3,null,4]
       1
     /   \
    2     3
     \  
      4 
输出: "1(2()(4))(3)"
解释: 和第一个示例相似，
除了我们不能省略第一个对括号来中断输入和输出之间的一对一映射关系。
 */
var tree2str = function(root) {
    if(!root) return ''
    if(root.left == null && root.right == null) return root.val + ''
    if(root.right == null) return root.val + '(' + tree2str(root.left) + ')'
    return root.val + '(' + tree2str(root.left) + ')' + '(' + tree2str(root.right) + ')'
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(1, 
    new TreeNode(2, ), 
    new TreeNode(3,
        null,
        new TreeNode(4), 
    )
)
console.log(tree2str(root))

