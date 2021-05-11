/*
 * @Author: xiaohuolong
 * @Date: 2021-04-30 17:23:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-30 17:23:54
 * @FilePath: /js-demo/leetcode/常规题目/912.js
 */
/*
912. 排序数组
    给你一个整数数组 nums，请你将该数组升序排列。
示例 1：
    输入：nums = [5,2,3,1]
    输出：[1,2,3,5]
示例 2：
    输入：nums = [5,1,1,2,0,0]
    输出：[0,0,1,1,2,5]
提示：
    1 <= nums.length <= 50000
    -50000 <= nums[i] <= 50000
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
            if(this.handle(val, this.peek())){
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
    // let heap = new MinHeap(n)
    let heap = new MaxHeap(n)
    for (let i = 0; i < n; i++) {
        heap.add(arr[i])
    }
    for (let i = 0; i < n; i++) {
        arr[i] = heap.pop()
    }
    return arr.reverse()
}