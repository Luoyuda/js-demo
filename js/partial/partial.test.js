/*
 * @Author: xiaohuolong
 * @Date: 2021-06-03 17:51:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-06-03 20:54:47
 * @FilePath: /js-demo/js/partial/partial.test.js
 */
const { partial, _ } = require('./partial.js')
describe('partial', function() {
    test('', () => {
        var obj = {name: 'moe'};
        var func = function() { return this.name + ' ' + Array.prototype.slice.call(arguments).join(' '); };

        obj.func = partial(func, 'a', 'b');
        expect(obj.func('c', 'd')).toEqual('moe a b c d')

        obj.func = partial(func, _, 'b', _, 'd');
        expect(obj.func('a', 'c')).toEqual('moe a b c d')

        func = partial(function() { return arguments.length; }, _, 'b', _, 'd');
        expect(func('a', 'c', 'e')).toEqual(5)
        expect(func('a')).toEqual(4)

        func = partial(function() { return typeof arguments[2]; }, _, 'b', _, 'd');
        expect(func('a')).toEqual("undefined")

        // passes context
        function MyWidget(name, options) {
            this.name = name;
            this.options = options;
        }
        MyWidget.prototype.get = function() {
            return this.name;
        };
        var MyWidgetWithCoolOpts = partial(MyWidget, _, {a: 1});
        var widget = new MyWidgetWithCoolOpts('foo');
        expect(widget instanceof MyWidget).toEqual(true)
        expect(widget.get()).toEqual('foo')
        expect(widget.options).toEqual({a: 1})
    })
})
