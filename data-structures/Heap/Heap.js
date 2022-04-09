/*
 * @Author: xiaohuolong
 * @Date: 2020-07-08 22:49:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-30 14:56:43
 * @FilePath: /js-demo/data-structures/Heap/Heap.js
 */ 
const helper = {
  swap(arr, i, j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  },
  parent(i){
    return i >> 1
  },
  left(i){
    return i * 2
  },
  right(i){
    return i * 2 + 1
  }
}
class Heap {
  constructor(size){
    // 开辟数组空间 heap[0] 表示堆的个数
    this.heap = new Array(size + 1);
    this.heap[0] = 0
  }
  get size() { return this.heap[0] }
  handle(i, j){
    return this.heap[i] < this.heap[j]
  }
  // 添加元素
  add(el){
    if(this.size >= this.heap.length) return -1
    // 往尾部插入元素后进行上浮操作
    this.heap[0] += 1
    this.heap[this.size] = el
    this.up()
    return this
  }
  // 弹出元素
  pop(){
    if(!this.size) return -1
    // 弹出堆顶后将最后一个元素放置到堆顶，然后执行下沉操作
    let el = this.peek()
    helper.swap(this.heap, 1, this.size)
    this.heap[this.size] = undefined
    this.heap[0] -= 1
    this.down()
    return el
  }
  // 上浮
  up(){
    let i = this.size
    let j = helper.parent(i)
    while (this.handle(i, j) && i > 1){
      helper.swap(this.heap, i, j)
      i = j
      j = helper.parent(i)
    }
  }
  // 下沉
  down(){
    let i = 1
    while(i < this.size && i <= this.size / 2){
      let l = helper.left(i)
      let r = helper.right(i)
      if(this.handle(r, i) || this.handle(l, i)){
        let j = this.handle(r, l) ? r : l
        helper.swap(this.heap, i, j)
        i = j
      }else{
        break
      }
    }
  }
  // 获取堆顶元素
  peek(){
    return this.heap[1]
  }
}
class MaxHeap extends Heap {
  handle(i, j){
    return this.heap[i] > this.heap[j]
  }
}
class MinHeap extends Heap {
  handle(i, j){
    return this.heap[i] < this.heap[j]
  }
}


module.exports = {
    Heap,
    MaxHeap,
    MinHeap
}