/*
 * @Author: xiaohuolong
 * @Date: 2021-03-15 08:20:00
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-08 17:17:14
 * @FilePath: /js-demo/leetcode/常规题目/80.js
 */
/**
 * @param {number[]} nums
 * @return {number}
    80. 删除排序数组中的重复项 II
        给定一个增序排列数组 nums ，你需要在 原地 删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。
        不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
    说明：
        为什么返回数值是整数，但输出的答案是数组呢？
        请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
    示例 1：
        输入：nums = [1,1,1,2,2,3]
        输出：5, nums = [1,1,2,2,3]
        解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。 你不需要考虑数组中超出新长度后面的元素。
    示例 2：
        输入：nums = [0,0,1,1,1,1,2,3,3]
        输出：7, nums = [0,0,1,1,2,3,3]
        解释：函数应返回新长度 length = 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3 。 你不需要考虑数组中超出新长度后面的元素。
    提示：
        0 <= nums.length <= 3 * 104
        -104 <= nums[i] <= 104
        nums 按递增顺序排列
*/
var removeDuplicates = function(nums) {
    if(nums.length <= 1) return nums.length
    let i = 1
    let z = 1

    for(var j = 1; j < nums.length; j++) {
        // console.log(i, j, z)
        if(nums[j-1] == nums[j]){
            z++
        }else{
            z = 1
        }
        if(z <= 2){
            nums[i++] = nums[j]
        }
    }
    nums.length = i
    return nums.length
};
var removeDuplicates = function(nums) {
    let len = 0;
    let count = 2
    for (let i = 0; i < nums.length; i++) {
        if (len < count || nums[i] != nums[len - count])
            nums[len++] = nums[i];
    }
    return len;
};

console.log(removeDuplicates([0,0,1,1,1,1,2,3,3]))