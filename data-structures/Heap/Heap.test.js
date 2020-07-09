/*
 * @Author: xiaohuolong
 * @Date: 2020-06-28 11:14:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-09 18:37:25
 * @FilePath: /js-demo/data-structures/Heap/Heap.test.js
 */ 

const { MinHeap, MaxHeap } = require('./Heap')
const { expect } = require('chai')

describe('Heap', () => {
    it('MinHeap', () => {
        const minHeap = new MinHeap([10,9,1,2,3,4,15,3])
        expect(minHeap.heapPeek()).to.eql(1)
        expect(minHeap.heapPop()).to.eql(1)
        expect(minHeap.heapPeek()).to.eql(2)
        expect(minHeap.heapPop()).to.eql(2)
        expect(minHeap.heapPush(1).heapPeek()).to.eql(1)
        expect(minHeap.heapPush(0).heapPeek()).to.eql(0)
    })
    it('MaxHeap', () => {
        const minHeap = new MaxHeap([10,9,1,2,3,4,15,3])
        expect(minHeap.heapPeek()).to.eql(15)
        expect(minHeap.heapPop()).to.eql(15)
        expect(minHeap.heapPeek()).to.eql(10)
        expect(minHeap.heapPop()).to.eql(10)
        expect(minHeap.heapPush(10).heapPeek()).to.eql(10)
        expect(minHeap.heapPush(11).heapPeek()).to.eql(11)
    })
})