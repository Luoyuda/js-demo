/*
 * @Author: xiaohuolong
 * @Date: 2020-07-09 22:21:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 07:54:22
 * @FilePath: /js-demo/leetcode/常规题目/692.js
 */ 

class Heap {
    constructor(size, handle){
        this.list = new Array(size + 1)
        this.list[0] = size
        this.handle = handle || this.handle
        this.realSize = 0
    }
    handle(a, b){
        return a > b
    }
    getParentIndex(i){
        return Math.floor(i / 2)
    }
    getLeftChildIndex(i){
        return i * 2
    }
    getRightChildIndex(i){
        return i * 2 + 1
    }
    swap(i, j){
        let temp = this.list[i]
        this.list[i] = this.list[j]
        this.list[j] = temp
    }
    heapUp(i){
        // 1. 找到节点的父节点，判断是否需要交换
        let j = this.getParentIndex(i)
        while(this.list[i] !== undefined && this.handle(this.list[i], this.list[j]) && j >= 1){
            this.swap(i, j)
            i = j
            j = this.getParentIndex(i)
        }
    }
    heapDown(i){
        let n = Math.floor(this.realSize / 2)
        while(i < this.realSize && i <= n){
            let l = this.getLeftChildIndex(i)
            let r = this.getRightChildIndex(i)
            let left = this.list[l]
            let right = this.list[r]
            let curr = this.list[i]
            let j = i
            // console.log(curr, left, right)
            if(left === undefined && right === undefined) break
            if(right === undefined && this.handle(curr, left)) break
            if(this.handle(curr, left) && this.handle(curr, right)) break
            if(left === undefined) j = r
            else if(right === undefined) j = l
            else{
                if(this.handle(left, right)){
                    j = l
                }else{
                    j = r
                }
            }
            this.swap(i, j)
            i = j
        }
    }
    add(val){
        if(this.realSize >= this.list[0]){
            if(this.handle(this.peek(), val)){
                this.pop()
            }else{
                return
            }
        }
        this.realSize++
        this.list[this.realSize] = val
        // 插入后上浮
        this.heapUp(this.realSize)
    }
    pop(){
        let head = this.list[1]
        this.list[1] = this.list[this.realSize]
        this.list[this.realSize--] = undefined
        this.heapDown(1)
        return head
    }
    peek(){
        return this.list[1] != undefined ? this.list[1] : -1
    }
    size(){
        return this.realSize
    }
    heapify(list = [], handle){
        let size = list.length
        this.list = new Array(size + 1)
        this.list[0] = size
        this.handle = handle || this.handle
        this.realSize = 0
        for (let i = 0; i < size; i++) {
            this.add(list[i])
        }
    }
}
class MaxHeap extends Heap{
    constructor(size, handle){
        super(size, handle)
    }
    handle(a, b){
        return a > b
    }
}
class MinHeap extends Heap{
    constructor(size, handle){
        super(size, handle)
    }
    handle(a, b){
        return a < b
    }
}

var topKFrequent = function(words, k) {
    const map = new Map()
    const minHeap = new MinHeap(k, (a, b) => {
        // console.log(a, b)
        if(a.val == b.val) return a.key > b.key
        return a.val < b.val
    })
    const res = []
    words.map(item => {
        map.set(item, (map.get(item) || 0) + 1)
    })
    map.forEach((val, key) => {
        minHeap.add({key, val})
        console.log(minHeap.list)
    })
    while(minHeap.size()){
        res.push(minHeap.pop().key)
    }
    return res.reverse()
};
// /**
//  * @param {string[]} words
//  * @param {number} k
//  * @return {string[]}
//  */
// var topKFrequent = function(words, k) {
//     let map = new Map()
//     for(let word of words){
//         map.set(word, (map.get(word) || 0) + 1)
//     }
//     let list = []
//     for(let item of map.entries()){
//         list.push(item)
//     }
//     return list.sort((a, b) => {
//         if(b[1] == a[1]){
//             return a[0].localeCompare(b[0])
//         }else{
//             return b[1] - a[1]
//         }
//     }).slice(0, k).map(item => item[0])
// };
console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 3))
console.log(topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 3))
