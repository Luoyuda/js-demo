/*
 * @Author: xiaohuolong
 * @Date: 2021-04-17 07:58:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-28 15:59:45
 * @FilePath: /js-demo/leetcode/常规题目/220.js
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
220. 存在重复元素 III
    给你一个整数数组 nums 和两个整数 k 和 t 。
    请你判断是否存在两个下标 i 和 j，使得
    abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。
    如果存在则返回 true，不存在返回 false。
示例 1：
    输入：nums = [1,2,3,1], k = 3, t = 0
    输出：true
示例 2：
    输入：nums = [1,0,1,1], k = 1, t = 2
    输出：true
示例 3：
    输入：nums = [1,5,9,1,5,9], k = 2, t = 3
    输出：false
提示：
    0 <= nums.length <= 2 * 104
    -231 <= nums[i] <= 231 - 1
    0 <= k <= 104
    0 <= t <= 231 - 1
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i - k; j < i + k; j++) {
            if(j < 0 || j == i) continue;
            if(j >= nums.length) break; 
            if(Math.abs(nums[i] - nums[j]) <= t){
                // console.log(nums[i], i, nums[j], j);
                return true
            }
        }
    }
    return false
};
let params = [
    [[1,2,3,1], 3, 0],
    [[1,0,1,1], 1, 2],
    [[1,5,9,1,5,9], 2, 3]
]
let result = [
    true,
    true,
    false
]
params.forEach((item, index) => {
    console.log(containsNearbyAlmostDuplicate(...item))
})

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 * 超时
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
    let n = nums.length
    let set = new Set()
    for(let i = 0; i < n; i++){
        let arr = [...set].sort()
        if(search(arr, nums[i], t)){
            return true
        }
        set.add(nums[i])
        console.log(i, n)
        if(i >= k){
            set.delete(nums[i - k])
        }
    }
    return false
};
var search = function(arr, x, t){
    let l = 0
    let r = arr.length - 1
    while(l <= r){
        let m = l + Math.floor((r - l + 1) / 2)
        if(arr[m] >= x - t && arr[m] <= x + t) return true
        else if(arr[m] > x + t) r = m - 1
        else l = m + 1
    }
}

var containsNearbyAlmostDuplicate = function(nums, k, t) {
    const n = nums.length;
    const mp = new Map();
    for (let i = 0; i < n; ++i) {
        const x = nums[i];
        const id = getID(x, t + 1);
        if (mp.has(id)) {
            return true;
        }
        if (mp.has(id - 1) && Math.abs(x - mp.get(id - 1)) <= t) {
            return true;
        }
        if (mp.has(id + 1) && Math.abs(x - mp.get(id + 1)) <= t) {
            return true;
        }
        mp.set(id, x);
        if (i >= k) {
            mp.delete(getID(nums[i - k], t + 1));
        }
    }
    return false;
};

const getID = (x, w) => {
    return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w);
}
