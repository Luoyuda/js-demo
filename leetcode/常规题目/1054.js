/*
 * @Author: xiaohuolong
 * @Date: 2020-07-12 16:09:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-12 17:20:31
 * @FilePath: /js-demo/leetcode/1054.js
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

var rearrangeBarcodes = function(S) {
    if(S.length <= 1) return S
    const map = new Map()
    const heap = new MaxHeap([])
    for (let index = 0; index < S.length; index++) {
        const el = S[index]
        // console.log(el)
        map.set(el, (map.get(el) || 0) + 1)
    }
    // console.log(map)
    map.forEach((val, key) => {
        heap.heapPush({
            key,
            val
        })
    })
    let str = []
    if(heap.heapList.length <= 1) return str
    while(heap.heapList.length){
        let curr1 = heap.heapPop() || {}
        let curr2 = heap.heapPop() || {}
        if(curr1.val > (S.length + 1) /2){
            return []
        }
        str.push(curr1.key)
        if(curr2.key !== undefined) str.push(curr2.key)
        curr1.val -= 1
        curr2.val -= 1
        if(curr1.val > 0) heap.heapPush(curr1)
        if(curr2.val > 0) heap.heapPush(curr2)
        // console.log(curr1.key)
        // console.log(curr2.key)
    }
    // console.log(heap)
    return str
};

// console.log(rearrangeBarcodes([1,1,1,1,2,2,3,3]))
// console.log(rearrangeBarcodes([1,1,1,2,2,2]))
// console.log(rearrangeBarcodes([1,1,2,2,3,3]))
console.log(rearrangeBarcodes([1,1,2,]))