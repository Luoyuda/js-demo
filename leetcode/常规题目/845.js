/*
 * @Author: xiaohuolong
 * @Date: 2021-07-29 09:55:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-29 09:56:03
 * @FilePath: /js-demo/leetcode/常规题目/845.js
 */
/*
845. 数组中的最长山脉
    我们把数组 A 中符合下列属性的任意连续子数组 B 称为 “山脉”：
    B.length >= 3
    存在 0 < i < B.length - 1 使得 B[0] < B[1] < ... B[i-1] < B[i] > B[i+1] > ... > B[B.length - 1]
    （注意：B 可以是 A 的任意子数组，包括整个数组 A。）
    给出一个整数数组 A，返回最长 “山脉” 的长度。
    如果不含有 “山脉” 则返回 0。
示例 1：
    输入：[2,1,4,7,3,2,5]
    输出：5
    解释：最长的 “山脉” 是 [1,4,7,3,2]，长度为 5。
示例 2：
    输入：[2,2,2]
    输出：0
    解释：不含 “山脉”。
提示：
    0 <= A.length <= 10000
    0 <= A[i] <= 10000
*/
/**
 * @param {number[]} arr
 * @return {number}
 */
var longestMountain = function(arr) {
    let l = r = 0
    let n = arr.length - 1
    let ans = 0
    while(l < n - 1){
        r = l + 1
        if(arr[l] < arr[r]){
            while(r < n && arr[r] < arr[r + 1]) r++
            if(r < n && arr[r] > arr[r + 1]){
                while(r < n && arr[r] > arr[r + 1]) r++
                ans = Math.max(ans, r - l + 1)
            }else{
                r++
            }
        }
        l = r
    }
    return ans
};