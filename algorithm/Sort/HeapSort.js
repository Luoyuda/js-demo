/*
 * @Author: xiaohuolong
 * @Date: 2021-04-30 14:56:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-30 16:18:48
 * @FilePath: /js-demo/algorithm/Sort/HeapSort.js
 */
/**
 * 堆：符合以下两个条件之一的完全二叉树：
 * 根节点的值 ≥ 子节点的值，这样的堆被称之为最大堆，或大顶堆；
 * 根节点的值 ≤ 子节点的值，这样的堆被称之为最小堆，或小顶堆。
 * 堆排序过程如下：
 * 用数列构建出一个大顶堆，取出堆顶的数字；
 * 调整剩余的数字，构建出新的大顶堆，再次取出堆顶的数字；
 * 循环往复，完成整个排序。
 * 时间: O(nlogn)
 * 空间: O(n)
 * 不稳定
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
var sortArray = function(arr){
    let n = arr.length
    let heap = new MinHeap(n)
    // let heap = new MaxHeap(n)
    heap.heapify(arr)
    for (let i = 0; i < n; i++) {
        arr[i] = heap.pop()
    }
    return arr
}
console.log(sortArray([5,2,3,1,0,-5]))
