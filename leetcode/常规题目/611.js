/*
 * @Author: xiaohuolong
 * @Date: 2021-08-04 10:04:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-04 11:03:09
 * @FilePath: /js-demo/leetcode/常规题目/611.js
 */
/*
611. 有效三角形的个数
    给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
示例 1:
    输入: [2,2,3,4]
    输出: 3
解释:
    有效的组合是: 
    2,3,4 (使用第一个 2)
    2,3,4 (使用第二个 2)
    2,2,3
注意:
    数组长度不超过1000。
    数组里整数的范围为 [0, 1000]。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
    nums.sort((a, b) => a - b)
    let n = nums.length
    let ans = 0
    for(let i = 0; i < n; i++){
        let k = i
        for(let j = i + 1; j < n; j++){
            while(k + 1 < n && nums[k + 1] < nums[i] + nums[j]){
                k++
            }
            ans += Math.max(k - j, 0)
        }
    }
    return ans
};