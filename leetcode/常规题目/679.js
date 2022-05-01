/*
679. 24 点游戏
  给定一个长度为4的整数数组 cards 。你有 4 张卡片，每张卡片上都包含一个范围在 [1,9] 的数字。您应该使用运算符 ['+', '-', '*', '/'] 和括号 '(' 和 ')' 将这些卡片上的数字排列成数学表达式，以获得值24。
你须遵守以下规则:
  除法运算符 '/' 表示实数除法，而不是整数除法。
  例如， 4 /(1 - 2 / 3)= 4 /(1 / 3)= 12 。
  每个运算都在两个数字之间。特别是，不能使用 “-” 作为一元运算符。
  例如，如果 cards =[1,1,1,1] ，则表达式 “-1 -1 -1 -1” 是 不允许 的。
  你不能把数字串在一起
  例如，如果 cards =[1,2,1,2] ，则表达式 “12 + 12” 无效。
  如果可以得到这样的表达式，其计算结果为 24 ，则返回 true ，否则返回 false 。

示例 1:
  输入: cards = [4, 1, 8, 7]
  输出: true
  解释: (8-4) * (7-1) = 24
示例 2:
  输入: cards = [1, 2, 1, 2]
  输出: false
提示:
  cards.length == 4
  1 <= cards[i] <= 9
*/
/**
 * @param {number[]} cards
 * @return {boolean}
 */
var judgePoint24 = function (cards) {
  const n = cards.length
  if (n === 1) return Math.abs(cards[0] - 24) < 1e-9
  for (let i = 0; i < n; i++) {
    const a = cards[i]
    for (let j = i + 1; j < n; j++) {
      const b = cards[j]
      const newCards = cards.filter((item, idx) => idx !== i && idx !== j)
      for (const fn of fns) {
        if (judgePoint24([...newCards, fn(a, b)])) return true
      }
    }
  }
  return false
}
const fns = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => b - a,
  (a, b) => a * b,
  (a, b) => a / (b || 1),
  (a, b) => b / (a || 1),
]
