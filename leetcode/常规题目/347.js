/*
 * @Author: xiaohuolong
 * @Date: 2020-07-09 22:21:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-10 23:30:01
 * @FilePath: /js-demo/leetcode/347.js
 */ 

const { Heap } = require('../data-structures/Heap/Heap.js')

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
    min(a={}, b={}){
        return a.val <= b.val
    }
}

var topKFrequent = function(nums, k) {
    const map = new Map()
    const maxHeap = new MinHeap([],k)
    const res = []
    nums.map(item => {
        map.set(item, (map.get(item) || 0) + 1)
    })
    if(map.size <= k) {
        return [...map.keys()]
    }
    // console.log(map)
    map.forEach((val, key) => {
        // console.log(maxHeap.heapList)
        maxHeap.heapPush({key, val})
    })

    while(maxHeap.heapList.length){
        res.push(maxHeap.heapPop().key)
    }
    return res.reverse()
};

console.log(topKFrequent([5,2,5,3,5,3,1,1,3], 2))
console.log(topKFrequent([1,1,1,2,2,3], 2)) // 
console.log(topKFrequent([4,1,-1,2,-1,2,3], 2)) // -1 2
