/*
 * @Author: xiaohuolong
 * @Date: 2020-07-12 16:01:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-12 16:05:12
 * @FilePath: /js-demo/leetcode/17.14.js
 */ 

const { Heap } = require('../data-structures/Heap/Heap.js')

class MaxHeap extends Heap {
    constructor(list, max){
        super(list, max, 'max')
    }
    max(a, b){
        return a > b
    }
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
    const heap = new MaxHeap(arr, k)
    console.log(heap)
    const res = []
    while (heap.heapList.length){
        res.push(heap.heapPop())
    }
    return res
};

console.log(smallestK([1,3,5,7,2,4,6,8], 4))