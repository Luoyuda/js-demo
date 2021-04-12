/*
 * @Author: xiaohuolong
 * @Date: 2021-04-12 07:31:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-12 08:42:21
 * @FilePath: /js-demo/leetcode/常规题目/179.js
 */
/**
 * @param {number[]} nums
 * @return {string}
179. 最大数
    给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。
    注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。
示例 1：
    输入：nums = [10,2]
    输出："210"
示例 2：
    输入：nums = [3,30,34,5,9]
    输出："9534330"
示例 3：
    输入：nums = [1]
    输出："1"
示例 4：
    输入：nums = [10]
    输出："10"
提示：
    1 <= nums.length <= 100
    0 <= nums[i] <= 109
 */
var largestNumber = function(nums) {
    nums.sort((x, y) => {
        let sx = sy = 10
        while (sx <= x){
            sx *= 10
        }
        while (sy <= y){
            sy *= 10
        }
        // console.log((sx * y + x), (sy * x + y))
        return '' + (sx * y + x) - ('' + (sy * x + y))
    })
    // console.log(nums)
    if(nums[0] === 0) return '0'
    return nums.join('')
};

console.log(largestNumber([111311, 1113]))