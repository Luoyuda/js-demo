const { clone } = require('./clone.js')
const runTests = (tests, message) => {
  describe(message, function() {
    tests.forEach(([args, res], i) => {
      test(`${i}`, () => {
        expect(clone(args)).toEqual(args)
      });
    })
  })
}
const Tests = [
  {
    tests: [
      [
        (function () {
          var a = { 
            a: 1, 
            b: '1', 
            c: true, 
            d: false, 
            e: null, 
            f: undefined, 
            g: function(){},
            h: Symbol('b'),
            i: [
              1, '1', true, false, null, undefined, function(){}, 
              { 
                a: 1, 
                b: '1', 
                c: true, 
                d: false, 
                e: null, 
                f: undefined, 
                g: function(){},
                h: Symbol('b'),
              },
              [1, '1', true, false, null, undefined, function(){}]
            ],
            j: { 
              a: 1, 
              b: '1', 
              c: true, 
              d: false, 
              e: null, 
              f: undefined, 
              g: function(){},
              h: Symbol('b'),
              i: [
                1, '1', true, false, null, undefined, function(){}, 
                { 
                  a: 1, 
                  b: '1', 
                  c: true, 
                  d: false, 
                  e: null, 
                  f: undefined, 
                  g: function(){},
                  h: Symbol('b'),
                }
              ]
            },
          }
          return {
            ...a,
            a
          }
        })()
      ],
    ],
    message: 'clone'
  }
]

Tests.forEach(({tests, message}) => runTests(tests, message))
