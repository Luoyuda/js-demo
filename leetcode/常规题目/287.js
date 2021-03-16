/*
 * @Author: xiaohuolong
 * @Date: 2021-02-27 11:07:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-27 11:37:42
 * @FilePath: /js-demo/leetcode/287.js
 */
/**
 * @param {number[]} nums
 * @return {number}
    287. 寻找重复数
        给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），
        可知至少存在一个重复的整数。
        假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。
    示例 1：
        输入：nums = [1,3,4,2,2]
        输出：2
    示例 2：
        输入：nums = [3,1,3,4,2]
        输出：3
    示例 3：
        输入：nums = [1,1]
        输出：1
    示例 4：
        输入：nums = [1,1,2]
        输出：1
    提示：
        2 <= n <= 3 * 104
        nums.length == n + 1
        1 <= nums[i] <= n
        nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次
    进阶：
        如何证明 nums 中至少存在一个重复的数字?
        你可以在不修改数组 nums 的情况下解决这个问题吗？
        你可以只用常量级 O(1) 的额外空间解决这个问题吗？
        你可以设计一个时间复杂度小于 O(n2) 的解决方案吗？
 */
var findDuplicate = function(nums) {
    let arr = []
    for (let i = 0; i < nums.length; i++) {
        const el = nums[i];
        if(arr[el]){
            return el
        }else{
            arr[el] = true
        }
    }
    return null
};
var findDuplicate = function(nums) {
    let fast = 0
    let slow = 0
    do{
        slow = nums[slow]
        fast = nums[nums[fast]]
    }while(fast != slow)
    slow = 0
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow
};
console.log(findDuplicate([1,3,4,2,2]))