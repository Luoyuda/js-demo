/*
 * @Author: xiaohuolong
 * @Date: 2021-05-06 08:46:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-09 15:13:04
 * @FilePath: /js-demo/leetcode/常规题目/68.js
 */
/*
68. 文本左右对齐
    给定一个单词数组和一个长度 maxWidth，重新排版单词，
    使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。
    你应该使用“贪心算法”来放置给定的单词；也就是说，尽可能多地往每行中放置单词。
    必要时可用空格 ' ' 填充，使得每行恰好有 maxWidth 个字符。
    要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，
    则左侧放置的空格数要多于右侧的空格数。
    文本的最后一行应为左对齐，且单词之间不插入额外的空格。
说明:
    单词是指由非空格字符组成的字符序列。
    每个单词的长度大于 0，小于等于 maxWidth。
    输入单词数组 words 至少包含一个单词。
示例:
    输入:
        words = ["This", "is", "an", "example", "of", "text", "justification."]
        maxWidth = 16
    输出:
        [
            "This    is    an",
            "example  of text",
            "justification.  "
        ]
示例 2:
    输入:
        words = ["What","must","be","acknowledgment","shall","be"]
        maxWidth = 16
    输出:
    [
        "What   must   be",
        "acknowledgment  ",
        "shall be        "
    ]
    解释: 注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
        因为最后一行应为左对齐，而不是左右两端对齐。       
        第二行同样为左对齐，这是因为这行只包含一个单词。
示例 3:
    输入:
    words = ["Science","is","what","we","understand","well","enough","to","explain",
            "to","a","computer.","Art","is","everything","else","we","do"]
    maxWidth = 20
    输出:
    [
        "Science  is  what we",
        "understand      well",
        "enough to explain to",
        "a  computer.  Art is",
        "everything  else  we",
        "do                  "
    ] 
*/
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    let res = []
    for (let i = 0; i < words.length;) {
        let j = i + 1
        let s = words[i].length
        let rs = words[i].length
        while (j < words.length && s + 1 + words[j].length <= maxWidth){
            s += words[j].length + 1
            rs += words[j].length
            j++
        }
        rs = maxWidth - rs
        let line = words[i]
        if(j == words.length){
            for (let k = i + 1; k < j; k++) {
                line += ' ' + words[k]
            }
            line += space(maxWidth - line.length)
        }else if(j - i == 1){
            line += space(maxWidth - line.length)
        }else{
            let base = Math.floor(rs / (j - i - 1))
            let rem = rs % (j - i - 1)
            i++
            for (let k = 0; i < j; i++, k++) {
                line += space(base + (k < rem ? 1 : 0)) + words[i]
            }
        }
        i = j
        res.push(line)
    }
    return res
};
var space = function(k){
    let s = ''
    while(k--) s += ' '
    return s
}

console.log(fullJustify(["Science","is","what","we","understand","well","enough","to","explain",
"to","a","computer.","Art","is","everything","else","we","do"], 20))