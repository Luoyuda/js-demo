/*
 * @Author: xiaohuolong
 * @Date: 2020-06-29 22:12:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-30 15:59:59
 * @FilePath: /js-demo/leetcode/常规题目/215.js
 */ 
var findKthLargest = function(nums, k) {
    if(k < 1) return 0
    let res = nums.sort((a, b) => a > b ? -1 : 1)
    return res[k-1]
};

let partition = (arr, p, q) => {
    let x = arr[p]
    let i = p
    let j = p + 1
    for (j; j <= q; j++) {
        if(arr[j] < x){
            let temp = arr[++i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    let temp = arr[i]
    arr[i] = x
    arr[p] = temp
    return i
}

let quickSort = function(arr, p, q, k){
    const pos = partition(arr, p, q)
    if(k == pos){
        // console.log(arr)
        return arr[k]
    }else if(k < pos){
        return quickSort(arr, p, pos - 1, k)
    }else{
        return quickSort(arr, pos + 1, q, k)
    }
}
var findKthLargest = function(nums, k){
    return quickSort(nums, 0, nums.length - 1, nums.length - k)
};

var findKthLargest = function(nums, k){
    let max
    let n = nums.length
    for (let i = 0; i < k; i++) {
        max = i
        for (let j = i + 1; j < n; j++) {
            if(nums[j] > nums[max]){
                max = j
            }
        }
        let temp = nums[i]
        nums[i] = nums[max]
        nums[max] = temp
    }
    return nums[k - 1]
}

// 堆解法
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
        return this.list[1] || -1
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


var findKthLargest = function(nums, k){
    let heap = new MinHeap(k)
    for (let i = 0; i < nums.length; i++) {
        heap.add(nums[i])
    }
    return heap.pop()
}
// var num = [3,2,3,1,2,4,5,5,6] // 4
// var num = [6,10,13,5,8,3,2,11,-1,-1,-100] // 8
var num = [9, 3, 8, 2, 1] // 2
// console.log(quickSort(num, 0, num.length - 1))
console.log(findKthLargest(num, 4))

