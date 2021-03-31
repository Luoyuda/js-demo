/*
 * @Author: xiaohuolong
 * @Date: 2021-03-28 12:35:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-28 13:00:01
 * @FilePath: /js-demo/leetcode/常规题目/1410.js
 */
/**
 * @param {string} text
 * @return {string}
1410. HTML 实体解析器
「HTML 实体解析器」 是一种特殊的解析器，它将 HTML 代码作为输入，并用字符本身替换掉所有这些特殊的字符实体。
HTML 里这些特殊字符和它们对应的字符实体包括：
    双引号：字符实体为 &quot; ，对应的字符是 " 。
    单引号：字符实体为 &apos; ，对应的字符是 ' 。
    与符号：字符实体为 &amp; ，对应对的字符是 & 。
    大于号：字符实体为 &gt; ，对应的字符是 > 。
    小于号：字符实体为 &lt; ，对应的字符是 < 。
    斜线号：字符实体为 &frasl; ，对应的字符是 / 。
给你输入字符串 text ，请你实现一个 HTML 实体解析器，返回解析器解析后的结果。
示例 1：
    输入：text = "&amp; is an HTML entity but &ambassador; is not."
    输出："& is an HTML entity but &ambassador; is not."
    解释：解析器把字符实体 &amp; 用 & 替换
示例 2：
    输入：text = "and I quote: &quot;...&quot;"
    输出："and I quote: \"...\""
示例 3：
    输入：text = "Stay home! Practice on Leetcode :)"
    输出："Stay home! Practice on Leetcode :)"
示例 4：
    输入：text = "x &gt; y &amp;&amp; x &lt; y is always false"
    输出："x > y && x < y is always false"
示例 5：
    输入：text = "leetcode.com&frasl;problemset&frasl;all"
    输出："leetcode.com/problemset/all"
 */
var entityParser = function(text) {
    let map = {
        '&quot;': '\"',
        '&apos;': "'",
        '&amp;': '&',
        '&gt;': '>',
        '&lt;': '<',
        '&frasl;': '/',
    }
    let result = ''
    let str = ''
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if(ch == '&'){
            result += str
            str = '&'
        }else if(ch == ';'){
            str += ch
            result += map[str] || str
            str = ''
        }else{
            str += ch
        }
    }
    return result + str
};
// console.log(entityParser('x &gt; y &amp;&amp; x &lt; y is always false'))
// console.log(entityParser('leetcode.com&frasl;problemset&frasl;all'))
// console.log(entityParser('Stay home! Practice on Leetcode :)'))
// console.log(entityParser('&amp; is an HTML entity but &ambassador; is not.'))
// console.log(entityParser('and I quote: &quot;...&quot;'))
console.log(entityParser("&amp;amp;amp;gt;"))