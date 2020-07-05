/*
 * @Author: xiaohuolong
 * @Date: 2020-06-28 11:08:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-05 20:30:48
 * @FilePath: /js-demo/algorithm/KMP/KMP.js
 */ 

// 推导 Next 数组
const getNextStr = (string) => {
    // 前缀变量
    let prefix = 0
    // 后缀变量
    let suffix = 1
    // 初始化 next 数组
    let next = [0, 0]
    // string[0] 存放字符串长度 如果 suffix 步数大于字符串长度，跳出
    while (suffix < string[0]){
        // 如果前缀回溯到 0 或者 字符串前缀 = 字符串后缀
        // ababc 假设当前 suffix = 3 prefix = 1 => next[4] = 2
        if(prefix == 0 || string[suffix] == string[prefix]){
            ++prefix
            ++suffix
            // 如果 string[4] == string[2]
            if(string[suffix] != string[prefix]){
                // next[4] = prefix
                next[suffix] = prefix
            }else{
                // next[4] = next[2]
                next[suffix] = next[prefix]
            }
        }else{
            // 回溯到上一个位置
            prefix = next[prefix]
        }
    }
    return next
}
// 查找字符串 (KMP)
const KMPStr = (S=[], T=[], pos=0) => {
    // 如果字符串都为空，返回-1
    if(!S[0] || !T[0]) return -1
    // 默认字符串 0 存放字符串长度
    // 主串游标
    let i = pos
    // 子串游标
    let j = 1
    // 生成 next 数组
    let next = getNextStr(T)
    // 如果游标都走到尽头，跳出循环
    while (i <= S[0] && j<= T[0]) {
        // 如果子串游标等于零，证明又回溯到子串初始位置
        // 如果主串游标位置等于子串游标位置，一起加一，比对下一个位置是否相等
        if(j == 0 || S[i] == T[j]){
            i++
            j++
        }else{
            // 如果子串游标位置不等于主串游标位置，且子串游标不等于 0 
            // 子串游标需回溯到上一个位置
            j = next[j]
        }
    }
    // 判断 j 是否大于 T 字符串长度
    return j > T[0] ? i - T[0] : -1
}

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
const KMP = (S='', T='', pos=0) => {
    // 判断空
    if(!S.length || !T.length) return -1
    let i = pos
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
module.exports = {
    KMP,
    KMPStr
}