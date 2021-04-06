/*
 * @Author: xiaohuolong
 * @Date: 2021-04-05 17:56:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-05 18:01:42
 * @FilePath: /js-demo/leetcode/常规题目/804.js
 */
/**
 * @param {string[]} words
 * @return {number}
804. 唯一摩尔斯密码词
    国际摩尔斯密码定义一种标准编码方式，将每个字母对应于一个由一系列点和短线组成的字符串，
    比如: "a" 对应 ".-", "b" 对应 "-...", "c" 对应 "-.-.", 等等。
    为了方便，所有26个英文字母对应摩尔斯密码表如下：
    [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
    给定一个单词列表，每个单词可以写成每个字母对应摩尔斯密码的组合。例如，"cab" 可以写成 "-.-..--..."，(即 "-.-." + ".-" + "-..." 字符串的结合)。我们将这样一个连接过程称作单词翻译。
    返回我们可以获得所有词不同单词翻译的数量。
例如:
    输入: words = ["gin", "zen", "gig", "msg"]
    输出: 2
    解释: 
    各单词翻译如下:
    "gin" -> "--...-."
    "zen" -> "--...-."
    "gig" -> "--...--."
    "msg" -> "--...--."
    共有 2 种不同翻译, "--...-." 和 "--...--.".
注意:
    单词列表words 的长度不会超过 100。
    每个单词 words[i]的长度范围为 [1, 12]。
    每个单词 words[i]只包含小写字母。
 */
let code = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
var uniqueMorseRepresentations = function(words) {
    let a = 'a'.charCodeAt()
    let set = new Set()
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let str = ''
        for (let j = 0; j < word.length; j++) {
            str += code[word[j].charCodeAt() - a]
        }
        set.add(str)
    }
    return set.size
};

console.log(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]))