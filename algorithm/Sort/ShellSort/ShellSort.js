/*
 * @Author: xiaohuolong
 * @Date: 2021-04-29 14:39:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-29 14:43:49
 * @FilePath: /js-demo/algorithm/Sort/ShellSort.js
 */
let arr = [6,10,13,5,8,3,2,11,-1,-1,-100]
/**
 * 希尔排序:本质上是对插入排序的一种优化，它利用了插入排序的简单，
 * 又克服了插入排序每次只交换相邻两个元素的缺点。它的基本思想是：
 * 将待排序数组按照一定的间隔分为多个子数组，每组分别进行插入排序。
 * 这里按照间隔分组指的不是取连续的一段数组，而是每跳跃一定间隔取一个值组成一组
 * 逐渐缩小间隔进行下一轮排序
 * 最后一轮时，取间隔为 11，也就相当于直接使用插入排序。
 * 但这时经过前面的「宏观调控」，数组已经基本有序了，所以此时的插入排序只需进行少量交换便可完成
 * 时间:O(n)~O(n*n) 普遍最高在O(1.3*n)
 * 空间:O(1)
 * 不稳定
 * @param {[Number]} arr 待排序数组
 */
var ShellSort = arr => {
  let n = arr.length
  for (let gap = n >> 1; gap > 0; gap >>= 1) {
    for (let i = gap; i < n; i++) {
      let x = arr[i]
      let j = i - gap
      while (j >= 0 && x < arr[j]){
        arr[j + gap] = arr[j]
        j -= gap
      }
      arr[j + gap] = x
    }
  }
  return arr
}
console.log(ShellSort([...arr]))

var ShellSort = arr => {
  let n = arr.length
  let maxGap = 1;
  while (maxGap <= n / 3) {
      maxGap = maxGap * 3 + 1;
  }
  for (let gap = maxGap; gap > 0; gap = (gap - 1) / 3) {
    for (let i = gap; i < n; i++) {
      let x = arr[i]
      let j = i - gap
      while (j >= 0 && x < arr[j]){
        arr[j + gap] = arr[j]
        j -= gap
      }
      arr[j + gap] = x
    }
  }
  return arr
}
console.log(ShellSort([...arr]))