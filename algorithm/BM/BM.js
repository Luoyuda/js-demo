/*
 * @Author: xiaohuolong
 * @Date: 2020-06-28 17:06:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-30 20:46:04
 * @FilePath: /js-demo/algorithm/BM/BM.js
 */ 
// 坏字符散列表
const generateBmBc = (T) => {
    const obj = {}
    const len = T.length
    for (let i = 0; i < len; i++) {
        obj[T.charCodeAt(i)] = i
    }
    return obj
}
// 好后缀数组
const generateBmGs = (T) => {
    let len = T.length
    // 后缀
    const suffix = []
    // 前缀
    const prefix = []
    // 初始化
    for (let i = 0; i < len; i++) {
        suffix[i] = -1
        prefix[i] = false
    }
    // 遍历 子串
    for (let i = 0; i < len-1; i++){
        let j = i
        let k = 0
        while (j >= 0 && T[j] === T[len - 1 - k]){
            ++k
            suffix[k] = j
            --j
        }
        if(j === -1){
            prefix[k] = true
        }
    }

    return {
        suffix,
        prefix
    }
}
// 计算后缀移动步数
const moveByBmGs = (j, m, suffix, prefix) => {
    let k = m - 1 -j
    console.log(`k: ${k}`)
    if(suffix[k] !== -1){
        return j - suffix[k] + 1
    }
    for (let r = j + 2; r <= m - 1; r++) {
        if(prefix[m - r]){
            return r
        }
    }
    return m
}

const BM = (S='', T='', pos=0) => {
    let t = T.length
    let s = S.length
    if(!s || !t) return -1
    const { suffix, prefix } = generateBmGs(T)
    let i = pos
    while(i <= s - t){
        let j 
        for (j = t - 1; j >= 0; --j) {
            console.log(S[i+j], T[j])
            if(S[i+j] != T[j]){
                break
            }
        }
        if(j < 0){
            // 找到匹配字符串，跳出
            return i
        }
        // 取坏字符的位置
        let bc = bmBc[S.charCodeAt(i + j)] || 0
        let x = j - bc
        let y = 0
        if(j < t - 1){
            y = moveByBmGs(j, t, suffix, prefix)
        }
        // 滑动最大的距离
        i = i + Math.max(x, y)
    }
    return -1
}
module.exports = {
    BM,
}