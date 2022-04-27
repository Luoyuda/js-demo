/**
 * @param {number[]} nums
 * @param {string} value
 */
function minValue(nums, value) {
  nums.sort((a, b) => a - b)
  const n = value.length
  const result = []
  let flag = false
  for (let i = 0; i < n; i++) {
    const curr = value[i] - 0
    for (let j = 0; j < nums.length; j++) {
      if (flag) {
        result.push(nums[nums.length - 1])
        break
      } else if (curr === nums[j]) {
        result.push(nums[j])
        break
      } else if (curr < nums[j]) {
        if (j - 1 >= 0) {
          result.push(nums[j - 1])
        } else {
          console.log(nums)
        }
        flag = true
        break
      }
    }
  }
  return result.join('')
}
function minValue(nums, value) {
  nums.sort((a, b) => a - b)
  let ans
  // pass为true的情况，只有最高位没有数，或者上一位数小于对应n中的值
  var dfs = (idx, pass, tmp) => {
    if (idx === value.length) {
      ans = tmp
      return true
    }
    if (pass) {
      return dfs(idx + 1, pass, tmp * 10 + nums[nums.length - 1])
    } else {
      var iNum = value[idx] - 0
      for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] == iNum) {
          if (dfs(idx + 1, false, tmp * 10 + nums[i])) {
            return true
          }
        } else if (nums[i] < iNum) {
          if (dfs(idx + 1, true, tmp * 10 + nums[i])) {
            return true
          }
        } else {
          continue
        }
      }
      // 如果该位置都放不了且idx!=0 则return false
      if (idx != 0) {
        return false
      }
      // idx == 0，则后续都是最大值
      return dfs(idx + 1, true, tmp)
    }
  }

  dfs(0, false, 0)
  return ans
}
const tests = [
  { input: [[2, 4, 9], '23121'], output: '22999' },
  { input: [[9], '23121'], output: '9999' },
  { input: [[2, 3, 9], '23121'], output: '22999' },
  { input: [[2, 3, 9], '22121'], output: '22999' },
]

tests.forEach(({ input, output }) => {
  console.log(minValue(...input))
})
