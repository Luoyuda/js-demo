/*
 * @Author: xiaohuolong
 * @Date: 2021-05-01 08:12:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-01 09:15:19
 * @FilePath: /js-demo/algorithm/Sort/CountingSort.js
 */
/**
 * 计数排序
 * 每次遍历都是进行 n 次或者 k 次，所以计数排序的时间复杂度为 O(n + k)，k 表示数据的范围大小。
 * 用到的空间主要是长度为 k 的计数数组和长度为 n 的结果数组，所以空间复杂度也是 O(n + k)
 * 稳定
 * 计数排序只适用于数据范围不大的场景
 * @param {*} arr 
 */
var CountingSort = (arr) => {
  // 判空及防止数组越界
  if (arr == null || arr.length <= 1) return arr;
  // 找最大最小
  let min = Math.min(...arr)
  let range = Math.max(...arr) - min + 1
  // 建立长度为 range 的数组，下标 0~8 对应数字 1~9
  let counting = new Array(range).fill(0)
  // 遍历 arr 中的每个元素
  for (const x of arr) {
    // 将每个整数出现的次数统计到计数数组中对应下标的位置
    counting[x - min] += 1
  }
  // 记录前面比自己小的数字的总数
  let preCounts = 0
  for (let i = 0; i < counting.length; i++) {
    // 将 counting 计算成当前数字在结果中的起始下标位置。位置 = 前面比自己小的数字的总数。
    preCounts += counting[i]
    // 当前的数字比下一个数字小，累计到 preCounts 中
    counting[i] = preCounts - counting[i]
  }
  console.log(counting)

  let result = new Array(arr.length)
  for (const x of arr) {
    // counting[x - 1] 表示此元素在结果数组中的下标
    let index = counting[x - min]
    console.log(x)
    result[index] = x
    // 更新 counting[x - 1]，指向此元素的下一个下标
    counting[x-min]+=1
    console.log(result, counting)
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = result[i]
  }
  return arr
}
let arr = [0,2,3,4,1,5,3,1,6,3,6,7,1,2]
console.log(CountingSort(arr))