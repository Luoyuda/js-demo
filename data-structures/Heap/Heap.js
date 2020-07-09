/*
 * @Author: xiaohuolong
 * @Date: 2020-07-08 22:49:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-09 17:49:54
 * @FilePath: /js-demo/data-structures/Heap/Heap.js
 */ 
class Heap {
    constructor(list, maxLength, type){
        // this.heapList = [...list]
        this.heapList = []
        this.handle = this[type] || this.max
        this.maxLength = maxLength
        list.map(item => this.heapPush(item))
        this.heapify()
    }
    getLeftChildIndex(parentIndex){
        return (parentIndex * 2) + 1
    }
    getRightChildIndex(parentIndex){
        return (parentIndex * 2) + 2
    }
    getParentIndex(childIndex){
        return Math.floor((childIndex - 1) / 2)
    }
    hasParent(childIndex){
        return this.getParentIndex(childIndex) >= 0
    }
    hasLeftChild(childIndex){
        return this.getLeftChildIndex(childIndex) < this.heapList.length
    }
    hasRightChild(childIndex){
        return this.getRightChildIndex(childIndex) < this.heapList.length
    }
    leftChild(parentIndex){
        return this.heapList[this.getLeftChildIndex(parentIndex)]
    }
    rightChild(parentIndex){
        return this.heapList[this.getRightChildIndex(parentIndex)]
    }
    parent(childIndex){
        return this.heapList[this.getParentIndex(childIndex)]
    }
    max(a, b){
        return a >= b
    }
    min(a, b){
        return a < b
    }
    // 堆上浮操作
    heapUp(childIndex = this.heapList.length - 1){
        let temp = this.heapList[childIndex]
        let parentIndex = this.getParentIndex(childIndex)
        while (childIndex >= 0 && this.handle(temp, this.heapList[parentIndex])){
            this.heapList[childIndex] = this.heapList[parentIndex]
            childIndex = parentIndex
            parentIndex = this.getParentIndex(parentIndex)
        }
        this.heapList[childIndex] = temp
        return this;
    }
    // 堆下沉操作
    heapDown(parentIndex = 0){
        let childIndex = this.getLeftChildIndex(parentIndex)
        let temp = this.heapList[parentIndex]
        while (childIndex < this.heapList.length){
            if(this.hasRightChild(parentIndex) && this.handle(this.rightChild(parentIndex), this.leftChild(parentIndex))){
                childIndex ++ 
            }
            if(this.handle(temp, this.heapList[childIndex])) break
            this.heapList[parentIndex] = this.heapList[childIndex]
            parentIndex = childIndex
            childIndex = this.getLeftChildIndex(parentIndex)
        }
        this.heapList[parentIndex] = temp
        return this;
    }
    // 获取堆顶元素
    heapPeek(){
        return this.heapList[0]
    }
    // 删除堆顶节点
    heapPop(){
        if(this.heapList.length === 0) return null
        if(this.heapList.length === 1) return this.heapList.pop()
        const temp = this.heapList[0]
        this.heapList[0] = this.heapList.pop()
        this.heapDown()
        return temp
    }
    heapPush(item) {
        if(this.maxLength != undefined){
            if(this.heapList.length >= this.maxLength){
                if(this.handle(this.heapPeek(), item)){
                    this.heapPop()
                    this.heapList.push(item);
                    this.heapUp();
                }
            }else{
                this.heapList.push(item);
                this.heapUp();
            }
        }else{
            this.heapList.push(item);
            this.heapUp();
        }
        return this;
    }
    heapify() {
        for (let i = Math.floor((this.heapList.length-2)/2); i >= 0 ; i--){
            this.heapDown(i)
        }
        return this;
    }
}

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
}

class MaxHeap extends Heap {
    constructor(list, max){
        super(list, max, 'max')
    }
}

module.exports = {
    Heap,
    MaxHeap,
    MinHeap
}