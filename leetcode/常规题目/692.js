/*
 * @Author: xiaohuolong
 * @Date: 2020-07-09 22:21:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-10 23:11:50
 * @FilePath: /js-demo/leetcode/692.js
 */ 

const { Heap } = require('../data-structures/Heap/Heap.js')

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
    min(a={}, b={}){
        if(a.val == b.val) return a.key > b.key
        return a.val < b.val
    }
}

var topKFrequent = function(words, k) {
    const map = new Map()
    const maxHeap = new MinHeap([],k)
    const res = []
    words.map(item => {
        map.set(item, (map.get(item) || 0) + 1)
    })
    map.forEach((val, key) => {
        maxHeap.heapPush({key, val})
    })
    while(maxHeap.heapList.length){
        res.push(maxHeap.heapPop().key)
    }
    return res.reverse()
};
console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 1))
console.log(topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 3))
