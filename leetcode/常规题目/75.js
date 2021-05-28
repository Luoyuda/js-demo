/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 11:07:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-14 20:25:59
 * @FilePath: /js-demo/leetcode/常规题目/75.js
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
    75. 颜色分类
        给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，
        使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
        此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
    示例 1：
        输入：nums = [2,0,2,1,1,0]
        输出：[0,0,1,1,2,2]
    示例 2：
        输入：nums = [2,0,1]
        输出：[0,1,2]
    示例 3：
        输入：nums = [0]
        输出：[0]
    示例 4：
        输入：nums = [1]
        输出：[1]
    提示：
        n == nums.length
        1 <= n <= 300
        nums[i] 为 0、1 或 2
    进阶：
        你可以不使用代码库中的排序函数来解决这道题吗？
        你能想出一个仅使用常数空间的一趟扫描算法吗？
 */
var sortColors = function(nums) {
    let len = nums.length
    let left = 0
    let right = len - 1
    let i = 0
    while(i <= right){
        if(nums[i] == 0){
            let temp = nums[i]
            nums[i] = nums[left]
            nums[left] = temp
            left++
            i++
        }else if(nums[i] == 2){
            let temp = nums[i]
            nums[i] = nums[right]
            nums[right] = temp
            right--
        }else{
            i++
        }
    }
    return nums
};
/**
 * @param {[]number} nums 
 * @return {void}
 */
var sortColors = function(nums){
    let zero = -1
    let two = nums.length
    let one = 0
    while(one < two){
        // 当 1 指针对撞 2 指针 结束遍历
        if(nums[one] == 1){
            // 1 不作处理
            one++
        }else if(nums[one] == 0){
            // 0 把当前值跟 0 指针的下一个元素交换
            swap(nums, one++, ++zero)
        }else{
            // 2 把当前值跟 2 指针跟下一个元素交换
            swap(nums, one, --two)
        }
    }
    return nums
}
/**
 * 
 * @param {[]number} nums 
 * @param {number} i 
 * @param {number} j 
 */
var swap = function(nums, i, j){
    let temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
}

console.log(sortColors([2,0,2,1,1,0]))
console.log(sortColors([2,0,1]))
console.log(sortColors([1]))
console.log(sortColors([0]))
console.log(sortColors([2]))
