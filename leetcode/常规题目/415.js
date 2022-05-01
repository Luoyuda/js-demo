/*
415. 字符串相加
  给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
  你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 
  也不能直接将输入的字符串转换为整数形式。
示例 1：
  输入：num1 = "11", num2 = "123"
  输出："134"
示例 2：
  输入：num1 = "456", num2 = "77"
  输出："533"
示例 3：
  输入：num1 = "0", num2 = "0"
  输出："0"
提示：
  1 <= num1.length, num2.length <= 104
  num1 和num2 都只包含数字 0-9
  num1 和num2 都不包含任何前导零
*/
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let i = num1.length - 1
  let j = num2.length - 1
  let carry = 0
  let res = ''
  while (i >= 0 || j >= 0 || carry) {
    let sum = carry
    if (i >= 0) {
      sum += +num1[i--]
    }
    if (j >= 0) {
      sum += +num2[j--]
    }
    carry = Math.floor(sum / 10)
    sum %= 10
    res = sum + res
  }
  return res
}
