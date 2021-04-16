/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 20:38:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-12 20:49:47
 * @FilePath: /js-demo/leetcode/常规题目/116.js
 */
/**
 * @param {Node} root
 * @return {Node}
116. 填充每个节点的下一个右侧节点指针
    给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
    struct Node {
        int val;
        Node *left;
        Node *right;
        Node *next;
    }
    填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
    初始状态下，所有 next 指针都被设置为 NULL。
进阶：
    你只能使用常量级额外空间。
    使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
示例：
    输入：root = [1,2,3,4,5,6,7]
    输出：[1,#,2,3,#,4,5,6,7,#]
    解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
提示：
    树中节点的数量少于 4096
    -1000 <= node.val <= 1000
 */
var connect = function(root) {
    if(!root) return root
    let q = [root]
    while(q.length){
        let len = q.length
        for (let i = 0; i < len; i++) {
            let node = q.shift()
            if(!node) continue
            if(i < len - 1){
                node.next = q[0] || null
            }
            if(node.left){
                q.push(node.left)
            }
            if(node.right){
                q.push(node.right)
            }
        }
    }
    return root
};

var connect = function(root) {
    if(!root) return root
    let leftmost = root
    while(leftmost.left){
        let head = leftmost
        while(head){
            head.left.next = head.right
            if(head.next){
                head.right.next = head.next.left
            }
            head = head.next
        }
        leftmost = leftmost.left
    }
    return root
}

function Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
};

let root1 = new Node(1, 
    new Node(2), 
    new Node(3)
)
let root2 = new Node(1, 
    new Node(2, 
        new Node(4),
        new Node(5)
    ), 
    new Node(3, 
        new Node(6), 
        new Node(7)
    )
)

console.log(connect(root1))
console.log(connect(root2))
