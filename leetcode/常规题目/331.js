/*
 * @Author: xiaohuolong
 * @Date: 2021-03-28 13:10:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 13:16:54
 * @FilePath: /js-demo/leetcode/常规题目/331.js
331. 验证二叉树的前序序列化
序列化二叉树的一种方法是使用前序遍历。当我们遇到一个非空节点时，我们可以记录下这个节点的值。如果它是一个空节点，我们可以使用一个标记值记录，例如 #。
     _9_
    /   \
   3     2
  / \   / \
 4   1  #  6
/ \ / \   / \
# # # #   # #
例如，上面的二叉树可以被序列化为字符串 "9,3,4,#,#,1,#,#,2,#,6,#,#"，其中 # 代表一个空节点。
给定一串以逗号分隔的序列，验证它是否是正确的二叉树的前序序列化。编写一个在不重构树的条件下的可行算法。
每个以逗号分隔的字符或为一个整数或为一个表示 null 指针的 '#' 。
你可以认为输入格式总是有效的，例如它永远不会包含两个连续的逗号，比如 "1,,3" 。
示例 1:
    输入: "9,3,4,#,#,1,#,#,2,#,6,#,#"
    输出: true
示例 2:
    输入: "1,#"
    输出: false
示例 3:
    输入: "9,#,#,1"
    输出: false
 */
var isValidSerialization = function(preorder) {
    const n = preorder.length;
    let i = 0;
    const stack = [1];
    while (i < n) {
        if (!stack.length) {
            return false;
        }
        if (preorder[i] === ',') {
            ++i;
        } else if (preorder[i] === '#') {
            stack[stack.length - 1]--;
            if (stack[stack.length - 1] === 0) {
                stack.pop();
            } 
            ++i;
        } else {
            // 读一个数字
            while (i < n && preorder[i] !== ',') {
                ++i;
            }
            stack[stack.length - 1]--;
            if (stack[stack.length - 1] === 0) {
                stack.pop();
            }
            stack.push(2);
        }
    }
    return stack.length === 0;
};

var isValidSerialization = function(preorder){
    let n = preorder.length
    let i = 0
    // const stack = [1]
    let slot = 1
    while (i < n){
        // if(!stack.length) return false
        if(!slot) return false
        if(preorder[i] == ','){
            i++
        }else if(preorder[i] == '#'){
            slot--
            // stack[stack.length - 1]--
            // if(stack[stack.length - 1] == 0) stack.pop()
            i++
        }else{
            // 读到下一个,
            while (i < n && preorder[i] !== ',') {
                ++i;
            }
            slot--
            slot+=2
            // stack[stack.length - 1]--;
            // if (stack[stack.length - 1] === 0) {
            //     stack.pop();
            // }
            // stack.push(2)
        }
    }
    return slot === 0
}

console.log(isValidSerialization('9,3,4,#,#,1,#,#,2,#,6,#,#'))
console.log(isValidSerialization('1,#'))