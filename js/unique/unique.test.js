/*
 * @Author: xiaohuolong
 * @Date: 2021-06-01 10:48:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-01 14:30:51
 * @FilePath: /js-demo/js/unique/unique.test.js
 */
const { unique } = require('./unique.js')
describe('unique', function() {
    var array = [
        1, 1, 2,
        '1', '1', '2',
        null, null,
        undefined, undefined,
        new String('1'), new String('1'), new String('2'), 
        /a/, /a/, /b/,
        NaN, NaN,
        { a: 1}, { a: 1 }, { b: 1 },
    ];
    test('', () => {
        var res = unique(array)
        expect(res).toEqual([
            1, 2,
            '1', '2', 
            null, 
            undefined, 
            new String('1'), new String('2'),
            /a/, /b/,
            NaN,
            { a: 1 },
            { b: 1 }
        ])
    })
    test('sort', () => {
        var res = unique(array, true)
        expect(res).toEqual([
            1, 2,
            '1', '2', 
            null, 
            undefined, 
            new String('1'), 
            new String('1'), new String('2'),
            /a/, /a/, /b/,
            NaN,
            NaN,
            { a: 1 }, { a: 1 }, { b: 1 }
        ])
    })
    test('iteratee', () => {
        var res = unique(array, function(value, i, array) {
            try {
                value = value instanceof RegExp ? value.toString() : value
            } catch (error) {}
            var key = (typeof value) + JSON.stringify(value)
            if(this[key]) return false
            this[key] = true
            return true
        }, {})
        expect(res).toEqual([
            1, 2,
            '1', '2', 
            null, 
            undefined, 
            new String('1'), new String('2'),
            /a/, /b/,
            NaN,
            { a: 1 }, { b: 1 }
        ])
    })
    test('iteratee', () => {
        var arr = ['a', 'A', 'b', 1, 2]
        var res = unique(arr, function(item, i, array) {
            item = typeof item == 'string' ? item.toLowerCase() : item
            return !(array.indexOf(item) !== i)
        })
        expect(res).toEqual(['a', 'b', 1, 2])
    })
    test('input number sort', () => {
        var arr = [1, 1, 2, 2, 3, 3, 4, 4]
        var res = unique(arr, true)
        expect(res).toEqual([1,2,3,4])
    })
    test('input number', () => {
        var arr = [1, 1, 2, 2, 3, 3, 4, 4]
        var res = unique(arr)
        expect(res).toEqual([1,2,3,4])
    })
    test('input string', () => {
        var arr = ['1', '1', '2', '2', '3', '3', '4', '4']
        var res = unique(arr)
        expect(res).toEqual(['1','2','3','4'])
    })
    test('input object', () => {
        var arr = [{a:1}, {b:2}, {c:1}, {a:1}, {b:2}, {c:1}]
        var res = unique(arr)
        expect(res).toEqual([{a:1}, {b:2}, {c:1}])
    })
    test('input array', () => {
        var arr = [[{a:1}, {b:2}, {c:1}], [{a:1}, {b:2}, {c:1}]]
        var res = unique(arr)
        expect(res).toEqual([[{a:1}, {b:2}, {c:1}]])
    })
})
