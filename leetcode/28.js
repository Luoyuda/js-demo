/*
 * @Author: xiaohuolong
 * @Date: 2020-07-05 19:40:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-07 00:40:05
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

const Sunday = (S='', T='', pos=0) => {
    let tLen = T.length
    let sLen = S.length
    if(S == T || !tLen) return 0
    if(!sLen) return -1
    let i = pos
    let j = 0
    let hash = {}

    for (let i = tLen-1; i >= 0; i--) {
        let el = T[i]
        if(hash[el] == undefined) hash[el] = tLen - i
    }

    hash['notIn'] = tLen + 1
    
    // console.log(hash)
    // console.log(tLen, sLen)
    while(i < sLen && j < tLen){
        // console.log(`i= ${i} j= ${j} S[i] = ${S[i]} T[j] = ${T[j]}`)
        if(S[i] == T[j]){
            i++
            j++
        }else{
            // console.log(i, j, S[i], T[j])
            let nextI = i-j+tLen
            let next = hash[S[nextI]] || hash['notIn']
            // console.log(nextI, S[nextI], hash[S[nextI]], i, next, S[i+next])
            // next = next >= sLen && i + tLen - 1 <= sLen ? i-sLen-1 : next
            // console.log(i, next)
            i += next - j
            j = 0
        }
    }
    // console.log(i, j, tLen)
    return j >= tLen ? i - tLen : -1
}

let s1 = 'abcbcglx'
let t11 = 'abca'
let r11 = -1
let t12 = 'bcgl'
let r12 = 3
let s2 = 'abcxabcdabxabcdabcdabcy'
let t21 = 'abcdabcy'
let r21 = 15
let t22 = 'abcdabca'
let r22 = -1
let s3 = 'abcxabcdabxaabcdabcabcdabcdabcy'
let t31 = 'abcdabca'
let r31 = 12
let t32 = 'aabaabaaa'
let r32 = -1
    console.log(Sunday('', ''),-1);
    console.log(Sunday('a', ''),-1);
    // console.log(Sunday('a', 'a'),0);
    console.log(Sunday(s1, t11),r11);
    console.log(Sunday(s1, t12),r12);
    console.log(Sunday(s2, t21),r21);
    console.log(Sunday(s2, t22),r22);
    console.log(Sunday(s3, t31),r31);
    console.log(Sunday(s3, t32),r32);

// console.log('Sunday: ', Sunday('helilillo', 'll'))
// console.log('Sunday: ', Sunday('mississippi', 'issip'))
// console.log('Sunday: ', Sunday('mississippipi', 'issi'))
console.log('Sunday: ', Sunday('mississippipi', 'pi'))
// m i s s i s s i p p i    =>  p i
// 0 1 2 3 4 5 6 7 8 9 10   =>  0 1
// i = 0 j = 0 S[0 - 0 + 2] = s next = 3 => j = 0 i = 3
// i = 3 j = 0 S[3 - 0 + 2] = s next = 6 => j = 0 i = 6
// i = 6 j = 0 S[6 - 0 + 2] = p next = 6 + 2 = 8 => j = 0 i = 8
// i = 8 j = 0 S[8 - 0 + 2] = i next = 8 + 1 = 9 => j = 0 i = 9
// i = 9 j = 0 
// console.log('Sunday: ', Sunday('aaaaa', 'bba'))
// console.log('Sunday: ', Sunday('hello', 'll'))
// console.log(strStr('mississippi', 'issip'))
// console.log(strStr('mississippi', 'a'))
// console.log(getNextStr([5,'i','s','s','i','p']))


const uniquePathsWithObstacles = (ob) => {
    let m = ob.length
    let n = ob[0].length
    if(m == 0 || n == 0) return 0
    let dp = []
    for(let i = 0; i < m; i++ ){
        dp.push([])
        for(let j = 0; j < n; j++ ){
            dp[i].push(0)
        }
    }
    for (let i = 0; i < m; i++) {
        console.log(dp[i])
    }
    for(let i = 0; i < m; i++){
        if(ob[i][0] == 1) break
        else dp[i][0] = 1
    }
    for(let i = 0; i < n; i++){
        if(ob[0][i] == 1) break
        else dp[0][i] = 1
    }
    for (let i = 0; i < m; i++) {
        console.log(dp[i])
    }
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            // `ob[i][j] == 1`表示有障碍物，直接令`dp[i][j] = 0`;
            if(ob[i][j] == 1) dp[i][j] = 0;
            // `ob[i][j] == 0`表示无障碍物，`dp[i][j] = dp[i - 1][j] + d[i][j - 1]`
            else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    for (let i = 0; i < m; i++) {
        console.log(dp[i])
    }
    return dp[m - 1][n - 1];
}

// console.log(uniquePathsWithObstacles([
//     [0, 0, 0],
//     [1, 0, 0],
//     [0, 0, 0],
// ]))