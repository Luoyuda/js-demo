async function async1() {
  console.log('2')
  await async2()
  console.log('9')
}
async function async2() {
  console.log('3')
}
console.log('1')
setTimeout(function () {
  console.log('10')
}, 0)
setTimeout(function () {
  console.log('12')
}, 10)
setImmediate(() => console.log('11'))
process.nextTick(() => console.log('7'))
async1()
new Promise(function (resolve) {
  console.log('4')
  resolve()
  console.log('5')
}).then(function () {
  console.log('8')
})
console.log('6')

setTimeout(() => {
  console.log('timer 1')
  Promise.resolve().then(() => {
    console.log('then 1')
  })
  setTimeout(() => {
    console.log('timer 3')
    Promise.resolve().then(() => {
      console.log('then 3')
    })
  })
})
setTimeout(() => {
  console.log('timer 2')
  Promise.resolve().then(() => {
    console.log('then 2')
  })
  setTimeout(() => {
    console.log('timer 4')
    Promise.resolve().then(() => {
      console.log('then 4')
    })
  })
})
