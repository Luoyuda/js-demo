/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 10:09:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-16 17:23:28
 * @FilePath: /js-demo/leetcode/常规题目/15.js
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
    15. 三数之和
        给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
        注意：答案中不可以包含重复的三元组。
    示例 1：
        输入：nums = [-1,0,1,2,-1,-4]
        输出：[[-1,-1,2],[-1,0,1]]
    示例 2：
        输入：nums = []
        输出：[]
    示例 3：
        输入：nums = [0]
        输出：[]
    提示：
        0 <= nums.length <= 3000
        -105 <= nums[i] <= 105

 */
var threeSum = function(nums) {
    if(nums.length < 3) return []
    nums.sort((a, b) => a - b)
    let res = []
    let dfs = (t, start, sum) => {
        if(t.length == 3 && sum == 0){
            res.push(t)
            return
        }
        for (let i = start; i < nums.length; i++) {
            const el = nums[i];
            if(i > start && nums[i-1] == nums[i]) continue
            t.push(el)
            dfs(t.slice(), i+1, el + sum)
            t.pop(el)
        }
    }
    dfs([], 0, 0)
    return res
};

var threeSum = function(nums) {
    let res = []
    let len = nums.length
    if(len < 2) return res
    nums.sort((a, b) => a - b)
    for (let i = 0; i < len - 2; i++) {
        if (nums[i] > 0) break;
        if(i > 0 && nums[i] == nums[i - 1]) continue
        let left = i + 1
        let right = len - 1
        while(left < right){
            let sum = nums[i] + nums[left] + nums[right]
            if(sum == 0){
                res.push([nums[i], nums[left], nums[right]])
                while(left < right && nums[left] == nums[left + 1]){
                    left++
                }
                while(left < right && nums[right] == nums[right - 1]){
                    right--
                }
                left++
                right--
            }else if(sum > 0){
                right--
            }else if(sum < 0){
                left++
            }
        }
    }
    return res
};

var threeSum = function(nums) {
    // 结果数组
    let res = []
    let len = nums.length
    // 少于三个数
    if(len < 2) return res
    // 先排序
    nums.sort((a, b) => a - b)
    // console.log(nums)
    for (let i = 0; i < len - 2; i++) {
        const num = nums[i];
        // 大于0后续都是正数，直接跳出
        if(num > 0) break
        if(i > 0 && num == nums[i - 1]) continue
        let left = i + 1
        let right = len - 1
        while(left < right){
            let sum = num + nums[left] + nums[right]
            if(sum == 0){
                res.push([num, nums[left], nums[right]])
                while(left < right && nums[left] == nums[left + 1]){
                    left++
                }
                while(left < right && nums[right] == nums[right - 1]){
                    right--
                }
                left++
                right--
            }else if(sum > 0){
                right--
            }else if(sum < 0){
                left++
            }
        }
    }
    return res
}

console.log(threeSum([-1,0,1,2,-1,-4]))