/*
 * @Author: xiaohuolong
 * @Date: 2021-02-26 08:39:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-26 21:39:19
 * @FilePath: /js-demo/leetcode/844.js
 */
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
    844. 比较含退格的字符串
        给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。
        注意：如果对空文本输入退格字符，文本继续为空。
    示例 1：
        输入：S = "ab#c", T = "ad#c"
        输出：true
        解释：S 和 T 都会变成 “ac”。
    示例 2：
        输入：S = "ab##", T = "c#d#"
        输出：true
        解释：S 和 T 都会变成 “”。
    示例 3：
        输入：S = "a##c", T = "#a#c"
        输出：true
        解释：S 和 T 都会变成 “c”。
    示例 4：
        输入：S = "a#c", T = "b"
        输出：false
        解释：S 会变成 “c”，但 T 仍然是 “b”。
    提示：
        1 <= S.length <= 200
        1 <= T.length <= 200
        S 和 T 只含有小写字母以及字符 '#'。
    进阶：
        你可以用 O(N) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？

 */
var backspaceCompare = function(S, T) {
    const getStr = (s) => {
        let str = ''
        for (let i = 0; i < s.length; i++) {
            const el = s[i];
            if(el == '#'){
                str = str.substr(0, str.length - 1)
            }else{
                str += el
            }
        }
        return str
    }
    return getStr(S) == getStr(T)
};
var backspaceCompare = function(S, T) {
    let pos1 = S.length - 1
    let pos2 = T.length - 1
    let skip1 = 0
    let skip2 = 0
    while(pos1 >= 0 || pos2 >= 0){
        while(pos1 >= 0){
            if(S[pos1] == '#'){
                skip1++
                pos1--
            }else if(skip1 > 0){
                skip1--
                pos1--
            }else{
                break
            }
        }
        while(pos2 >= 0){
            if(T[pos2] == '#'){
                skip2++
                pos2--
            }else if(skip2 > 0){
                skip2--
                pos2--
            }else{
                break
            }
        }
        // console.log(pos1, pos2)
        // console.log(S[pos1], T[pos2])
        if(pos1 >= 0 && pos2 >= 0){
            if(S[pos1] != T[pos2]){
                return false
            }
        }else{
            if(pos1 >= 0 || pos2 >= 0){
                return false
            }
        }
        pos1--
        pos2--
    }
    // console.log(pos1, pos2)
    // if(pos1 >= 0 || pos2 >= 0){
    //     return false
    // }
    return true
};

// console.log(backspaceCompare('ab#c', 'ad#c'))
// console.log(backspaceCompare('ab##', 'a#c#'))
// console.log(backspaceCompare('a##c', '#a#c'))
// console.log(backspaceCompare('a#c', 'b'))
// console.log(backspaceCompare('xywrrmp', 'xywrrmu#p'))
console.log(backspaceCompare('bbbextm', 'bbb#extm'))
// console.log(backspaceCompare('bxj##tw', 'bxj###tw'))
// console.log(backspaceCompare("nzp#o#g", "b#nzp#o#g"))


