/*
 * @Author: xiaohuolong
 * @Date: 2020-07-11 19:07:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-11 19:35:40
 * @FilePath: /js-demo/leetcode/17.20.js
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

class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap([])
        this.minHeap = new MinHeap([])
        this.ans = true
    }
    addNum(num) {
        if(this.ans){
            this.minHeap.heapPush(num)
            this.maxHeap.heapPush(this.minHeap.heapPop())
        }else{
            this.minHeap.heapPush(this.maxHeap.heapPop())
            this.minHeap.heapPush(num)
            this.maxHeap.heapPush(this.minHeap.heapPop())
        }
        this.ans = !this.ans
    }
    findMedian() {
        if(!this.ans) return this.maxHeap.heapPeek()
        return (this.maxHeap.heapPeek() + this.minHeap.heapPeek())/2
    }
}
// ["M","a","f","a","f","a","f","a","f","a","f","a","f","a","f","a","f","a","f","a","f","a","f"]
// [[],[6],[],[10],[],[2],[],[6],[],[5],[],[0],[],[6],[],[3],[],[1],[],[0],[],[0],[]]
// [null,null,6.0,null,8.0,null,6.0,null,6.0,null,6.0,null,5.0,null,5.0,null,5.0,null,5.0,null,5.0,null,5.0]
// [null,null,6.0,null,8.0,null,6.0,null,6.0,null,6.0,null,5.5,null,6.0,null,5.5,null,5.0,null,4.0,null,3.0]
const m = new MedianFinder()
m.addNum(6)
console.log(m.findMedian())
console.log(m)
m.addNum(10)
console.log(m.findMedian())
console.log(m)
m.addNum(2)
console.log(m.findMedian())
console.log(m)
m.addNum(6)
console.log(m.findMedian())
m.addNum(5)
console.log(m.findMedian())
m.addNum(0)
console.log(m.findMedian())
m.addNum(6)
console.log(m.findMedian())
m.addNum(3)
console.log(m.findMedian())
m.addNum(1)
console.log(m.findMedian())
m.addNum(0)
console.log(m.findMedian())
m.addNum(0)
console.log(m.findMedian())
console.log(m)
