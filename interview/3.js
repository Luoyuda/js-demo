var a = 0
var total = 0
var result = []
function foo(a) {
  for (let i = 0; i < 3; i++) {
    result[i] = function () {
      total += i * a
      console.log(total)
    }
  }
}

foo(1)
result[0]()
result[1]()
result[2]()

function getArray(n) {
  const result = []
  for (var i = 0; i < n; i++) {
    result[i] = i
  }
  for (let i = 0; i < n; i++) {
    const rand = i + Math.floor((n - i - 1) * Math.random())
    swap(result, i, rand)
  }
  return result
}

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

console.log(getArray(10))

function find(s) {
  let i = 0
  let j = 0
  let n = s.length
  let max = 0
  const set = new Set()
  while (i < n) {
    const ch = s[i]
    while (set.has(ch)) {
      set.delete(s[j++])
    }
    set.add(ch)
    i++
    max = Math.max(max, i - j)
  }
  return max
}

console.log(find('abcabcab'))
console.log(find('bb'))

async function async1() {
  console.log('2')
  await async2()
  console.log('7')
}
async function async2() {
  console.log('3')
  return new Promise(function (resolve, reject) {
    resolve()
    console.log('4')
  })
}

setTimeout(() => {
  console.log('10')
})

console.log('1')

async1()

new Promise(function (resolve, reject) {
  console.log('5')
  resolve()
})
  .then(function () {
    console.log('8')
  })
  .then(function () {
    console.log('9')
  })

console.log('6')
