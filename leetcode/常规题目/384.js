/*
 * @Author: xiaohuolong
 * @Date: 2021-04-17 13:44:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 14:04:49
 * @FilePath: /js-demo/leetcode/常规题目/384.js
 */
/**
 * @param {number[]} nums
384. 打乱数组
    给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。
实现 Solution class:
    Solution(int[] nums) 使用整数数组 nums 初始化对象
    int[] reset() 重设数组到它的初始状态并返回
    int[] shuffle() 返回数组随机打乱后的结果
示例：
    输入
    ["Solution", "shuffle", "reset", "shuffle"]
    [[[1, 2, 3]], [], [], []]
    输出
    [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
解释
    Solution solution = new Solution([1, 2, 3]);
    solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
    solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
    solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
提示：
    1 <= nums.length <= 200
    -106 <= nums[i] <= 106
    nums 中的所有元素都是 唯一的
    最多可以调用 5 * 104 次 reset 和 shuffle
 */
var Solution = function(nums) {
    this.nums = nums
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.nums
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    const nums = this.nums.slice(0)
    let n = nums.length
    for (let i = 0; i < n; i++) {
        let rand = this.randOne(i, n - 1)
        this.swap(nums, i, rand)
    }
    return nums
};

// [n, m] 内的一个随机整数
Solution.prototype.randOne = function(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
};
// 交换
Solution.prototype.swap = function(nums, i, j) {
    let temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
};



let solution = new Solution([1, 2, 3]);
console.log(solution.shuffle());    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
console.log(solution.reset());      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
console.log(solution.shuffle());    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]