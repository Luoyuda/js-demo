/*
 * @Author: xiaohuolong
 * @Date: 2021-03-26 19:42:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-26 19:51:28
 * @FilePath: /js-demo/leetcode/常规题目/1130.js
 */
/**
 * @param {number[]} arr
 * @return {number}
1130. 叶值的最小代价生成树
    给你一个正整数数组 arr，考虑所有满足以下条件的二叉树：
    每个节点都有 0 个或是 2 个子节点。
    数组 arr 中的值与树的中序遍历中每个叶节点的值一一对应。（知识回顾：如果一个节点有 0 个子节点，那么该节点为叶节点。）
    每个非叶节点的值等于其左子树和右子树中叶节点的最大值的乘积。
    在所有这样的二叉树中，返回每个非叶节点的值的最小可能总和。这个和的值是一个 32 位整数。
示例：
    输入：arr = [6,2,4]
    输出：32
解释：
    有两种可能的树，第一种的非叶节点的总和为 36，第二种非叶节点的总和为 32。
    24            24
   /  \          /  \
  12   4        6    8
 /  \               / \
6    2             2   4
 
提示：
    2 <= arr.length <= 40
    1 <= arr[i] <= 15
    答案保证是一个 32 位带符号整数，即小于 2^31。
 */
var mctFromLeafValues = function(arr) {
    let stack = []
    stack.push(Infinity)
    let mct = 0
    for(let i = 0; i < arr.length; i++){
        while(stack.length && arr[i] >= stack[stack.length-1]){
            mct += stack.pop() * Math.min(stack[stack.length - 1], arr[i])
        }
        stack.push(arr[i])
    }
    while(stack.length > 2){
        mct += stack.pop() * stack[stack.length - 1]
    }
    return mct
};
// class Solution {
//     public int mctFromLeafValues(int[] arr) {
//         Stack<Integer> st = new Stack();
//         st.push(Integer.MAX_VALUE);
//         int mct = 0;
//         for (int i = 0; i < arr.length; i++) {
//             while (arr[i] >= st.peek()) {
//                 mct += st.pop() * Math.min(st.peek(), arr[i]);
//             }
//             st.push(arr[i]);
//         }
//         while (st.size() > 2) {
//             mct += st.pop() * st.peek();
//         }
//         return mct;
//     }
// }
console.log(mctFromLeafValues([15,13,5,3,15]))