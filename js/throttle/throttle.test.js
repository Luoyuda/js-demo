/*
 * @Author: xiaohuolong
 * @Date: 2021-05-31 11:48:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-31 17:58:47
 * @FilePath: /js-demo/js/throttle/throttle.test.js
 */
const { throttle } = require('./throttle.js')
const { expect } = require('chai')

describe('throttle', function() {
    test('', (done) => {
        var counter = 0
        var incr = function(){ counter++; };
        var t = throttle(incr, 32)
        t()
        t()
        expect(counter).equal(1)
        setTimeout(() => {
            expect(counter).equal(2)
            done()
        }, 64)
    })
    test('throttle arguments', (done) => {
        var value = 0
        var update = function(val){ value = val; };
        var t = throttle(update, 32)
        t(1)
        t(2)
        setTimeout(() => {
            t(3)
        }, 64)
        setTimeout(() => {
            expect(value).equal(3)
            done()
        }, 96)
        expect(value).equal(1)
    })
    test('throttle once', (done) => {
        var counter = 0
        var update = function(){ return ++counter };
        var t = throttle(update, 32)
        var result = t()
        setTimeout(() => {
            expect(result).equal(1)
            expect(counter).equal(1)
            done()
        }, 64)
    })
    test('throttle twice', (done) => {
        var counter = 0
        var incr = function(){ return ++counter };
        var t = throttle(incr, 32)
        t()
        t()
        setTimeout(() => {
            expect(counter).equal(2)
            done()
        }, 64)
    })
    test('more throttling', (done) => {
        var counter = 0
        var incr = function(){ return ++counter };
        var t = throttle(incr, 32)
        t()
        t()
        expect(counter).equal(1)
        setTimeout(() => {
            expect(counter).equal(2)
            t()
            expect(counter).equal(3)
            done()
        }, 64)
    })
    test('throttle repeatedly with results', (done) => {
        var counter = 0
        var results = []
        var incr = function(){ return ++counter };
        var t = throttle(incr, 100)
        var saveResult = function(){ return results.push(t()); };
        saveResult()
        saveResult()
        setTimeout(saveResult, 50)
        setTimeout(saveResult, 150)
        setTimeout(saveResult, 160)
        setTimeout(saveResult, 230)
        setTimeout(() => {
            expect(results.join(',')).equal('1,1,1,2,2,3')
            done()
        }, 300)
    })
    test('throttle triggers trailing call when invoked repeatedly', (done) => {
        var counter = 0
        var limit = 48;
        var incr = function(){ return ++counter };
        var t = throttle(incr, 32)
        var stamp = new Date;
        while (new Date - stamp < limit) {
            t();
        }
        var lastCount = counter;
        expect(counter).greaterThan(1)
        setTimeout(() => {
            expect(counter).greaterThan(lastCount)
            done()
        }, 96)
    })
    test('throttle does not trigger leading call when leading is set to false', (done) => {
        var counter = 0
        var incr = function(){ return ++counter };
        var t = throttle(incr, 60, {leading: false})
        t();
        t()
        expect(counter).equal(0)
        setTimeout(() => {
            expect(counter).equal(1)
            done()
        }, 96)
    })
    test('more throttle does not trigger leading call when leading is set to false', (done) => {
        var counter = 0
        var incr = function(){ return ++counter };
        var t = throttle(incr, 100, {leading: false})
        t()
        setTimeout(t, 50)
        setTimeout(t, 60)
        setTimeout(t, 200)
        expect(counter).equal(0)
        setTimeout(() => {
            expect(counter).equal(1)
            done()
        }, 250)
        setTimeout(() => {
            expect(counter).equal(2)
            done()
        }, 350)
    })
    test('one more throttle with leading: false test', (done) => {
        var counter = 0
        var incr = function(){ return ++counter };
        var t = throttle(incr, 100, {leading: false})
        var time = new Date;
        while (new Date - time < 350){
            t()
        }
        expect(counter <= 3).equal(true)

        setTimeout(function() {
            expect(counter <= 4).equal(true)
            done();
        }, 200);
    })
    test('throttle does not trigger trailing call when trailing is set to false', (done) => {
        var counter = 0
        var incr = function(){ return ++counter };
        var t = throttle(incr, 60, {trailing: false})
        t()
        t()
        t()
        expect(counter).equal(1)

        setTimeout(function() {
            expect(counter).equal(1)
            t()
            t()
            t()
            expect(counter).equal(2)
            setTimeout(function() {
                expect(counter).equal(2)
                done();
            }, 96);
        }, 96);
    })
    test('throttle re-entrant', (done) => {
        var sequence = [
            ['b1', 'b2'],
            ['c1', 'c2']
        ];
        var value = '';
        var throttledAppend;
        var append = function(arg){
            value += this + arg;
            var args = sequence.pop();
            if (args) {
                throttledAppend.call(args[0], args[1]);
            }
        };
        throttledAppend = throttle(append, 32);
        throttledAppend.call('a1', 'a2');
        expect(value).equal('a1a2')
        setTimeout(function(){
            expect(value).equal('a1a2c1c2b1b2')
            done();
        }, 100);
    })
    test('throttle cancel', (done) => {
        var counter = 0
        var incr = function(){ return ++counter };
        var t = throttle(incr, 32)
        t()
        expect(counter).equal(1)
        t.cancel()
        t()
        t()
        expect(counter).equal(2)
        setTimeout(function(){
            expect(counter).equal(3)
            done();
        }, 64);
    })

    test('throttle cancel', (done) => {
        var counter = 0
        var incr = function(){ return ++counter };
        var t = throttle(incr, 32, {leading: false})
        t()
        t.cancel()
        expect(counter).equal(0)
        t()
        expect(counter).equal(0)
        setTimeout(function(){
            expect(counter).equal(1)
            done();
        }, 64);
    })
})