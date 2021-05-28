/*
 * @Author: xiaohuolong
 * @Date: 2021-05-25 22:13:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-25 22:14:48
 * @FilePath: /js-demo/leetcode/常规题目/18.js
 */
/*
18. 四数之和
    给定一个包含 n 个整数的数组 nums 和一个目标值 target，
    判断 nums 中是否存在四个元素 a，b，c 和 d ，
    使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
    注意：答案中不可以包含重复的四元组。
示例 1：
    输入：nums = [1,0,-1,0,-2,2], target = 0
    输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
示例 2：
    输入：nums = [], target = 0
    输出：[]
提示：
    0 <= nums.length <= 200
    -109 <= nums[i] <= 109
    -109 <= target <= 109
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    let n = nums.length
    if(n < 4) return []
    nums.sort((a, b) => a - b)
    let res = []
    for(let a = 0; a < n; a++){
        if(a > 0 && nums[a] == nums[a - 1]) continue
        for(let b = a + 1; b < n; b++){
            if(b > a + 1 && nums[b] == nums[b - 1]) continue
            let c = b + 1
            let d = n - 1
            while(c < d){
                let sum = nums[a] + nums[b] + nums[c] + nums[d]
                if(sum == target) {
                    res.push([nums[a], nums[b], nums[c], nums[d]])
                    while(c < d && nums[c] == nums[c + 1]) c++
                    while(c < d && nums[d] == nums[d - 1]) d--
                    c++
                    d--
                }else if(sum > target){
                    d--
                }else{
                    c++
                }
            }
        }
    }
    return res
};