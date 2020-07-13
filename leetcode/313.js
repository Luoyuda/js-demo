/*
 * @Author: xiaohuolong
 * @Date: 2020-07-13 17:06:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-13 18:18:32
 * @FilePath: /js-demo/leetcode/313.js
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

var nthSuperUglyNumber = function(n, primes=[]) {
    let minHeap = new MinHeap([])
    let num = 1
    let hash = {}
    minHeap.heapPush(1)
    for (let i = 0; i < n; i++) {
        // console.log(`before`, num, minHeap.heapList)
        num = minHeap.heapPop()
        for (let j = 0; j < primes.length; j++) {
            const el = num*primes[j]
            // console.log(el)
            if(!hash[el]) {
                minHeap.heapPush(el)
                hash[el] = true
            }
        }
        // console.log(`after-`, num, minHeap.heapList)
    }
    return num
};

console.log(nthSuperUglyNumber(12, [2,7,13,19]))
console.log(nthSuperUglyNumber(3, [2]))