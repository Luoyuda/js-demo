/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 22:07:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 22:20:06
 * @FilePath: /js-demo/leetcode/常规题目/1389.js
 */
/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 * 1389. 按既定顺序创建目标数组
    给你两个整数数组 nums 和 index。你需要按照以下规则创建目标数组：
    目标数组 target 最初为空。
    按从左到右的顺序依次读取 nums[i] 和 index[i]，在 target 数组中的下标 index[i] 处插入值 nums[i] 。
    重复上一步，直到在 nums 和 index 中都没有要读取的元素。
    请你返回目标数组。
示例 1：
    输入：nums = [0,1,2,3,4], index = [0,1,2,2,1]
    输出：[0,4,1,3,2]
解释：
    nums       index     target
    0            0        [0]
    1            1        [0,1]
    2            2        [0,1,2]
    3            2        [0,1,3,2]
    4            1        [0,4,1,3,2]
示例 2：
    输入：nums = [1,2,3,4,0], index = [0,1,2,3,0]
    输出：[0,1,2,3,4]
解释：
    nums       index     target
    1            0        [1]
    2            1        [1,2]
    3            2        [1,2,3]
    4            3        [1,2,3,4]
    0            0        [0,1,2,3,4]
示例 3：
    输入：nums = [1], index = [0]
    输出：[1]
 */
var createTargetArray = function(nums, index) {
    let res = []
    for (let i = 0; i < index.length; i++) {
        const j = index[i];
        const num = nums[i]
        if(res[j] != undefined){
            for (let z = nums.length - 1; z > j ; z--) {
                res[z] = res[z-1]
            }
        }
        res[j] = num
    }
    return res
};

// console.log(createTargetArray([0, 1, 2, 3, 4], [0, 1, 2, 2, 1]))
// console.log(createTargetArray([1], [0]))
// console.log(createTargetArray([1,2,3,4,0], [0,1,2,3,0]))
console.log(createTargetArray(
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
))