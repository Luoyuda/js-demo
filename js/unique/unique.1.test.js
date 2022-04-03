const { unique } = require('./unique.1.js')
describe('unique', function() {
  var genArray = (len, cb) => new Array(len).fill(0).map(cb)
  var genNumbers = (gap, len = 20) => genArray(len, (el, i) => i % gap)
  var genStrings = (gap, len = 20) => genArray(len, (el, i) => (i % gap) + '')
  var genBooleans = (gap, len = 4) => genArray(len, (el, i) => (i % gap) === 1)
  var genUndefined = (len = 4) => genArray(len, () => void 0)
  var genNull = (len = 4) => genArray(len, () => null)
  var genNaN = (len = 4) => new Array(len).fill(NaN)
  var tests = [
    {
      message: 'numbers',
      input: genNumbers(5)
    },
    {
      message: 'strings',
      input: genStrings(10)
    },
    {
      message: 'booleans',
      input: genBooleans(2)
    },
    {
      message: 'undefined',
      input: genUndefined()
    },
    {
      message: 'null',
      input: genNull()
    },
    {
      message: 'NaN',
      input: genNaN()
    },
    {
      message: 'complex',
      input: [
        ...genNumbers(5),
        ...genStrings(5),
        ...genBooleans(2),
        ...genUndefined(),
        ...genNull(),
        ...genNaN()
      ]
    }
  ]
  tests.forEach(({message, input}) => {
    test(message, () => {
      expect(unique(input)).toEqual([...new Set(input)])
    })
  })
})
