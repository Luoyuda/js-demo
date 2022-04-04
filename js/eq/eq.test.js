const { eq } = require('./eq.js')
const runTests = (tests, message) => {
  describe(message, function() {
    tests.forEach(([args, res], i) => {
      let argMsg = ''
      try {
        argMsg = args.toString()
      } catch (error) {
        
      }
      test(`${i}-${argMsg}`, () => {
        expect(eq(...args)).toEqual(res)
      });
    })
  })
}
const Tests = [
  {
    tests: [
      [[0, 0], true],
      [[0, -0], false],
      [[1, 1], true],
      [[-1, 1], false],
      [[-1, -1], true],
      [[1, new Number(1)], true],
      [[-1, new Number(-1)], true],
      [[NaN, NaN], true],
      [[NaN, 1], false],
      [['1', 1], false],
      [[true, 1], false],
      [[false, 1], false],
      [[null, 1], false],
      [[{}, 1], false],
      [[[], 1], false],
      [[function(){}, 1], false],
      [[undefined, 1], false],
      [[new String(1), 1], false],
      [[new Boolean(1), 1], false],
      [[new String('1'), 1], false],
      [[new Boolean(true), 1], false],
    ],
    message: 'number'
  },
  {
    tests: [
      [['', ''], true],
      [['1', ''], false],
      [['1', '1'], true],
      [[true, ''], false],
      [[false, ''], false],
      [[-1, '-1'], false],
      [[1, '1'], false],
      [[NaN, 'NaN'], false],
      [[new String('NaN'), 'NaN'], true],
      [[{}, ''], false],
      [[[], ''], false],
      [[function(){}, ''], false],
      [[null, ''], false],
      [[undefined, ''], false],
      [[new Boolean('1'), '1'], false],
      [[new Boolean(true), '1'], false],
    ],
    message: 'string'
  },
  {
    tests: [
      [[/a/, /a/], true],
      [[/a/ig, /a/], false],
      [[/a/, new RegExp('a')], true],
      [[/a/i, new RegExp('a', 'i')], true],
      [[/a/ig, new RegExp('a', 'ig')], true],
    ],
    message: 'RegExp'
  },
  {
    tests: [
      [[new Boolean(true), new Boolean(true)], true],
      [[new Boolean(false), new Boolean(true)], false],
      [[true, true], true],
      [[true, false], false],
      [[true, new Boolean(true)], true],
      [[false, new Boolean(false)], true],
      [[true, new Boolean(false)], false],
      [[undefined, new Boolean(false)], false],
      [[null, new Boolean(false)], false],
      [[[], new Boolean(false)], false],
      [[{}, new Boolean(false)], false],
      [[function(){}, new Boolean(false)], false],
      [[new String('false'), new Boolean(false)], false],
      [[new Number('false'), new Boolean(false)], false],
    ],
    message: 'boolean'
  },
  {
    tests: [
      [[undefined, null], false],
      [[undefined, undefined], true],
      [[null, null], true],
      [[new Boolean(null), null], false],
      [[new String(null), null], false],
      [[new Number(null), null], false],
      [[new Boolean(undefined), undefined], false],
      [[new String(undefined), undefined], false],
      [[new Number(undefined), undefined], false],
      [[[], undefined], false],
      [[{}, undefined], false],
      [[function(){}, undefined], false],
      [[0, undefined], false],
      [['', undefined], false],
      [['0', undefined], false],
      [[0, null], false],
      [['', null], false],
      [['0', null], false],
      [[NaN, null], false],
      [[NaN, undefined], false],
    ],
    message: 'undefined null'
  },
  {
    tests: (function() {
      var s1 = Symbol.for(1)
      var s2 = Symbol.for(1);
      return [
        [[Symbol(1), Symbol(1)], false],
        [[Symbol('1'), Symbol('1')], false],
        [[Symbol('1'), Symbol(1)], false],
        [[s1, s2], true],
      ]
    })(),
    message: 'Symbol'
  },
  {
    tests: (function() {
      var f1 = function(){}
      var f2 = () => {};
      return [
        [[f1, function(){}], false],
        [[f2, () => {}], false],
        [[f1, f1], true],
        [[f2, f2], true],
        [[f2, f1], false],
      ]
    })(),
    message: 'function'
  },
  {
    tests: [
      [[new Date(), new Date()], true],
      [[new Date(), new Date(1)], false],
    ],
    message: 'date'
  },
  {
    tests: (function() {
      function A(a){
        this.a = a
      }
      function B(a){
        this.a = a
      }
      var a = new A(1)
      var b = new A(1)
      var d = new A(2)
      var c = new B(2)
      var e = {
        a: 1,
        e
      }
      var f = {
        a: 1,
        f
      }
      var g = {
        a: 1,
        f
      }
      return [
        [[a, b], true],
        [[a, c], false],
        [[a, d], false],
        [[{}, []], false],
        [[{}, {}], true],
        [[{a: 1}, {a: 1}], true],
        [[{a: 2}, {a: 1}], false],
        [[{a: 1, b: {c : 1, d: 2}}, {a: 1, b: {c : 1, d: 2, }}], true],
        [[[{a: 1, b: {c : 1, d: 2}}], [{a: 1, b: {c : 1, d: 2, }}]], true],
        [[{a: 1, b: {c : 1, d: 2}}, {a: 1, b: {c : 1, d: 2, e:1 }}], false],
        [[e, f], true],
        [[e, g], true],
        [[[1,2,3], [1,2,3]], true],
      ]
    })(),
    message: 'object'
  }
]

Tests.forEach(({tests, message}) => runTests(tests, message))
