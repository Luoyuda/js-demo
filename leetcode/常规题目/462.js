/*
 * @Author: xiaohuolong
 * @Date: 2021-05-18 08:47:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-18 08:54:10
 * @FilePath: /js-demo/leetcode/常规题目/462.js
 */
/*
462. 最少移动次数使数组元素相等 II
    给定一个非空整数数组，找到使所有数组元素相等所需的最小移动数，
    其中每次移动可将选定的一个元素加1或减1。 您可以假设数组的长度最多为10000。
例如:
    输入:
        [1,2,3]
    输出:
        2
说明：
    只有两个动作是必要的（记得每一步仅可使其中一个元素加1或减1）： 
    [1,2,3]  =>  [2,2,3]  =>  [2,2,2]
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves2 = function(nums) {
    let sum = 0
    shuffle(nums)
    let mid = find(nums, 0, nums.length - 1, Math.floor(nums.length / 2))
    for(let x of nums) sum += Math.abs(x - mid)
    return sum
};

var randOne = function(m, n){
    return m + Math.floor(Math.random() * (n - m + 1))
}

var shuffle = function(nums){
    let n = nums.length
    for(let i = 0; i < n; i++){
        let rand = randOne(i, n - 1)
        swap(nums, i, rand)
    }
}

var find = function(nums, p, q, k){
    if(p == q) return nums[k]
    let m = partition(nums, p, q)
    if(m == k){
        return nums[k]
    }else if(m < k){
        return find(nums, m + 1, q, k)
    }else{
        return find(nums, p, m - 1, k)
    }
}
var partition = function(nums, p, q){
    let x = nums[p]
    let i = p + 1
    let j = q
    while(i < j){
        while(i < j && nums[i] <= x) i++
        while(i < j && nums[j] >= x) j--
        if(i != j){
            swap(nums, i, j)
            i++
            j--
        }
    }
    if(i == j && nums[j] >= x) j--
    swap(nums, j, p)
    return j
}
var swap = function(nums, i, j){
    let temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
}

console.log(minMoves2([1]))