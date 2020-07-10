/*
 * @Author: xiaohuolong
 * @Date: 2020-07-09 17:41:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-09 21:41:24
 * @FilePath: /js-demo/leetcode/offer.40.js
 */ 


const { Heap } = require('../data-structures/Heap/Heap.js')

class KthLargest extends Heap {
    constructor(max, list){
        super(list, max, 'max')
    }
    add(item){
        this.heapPush(item)
        return this.heapPeek()
    }
}
var getLeastNumbers = function(arr, k) {
    const kthLargest = new KthLargest(k, arr)
    return kthLargest.heapList
};
console.log(getLeastNumbers([3,2,1], 2))
