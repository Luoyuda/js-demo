/*
 * @Author: xiaohuolong
 * @Date: 2020-07-13 17:06:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-13 17:36:27
 * @FilePath: /js-demo/leetcode/264.js
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

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
    min(a, b){
        return a < b
    }
}

/**
 * @param {number} n
 * @return {number}
 */

var Ugly = function(n=1690) {
    const res = []
    let minHeap = new MinHeap([])
    let num = 1
    let mask = [2,3,5]
    let hash = {}
    minHeap.heapPush(1)
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < mask.length; j++) {
            const el = num*mask[j]
            // console.log(el)
            if(!hash[el]) {
                minHeap.heapPush(el)
                hash[el] = true
            }
        }
        // console.log(`before`, num, minHeap.heapList)
        num = minHeap.heapPop()
        res.push(num)
        // console.log(`after-`, num, minHeap.heapList)
        // if(minHeap.heapList.length >= n) break
    }
    return res
}
var ugly = Ugly()
var nthUglyNumber = function(n) {
    return ugly[n-1]
};

console.log(nthUglyNumber(1690))