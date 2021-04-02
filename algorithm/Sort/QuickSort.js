/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 09:05:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-02 17:17:38
 * @FilePath: /js-demo/algorithm/Sort/QuickSort.js
 */
let partition = (arr, p, q) => {
    let x = arr[p]
    let i = p
    let j = p + 1
    for (j; j <= q; j++) {
        if(arr[j] < x){
            let temp = arr[++i]
            // console.log(temp, arr[j])
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    let temp = arr[i]
    arr[i] = x
    arr[p] = temp
    return i
}

let quickSort = (arr, p, q) => {
    if(p < q){
        const r = partition(arr, p, q)
        quickSort(arr, p, r - 1)
        quickSort(arr, r + 1, q)
    }
    return arr
}
let arr = [6,10,13,5,8,3,2,11,-1,-1,-100]
console.log(quickSort(arr, 0, arr.length - 1))
