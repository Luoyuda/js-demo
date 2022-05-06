/*
 * @Author: xiaohuolong
 * @Date: 2020-07-05 19:40:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-08 14:40:24
 * @FilePath: /js-demo/leetcode/常规题目/28.js
 */
/*
    28. 实现 strStr()
    实现 strStr() 函数。
        给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 
        needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
    示例 1:
        输入: haystack = "hello", needle = "ll"
        输出: 2
    示例 2:
        输入: haystack = "aaaaa", needle = "bba"
        输出: -1
    说明:
        当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
        对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。
*/
// 推导 Next 数组
var getNext = (string) => {
  // 前缀变量
  let prefix = 0
  // 后缀变量
  let suffix = 1
  // next 首个元素是 0
  let next = [0]
  // string 字符串从0开始
  while (suffix < string.length) {
    // 如果前缀变为零、 或着前缀跟后缀相等时
    if (prefix == 0 || string[suffix - 1] == string[prefix - 1]) {
      // 前缀 + 1
      prefix++
      // 判断后缀跟前缀位置是否相等
      if (string[suffix] != string[prefix - 1]) {
        next[suffix] = prefix
      } else {
        next[suffix] = next[prefix - 1]
      }
      suffix++
    } else {
      // 前缀回溯到前一个位置
      prefix = next[prefix - 1]
    }
  }
  return next
}
// KMP实现
var strStr = (S = '', T = '') => {
  // 判断空
  if (S == T || !T.length) return 0
  if (!S.length) return -1
  let i = 0
  let j = 0
  let next = getNext(T)
  console.log(next)
  while (i < S.length && j < T.length) {
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

var Sunday = (S = '', T = '', pos = 0) => {
  let tLen = T.length
  let sLen = S.length
  if (S == T || !tLen) return 0
  if (!sLen) return -1
  let i = pos
  let j = 0
  let hash = {}

  for (let i = tLen - 1; i >= 0; i--) {
    let el = T[i]
    if (hash[el] == undefined) hash[el] = tLen - i
  }

  hash['notIn'] = tLen + 1

  // console.log(hash)
  // console.log(tLen, sLen)
  while (i < sLen && j < tLen) {
    // console.log(`i= ${i} j= ${j} S[i] = ${S[i]} T[j] = ${T[j]}`)
    if (S[i] == T[j]) {
      i++
      j++
    } else {
      // console.log(i, j, S[i], T[j])
      let nextI = i - j + tLen
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

// let s1 = 'abcbcglx'
// let t11 = 'abca'
// let r11 = -1
// let t12 = 'bcgl'
// let r12 = 3
// let s2 = 'abcxabcdabxabcdabcdabcy'
// let t21 = 'abcdabcy'
// let r21 = 15
// let t22 = 'abcdabca'
// let r22 = -1
// let s3 = 'abcxabcdabxaabcdabcabcdabcdabcy'
// let t31 = 'abcdabca'
// let r31 = 12
// let t32 = 'aabaabaaa'
// let r32 = -1
//     console.log(Sunday('', ''),-1);
//     console.log(Sunday('a', ''),-1);
//     // console.log(Sunday('a', 'a'),0);
//     console.log(Sunday(s1, t11),r11);
//     console.log(Sunday(s1, t12),r12);
//     console.log(Sunday(s2, t21),r21);
//     console.log(Sunday(s2, t22),r22);
//     console.log(Sunday(s3, t31),r31);
//     console.log(Sunday(s3, t32),r32);

// // console.log('Sunday: ', Sunday('helilillo', 'll'))
// // console.log('Sunday: ', Sunday('mississippi', 'issip'))
// // console.log('Sunday: ', Sunday('mississippipi', 'issi'))
// console.log('Sunday: ', Sunday('mississippipi', 'pi'))
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
var strStr1 = (S, T) => {
  let getNext = (T) => {
    let j = -1
    let next = [j]
    for (let i = 1; i < T.length; i++) {
      while (j >= 0 && T[i] != T[j + 1]) {
        // 前后缀不相同了
        j = next[j] // 向前回溯
      }
      if (T[i] == T[j + 1]) j++
      next[i] = j
    }
    return next
  }
  if (T.length == 0) return 0
  let next = getNext(T)
  let j = -1 // 因为next数组里记录的起始位置为-1
  for (let i = 0; i < S.length; i++) {
    // 注意i就从0开始
    while (j >= 0 && S[i] != T[j + 1]) {
      // 不匹配
      j = next[j] // j 寻找之前匹配的位置
    }
    if (S[i] == T[j + 1]) {
      // 匹配，j和i同时向后移动
      j++ // i的增加在for循环里
    }
    if (j == T.length - 1) {
      // 文本串s里出现了模式串t
      return i - T.length + 1
    }
  }
  return -1
}
var strStr2 = (S, T) => {
  if (!T.length) return 0
  if (T.length == S.length) return S == T ? 0 : -1
  for (let i = 0; i < S.length - T.length + 1; i++) {
    if (S[i] != T[0]) continue
    if (S.substring(i, T.length + i) == T) {
      return i
    }
  }
  return -1
}
var strStr = (haystack, needle) => {
  if (!needle.length) return 0
  if (haystack.length == needle.length) return haystack == needle ? 0 : -1
  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    if (haystack[i] != needle[0]) continue
    let j = i
    let z = 0
    while (j < haystack.length && z < needle.length) {
      if (haystack[j] != needle[z]) break
      j++
      z++
    }
    if (z == needle.length) return i
  }
  return -1
}
// Sunday
var strStr = (S = '', T = '', pos = 0) => {
  let tLen = T.length
  let sLen = S.length
  if (!sLen || sLen < tLen) return -1
  if (tLen == sLen || !tLen) return S == T ? 0 : -1
  let i = pos
  let j = 0
  let dic = { not: tLen + 1 }
  for (let i = tLen - 1; i >= 0; i--) {
    let ch = T[i]
    if (!dic[ch]) dic[ch] = tLen - i
  }
  while (i < sLen && j < tLen) {
    if (S[i] == T[j]) {
      i++
      j++
    } else {
      let next_i = i - j + tLen
      let next = dic[S[next_i]] || dic['not']
      i += next - j
      j = 0
    }
  }
  return j == tLen ? i - tLen : -1
}

// KMP
var strStr = function (S, T) {
  let next = getNext(T)
  let m = S.length
  let n = T.length
  let i = (j = 0)
  while (i < m && j < n) {
    if (j < 0 || S[i] == T[j]) {
      i++
      j++
    } else {
      j = next[j]
    }
  }
  return j == n ? i - j : -1
}
var getNext = function (T) {
  let m = T.length
  let j = 0
  let next = new Array(m)
  let t = -1
  next[0] = -1
  while (j < m - 1) {
    if (t < 0 || T[j] == T[t]) {
      j++
      t++
      next[j] = t
    } else {
      t = next[t]
    }
  }
  return next
}
console.log(strStr('ACTGPACTGKACTGPACY', 'ACTGPACY'))
console.log(strStr('hello', 'll'))
// console.log(strStr('aabaaeeaafa', 'aabaaf'))
// console.log(strStr('abc', 'c'))
// console.log(getNextStr([5,'i','s','s','i','p']))

const uniquePathsWithObstacles = (ob) => {
  let m = ob.length
  let n = ob[0].length
  if (m == 0 || n == 0) return 0
  let dp = []
  for (let i = 0; i < m; i++) {
    dp.push([])
    for (let j = 0; j < n; j++) {
      dp[i].push(0)
    }
  }
  for (let i = 0; i < m; i++) {
    console.log(dp[i])
  }
  for (let i = 0; i < m; i++) {
    if (ob[i][0] == 1) break
    else dp[i][0] = 1
  }
  for (let i = 0; i < n; i++) {
    if (ob[0][i] == 1) break
    else dp[0][i] = 1
  }
  for (let i = 0; i < m; i++) {
    console.log(dp[i])
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // `ob[i][j] == 1`表示有障碍物，直接令`dp[i][j] = 0`;
      if (ob[i][j] == 1) dp[i][j] = 0
      // `ob[i][j] == 0`表示无障碍物，`dp[i][j] = dp[i - 1][j] + d[i][j - 1]`
      else dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  for (let i = 0; i < m; i++) {
    console.log(dp[i])
  }
  return dp[m - 1][n - 1]
}

// console.log(uniquePathsWithObstacles([
//     [0, 0, 0],
//     [1, 0, 0],
//     [0, 0, 0],
// ]))
