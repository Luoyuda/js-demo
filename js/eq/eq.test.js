/*
 * @Author: xiaohuolong
 * @Date: 2021-06-01 10:48:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-01 17:54:20
 * @FilePath: /js-demo/js/eq/eq.test.js
 */
const { eq } = require('./eq.js')
describe('eq', function() {
    test('', () => {
        var tests = [
            [[0, -0], false],
            [[0, 0], true],
            [[1, 1], true],
            [[1, 2], false],
            [[-1, -1], true],
            [[1, -1], false],
            [[1, null], false],
            [[null, -1], false],
            [[null, null], true],
            [[NaN, null], false],
            [[NaN, NaN], true],
            [[NaN, 1], false],
            [[1, NaN], false],
            [[true, false], false],
            [[true, true], true],
            [['', ''], true],
            [['1', ''], false],
            [['', '11'], false],
            [['', true], false],
            [[1, true], false],
        ]
        tests.forEach(([args, res]) => {
            expect(eq(...args)).toEqual(res)
        })
    })
    test('object', () => {
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
        var h = function(){}
        var j = function(){}
        var tests2 = [
            [[new String('a'), new String('a')], true],
            [[new String('b'), new String('a')], false],
            [[new Number(1), new Number(2)], false],
            [[new Number(0), new Number(-0)], false],
            [[new Number(-1), new Number(-1)], true],
            [[new Number(1), new Number(1)], true],
            [[new Number('abc'), new Number('a')], true],
            [[new Number('abc'), new Number(1)], false],
            [[new Boolean(true), new Boolean(true)], true],
            [[new Boolean(false), new Boolean(true)], false],
            [[new Number(false), new Number(false)], true],
            [[new Date(), new Date()], true],
            [[new Date(), new Date(1)], false],
            [[Symbol(1), Symbol(1)], false],
            [[Symbol('1'), Symbol('1')], false],
            [[Symbol('1'), Symbol(1)], false],
            [[function(){}, function(){}], false],
            [[a, b], true],
            [[a, c], false],
            [[a, d], false],
            [[{}, []], false],
            [[() => {}, []], false],
            [[{}, {}], true],
            [[{a: 1}, {a: 1}], true],
            [[{a: 2}, {a: 1}], false],
            [[{a: 1, b: {c : 1, d: 2}}, {a: 1, b: {c : 1, d: 2, }}], true],
            [[[{a: 1, b: {c : 1, d: 2}}], [{a: 1, b: {c : 1, d: 2, }}]], true],
            [[{a: 1, b: {c : 1, d: 2}}, {a: 1, b: {c : 1, d: 2, e:1 }}], false],
            [[e, f], true],
            [[e, g], true],
            [[() => {}, () => {}], false],
            [[h, h], true],
            [[j, j], true],
        ]
        tests2.forEach(([args, res]) => {
            expect(eq(...args)).toEqual(res)
        })
    })
})
