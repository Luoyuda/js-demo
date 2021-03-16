/*
 * @Author: xiaohuolong
 * @Date: 2020-07-09 17:41:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-09 17:42:50
 * @FilePath: /js-demo/leetcode/703.js
 */ 


const { Heap } = require('../data-structures/Heap/Heap.js')

class KthLargest extends Heap {
    constructor(max, list){
        super(list, max, 'min')
    }
    add(item){
        this.heapPush(item)
        return this.heapPeek()
    }
}
const k = new KthLargest(3, [4,5,8,2])
console.log(k)
console.log(k.add(3))
console.log(k.add(5));   // returns 5
console.log(k.add(10));  // returns 5
console.log(k.add(9));   // returns 8
console.log(k.add(4));   // returns 8
