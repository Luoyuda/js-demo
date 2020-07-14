/*
 * @Author: xiaohuolong
 * @Date: 2020-07-14 10:36:07
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-14 11:17:03
 * @FilePath: /js-demo/leetcode/239.js
 */ 

const { Heap } = require('../data-structures/Heap/Heap.js')

class MaxHeap extends Heap {
    constructor(list, max){
        super(list, max, 'max')
    }
    max(a={}, b={}){
        return a.val > b.val
    }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow1 = function(nums, k) {
    let i = 0
    let res = []
    while (i <= nums.length - k){
        // console.log(`i = ${i}`)
        let num = -Infinity
        for (let j = i; j < i + k; j++) {
            // console.log(`j = ${j}`)
            num = Math.max(num, nums[j])
        }
        // console.log(`num = ${num}`)
        res.push(num)
        i++
    }
    return res
};

var maxSlidingWindow = function(nums, k) {
    let res = []
    let heap = new MaxHeap([])
    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        // console.log(heap)
        if(i >= k-1){
            heap.heapPush({i, val})
            let max = heap.heapPeek()
            let start = i - (k-1)
            // console.log(i, nums[i])
            // console.log(max.i, start)
            // console.log(start, i)
            while(max.i < start){
                heap.heapPop()
                max = heap.heapPeek()
            }
            if(max.i === start){
                res.push(heap.heapPop().val)
            }else{
                res.push(max.val)
            }
        }else{
            heap.heapPush({i, val})
        }
    }
    // console.log(heap)
    return res
};
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
console.log(maxSlidingWindow([1,-1], 1))
console.log(maxSlidingWindow([9,10,9,-7,-4,-8,2,-6], 5))