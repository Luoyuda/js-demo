/*
 * @Author: xiaohuolong
 * @Date: 2020-07-09 17:41:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-30 16:18:31
 * @FilePath: /js-demo/leetcode/常规题目/703.js
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
class KthLargest extends MinHeap {
    constructor(k, nums){
        super(k)
        this.oldAdd = this.add.bind(this)
        this.add = (val) => {
            this.oldAdd(val)
            return this.peek()
        }
        for (const x of nums) {
            this.add(x)
        }
    }
}
const k = new KthLargest(3, [4,5,8,2])
console.log(k)
console.log(k.add(3))
console.log(k.add(5));   // returns 5
console.log(k.add(10));  // returns 5
console.log(k.add(9));   // returns 8
console.log(k.add(4));   // returns 8
