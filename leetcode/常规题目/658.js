/*
 * @Author: xiaohuolong
 * @Date: 2021-05-07 07:59:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-07 08:07:04
 * @FilePath: /js-demo/leetcode/常规题目/658.js
 */
/*
658. 找到 K 个最接近的元素
    给定一个排序好的数组 arr ，两个整数 k 和 x ，
    从数组中找到最靠近 x（两数之差最小）的 k 个数。
    返回的结果必须要是按升序排好的。
    整数 a 比整数 b 更接近 x 需要满足：
        |a - x| < |b - x| 或者
        |a - x| == |b - x| 且 a < b
示例 1：
    输入：arr = [1,2,3,4,5], k = 4, x = 3
    输出：[1,2,3,4]
示例 2：
    输入：arr = [1,2,3,4,5], k = 4, x = -1
    输出：[1,2,3,4]
提示：
    1 <= k <= arr.length
    1 <= arr.length <= 104
    数组里的每个元素与 x 的绝对值不超过 104
*/
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function(arr, k, x) {
    let left = 0
    let right = arr.length - k
    while(left < right){
      // Prevent (left + right) overflow
        let mid = left + Math.floor((right - left) / 2)
        if(x - arr[mid] > arr[mid + k] - x){
            left = mid + 1
        }else{
            right = mid
        }
    }
    return arr.slice(left, left + k)
};

console.log(findClosestElements([1,2,3,4,5], 4, 3))