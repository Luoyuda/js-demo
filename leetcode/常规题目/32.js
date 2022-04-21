/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  let l = (r = count = 0)
  const n = s.length - 1
  for (let i = 0; i <= n; i++) {
    if (s[i] === '(') {
      l++
    } else {
      r++
    }
    if (l === r) {
      count = Math.max(count, 2 * r)
    } else if (r > l) {
      l = r = 0
    }
  }
  l = r = 0
  for (let i = n; i >= 0; i--) {
    if (s[i] === '(') {
      l++
    } else {
      r++
    }
    if (l === r) {
      count = Math.max(count, 2 * l)
    } else if (l > r) {
      l = r = 0
    }
  }
  return count
}

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  const stack = [-1]
  const n = s.length
  let count = 0
  for (let i = 0; i < n; i++) {
    if (s[i] === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length <= 0) {
        stack.push(i)
      } else {
        count = Math.max(count, i - stack[stack.length - 1])
      }
    }
  }
  return count
}
