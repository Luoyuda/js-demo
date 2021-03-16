/*
 * @Author: xiaohuolong
 * @Date: 2020-07-10 23:37:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-11 11:18:14
 * @FilePath: /js-demo/leetcode/451.js
 */ 

const { Heap } = require('../data-structures/Heap/Heap.js')

class MaxHeap extends Heap {
    constructor(list, max){
        super(list, max, 'max')
    }
    max(a={}, b={}){
        return a.val >= b.val
    }
}
var frequencySort = function(s) {
    const map = new Map()
    const heap = new MaxHeap([])
    for (let index = 0; index < s.length; index++) {
        const el = s[index];
        map.set(el, (map.get(el) || 0) + 1)
    }
    map.forEach((val, key) => {
        heap.heapPush({ val, key })
    })
    let str = ''
    while(heap.heapList.length){
        const { key, val } = heap.heapPop()
        for (let index = 0; index < val; index++) {
            str += key
        }
    }
    return str
};
console.log(frequencySort('tree'))
console.log(frequencySort('cccaaa'))
console.log(frequencySort('Aabb'))