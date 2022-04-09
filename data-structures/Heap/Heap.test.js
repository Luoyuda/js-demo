/*
 * @Author: xiaohuolong
 * @Date: 2020-06-28 11:14:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-09 18:37:25
 * @FilePath: /js-demo/data-structures/Heap/Heap.test.js
 */ 
const { MinHeap, MaxHeap } = require('./Heap')
describe('Heap', function() {
  test(`minHeap`, () => {
    const test = [10,9,1,2,3,4,15,3]
    const minHeap = new MinHeap(test.length)
    test.forEach(el => minHeap.add(el))
    expect(minHeap.peek()).toEqual(1)
    expect(minHeap.pop()).toEqual(1)
    expect(minHeap.peek()).toEqual(2)
    expect(minHeap.pop()).toEqual(2)
    expect(minHeap.add(1).peek()).toEqual(1)
    expect(minHeap.add(0).peek()).toEqual(0)
  });
  test(`minHeap`, () => {
    const test = [10,9,1,2,3,4,15,3]
    const minHeap = new MaxHeap(test.length)
    test.forEach(el => minHeap.add(el))
    expect(minHeap.peek()).toEqual(15)
    expect(minHeap.pop()).toEqual(15)
    expect(minHeap.peek()).toEqual(10)
    expect(minHeap.pop()).toEqual(10)
    expect(minHeap.add(10).peek()).toEqual(10)
    expect(minHeap.add(11).peek()).toEqual(11)
  });
})