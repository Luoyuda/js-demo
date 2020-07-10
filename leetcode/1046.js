/*
 * @Author: xiaohuolong
 * @Date: 2020-07-09 17:41:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-09 23:47:29
 * @FilePath: /js-demo/leetcode/1046.js
 */ 


const { MaxHeap } = require('../data-structures/Heap/Heap.js')

var lastStoneWeight = function(stones) {
    let maxHeap = new MaxHeap(stones)
    while(maxHeap.heapList.length > 1){
        let i = maxHeap.heapPop()
        let j = maxHeap.heapPop()
        let z = i - j
        if(z > 0) maxHeap.heapPush(z)
    }
    return maxHeap.heapPeek() || 0
};

console.log(lastStoneWeight([2,7,4,1,8,1]))