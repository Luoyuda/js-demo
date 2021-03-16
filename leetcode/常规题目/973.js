/*
 * @Author: xiaohuolong
 * @Date: 2020-07-11 12:18:37
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-11 18:59:33
 * @FilePath: /js-demo/leetcode/973.js
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

const sqrt = (a, b) => {
    return Math.sqrt(Math.pow(b[0]-a[0], 2)+Math.pow(b[1]-a[1], 2))
}

var kClosest = function(points, K) {
    const heap = new MaxHeap(points.map(item => {
        return {
            item,
            val: sqrt([0,0], item)
        }
    }), K)
    // console.log(heap)
    const res = []
    while(heap.heapList.length){
        res.push(heap.heapPop().item)
    }
    return res
};

console.log(kClosest([[1,3],[-2,2]], 1))
console.log(kClosest([[3,3],[5,-1],[-2,4]], 2))
console.log(kClosest([[1,3],[-2,2],[2,-2]], 2))