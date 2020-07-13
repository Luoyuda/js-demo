/*
 * @Author: xiaohuolong
 * @Date: 2020-07-12 17:37:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-13 16:39:17
 * @FilePath: /js-demo/leetcode/373.js
 */
const { Heap } = require('../data-structures/Heap/Heap.js')

class MaxHeap extends Heap {
    constructor(list, max){
        super(list, max, 'max')
    }
    max(a={}, b={}){
        return a.count > b.count
    }
}

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
    min(a={}, b={}){
        return a.count <= b.count
    }
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function(nums1, nums2, k) {
    var maxHeap = new MaxHeap([], k)
    for (let i = 0; i < nums1.length; i++) {
        const el1 = nums1[i];
        for (let j = 0; j < nums2.length; j++) {
            const el2 = nums2[j];
            maxHeap.heapPush({
                val: [el1, el2],
                count: el1 + el2
            })
        }
    }
    // console.log(maxHeap)
    const res = []
    while (maxHeap.heapList.length){
        res.push(maxHeap.heapPop().val)
    }
    return res
};
// console.log(kSmallestPairs([1,7,11],[2,4,6], 3))
console.log(kSmallestPairs([1,1,2],[1,2,3], 2))

