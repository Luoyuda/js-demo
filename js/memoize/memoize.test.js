/*
 * @Author: xiaohuolong
 * @Date: 2021-06-03 20:54:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-03 21:10:07
 * @FilePath: /js-demo/js/memoize/memoize.test.js
 */
const { memoize } = require('./memoize.js')
describe('memoize', function() {
    test('', () => {
        var fib = function(n) {
            return n < 2 ? n : fib(n - 1) + fib(n - 2);
        };
        expect(fib(10)).toEqual(55)
        fib = memoize(fib); // Redefine `fib` for memoization
        expect(fib(10)).toEqual(55)
        expect(fib(10)).toEqual(55)
        var o = function(str) {
            return str;
        };
        var fastO = memoize(o);
        expect(o('toString')).toEqual('toString')
        expect(fastO('toString')).toEqual('toString')
        expect(fastO('toString')).toEqual('toString')
        var upper = memoize(function(s) {
            return s.toUpperCase();
        });
        expect(upper('foo')).toEqual('FOO')
        expect(upper('bar')).toEqual('BAR')
        expect(upper.cache).toEqual({foo: 'FOO', bar: 'BAR'})
        var hashed = memoize(function(key) {
            expect(/[a-z]+/.test(key)).toEqual(true)
            return key;
        }, function(key) {
            return key.toUpperCase();
        });
        hashed('yep');
        expect(hashed.cache).toEqual({YEP: 'yep'})
        var objCacher = memoize(function(value, key) {
            return {key: key, value: value};
        }, function(value, key) {
            return key;
        });
        var myObj = objCacher('a', 'alpha');
        var myObjAlias = objCacher('b', 'alpha');
        expect(myObj).toEqual(myObjAlias)
        expect(myObj.value).toEqual('a')
    })
})