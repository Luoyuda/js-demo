/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 22:36:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 22:59:05
 * @FilePath: /js-demo/leetcode/常规题目/756.js
 */
/* 
756. 金字塔转换矩阵
    现在，我们用一些方块来堆砌一个金字塔。 每个方块用仅包含一个字母的字符串表示。
    使用三元组表示金字塔的堆砌规则如下：
    对于三元组 ABC ，C 为顶层方块，方块 A 、B 分别作为方块 C 下一层的的左、右子块。
    当且仅当 ABC 是被允许的三元组，我们才可以将其堆砌上。
    初始时，给定金字塔的基层 bottom，用一个字符串表示。一个允许的三元组列表 allowed，
    每个三元组用一个长度为 3 的字符串表示。
    如果可以由基层一直堆到塔尖就返回 true ，否则返回 false 。
示例 1：
    输入：bottom = "BCD", allowed = ["BCG", "CDE", "GEA", "FFF"]
    输出：true
解释：
可以堆砌成这样的金字塔:
    A
   / \
  G   E
 / \ / \
B   C   D
    因为符合 BCG、CDE 和 GEA 三种规则。
示例 2：
    输入：bottom = "AABA", allowed = ["AAA", "AAB", "ABA", "ABB", "BAC"]
    输出：false
解释：
    无法一直堆到塔尖。
    注意, 允许存在像 ABC 和 ABD 这样的三元组，其中 C != D。
提示：
    bottom 的长度范围在 [2, 8]。
    allowed 的长度范围在[0, 200]。
    方块的标记字母范围为{'A', 'B', 'C', 'D', 'E', 'F', 'G'}。
*/
/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function(bottom, allowed) {
    let allows = {}
    for (const [a, b, c] of allowed) {
        let key = a + b
        if(!allows[key]) allows[key] = []
        allows[key].push(c)
    }
    let dfs = (last, now) => {
        if(last.length == 1) return true
        if(now.length + 1 == last.length) return dfs(now, '')
        let a = last[now.length]
        let b = last[now.length + 1]
        let list = allows[a+b] || []
        for (let i = 0; i < list.length; i++) {
            if(dfs(last, now + list[i]))return true
        }
        return false
    }
    return dfs(bottom, '')
};

console.log(pyramidTransition( "BCD", allowed = ["BCG", "CDE", "GEA", "FFF"]))
console.log(pyramidTransition("AABA", ["AAA", "AAB", "ABA", "ABB", "BAC"]))