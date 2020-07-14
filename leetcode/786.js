/*
 * @Author: xiaohuolong
 * @Date: 2020-07-14 10:00:55
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-14 10:36:17
 * @FilePath: /js-demo/leetcode/786.js
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
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function(A, K) {
    const maxHeap = new MaxHeap([], K)
    for (let i = 0; i < A.length; i++) {
        const el1 = A[i];
        for (let j = i+1; j < A.length; j++){
            const el2 = A[j];
            // console.log(el1+'/'+el2)
            maxHeap.heapPush({
                el1,
                el2,
                val: el1/el2
            })
        }
    }
    let item = maxHeap.heapPeek() || {}
    let res = []
    if(item.el1){
        res.push(item.el1)
        res.push(item.el2)
    }
    // console.log(maxHeap)
    return res
};

console.log(kthSmallestPrimeFraction([1,2,3,5], 3))
console.log(kthSmallestPrimeFraction([1,7], 1))