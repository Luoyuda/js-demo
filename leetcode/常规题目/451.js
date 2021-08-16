/*
 * @Author: xiaohuolong
 * @Date: 2020-07-10 23:37:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-14 12:39:53
 * @FilePath: /js-demo/leetcode/常规题目/451.js
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
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    let map = new Map()
    for(let x of s) map.set(x, (map.get(x) || 0) + 1)
    return [...map.entries()].sort((a, b) => b[1] - a[1]).reduce((prev, [x, count]) => {
        while(count--) prev += x
        return prev
    }, '')
};
console.log(frequencySort('tree'))
console.log(frequencySort('cccaaa'))
console.log(frequencySort('Aabb'))