/*
 * @Author: xiaohuolong
 * @Date: 2020-07-07 09:51:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-07 09:57:03
 * @FilePath: /js-demo/algorithm/Sunday/Sunday.js
 */ 

const Sunday = (S='', T='', pos=0) => {
    let tLen = T.length
    let sLen = S.length
    if(S == T || !tLen) return 0
    if(!sLen) return -1
    let i = pos
    let j = 0
    let hash = {}
    // 计算遇到匹配字符 i 移动的步数
    for (let i = tLen-1; i >= 0; i--) {
        let el = T[i]
        if(hash[el] == undefined) hash[el] = tLen - i
    }
    // 如果不匹配，则移动子串长度加一长度的步数
    hash['notIn'] = tLen + 1

    while(i < sLen && j < tLen){
        // console.log(`i= ${i} j= ${j} S[i] = ${S[i]} T[j] = ${T[j]}`)
        if(S[i] == T[j]){
            // 匹配 i,j 一起移动
            i++
            j++
        }else{
            // console.log(i, j, S[i], T[j])
            // 获取到主串的下一个匹配位置
            let nextI = i-j+tLen
            // 查看其在不在子串中
            let next = hash[S[nextI]] || hash['notIn']
            // console.log(nextI, S[nextI], hash[S[nextI]], i, next, S[i+next])
            // console.log(i, next)
            // 移动到目标位置
            i += next - j
            j = 0
        }
    }
    return j >= tLen ? i - tLen : -1
}

module.exports = {
    Sunday,
}