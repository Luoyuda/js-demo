/*
 * @Author: xiaohuolong
 * @Date: 2020-07-05 19:40:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-05 20:27:45
 * @FilePath: /js-demo/leetcode/28.js
 */ 

// 推导 Next 数组
const getNext = (string) => {
    // 前缀变量
    let prefix = 0
    // 后缀变量
    let suffix = 1
    // next 首个元素是 0
    let next = [0]
    // string 字符串从0开始
    while (suffix < string.length){
        // 如果前缀变为零、 或着前缀跟后缀相等时
        if(prefix == 0 || string[suffix-1] == string[prefix-1]){
            // 前缀 + 1
            prefix++
            // 判断后缀跟前缀位置是否相等
            if(string[suffix] != string[prefix-1]){
                next[suffix] = prefix
            }else{
                next[suffix] = next[prefix-1]
            }
            suffix++
        }else{
            // 前缀回溯到前一个位置
            prefix = next[prefix-1]
        }
    }
    return next
}
// KMP实现
const strStr = (S='', T='') => {
    // 判断空
    if(S == T || !T.length) return 0
    if(!S.length) return -1
    let i = 0
    let j = 0
    let next = getNext(T)
    while(i < S.length && j < T.length){
        if (S[i] === T[j]) {
            j++
            i++
        } else {
            // j 回溯到 next 数组提示到回溯位置
            // j 回溯到最初到位置
            j = j > 0 ? next[j] : 0
            i++
        }
    }
    return j >= T.length ? i - T.length : -1
}

console.log(strStr('hello', 'll'))
console.log(strStr('mississippi', 'issip'))
console.log(strStr('mississippi', 'a'))
// console.log(getNextStr([5,'i','s','s','i','p']))

