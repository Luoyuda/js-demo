/*
 * @Author: xiaohuolong
 * @Date: 2021-05-31 15:42:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-31 16:29:34
 * @FilePath: /js-demo/js/debounce/debounce.test.js
 */
const { debounce } = require('./debounce.js')
const { expect } = require('chai')
describe('debounce', function() {
    test('', (done) => {
        var counter = 0;
        var incr = function(){ counter++; };
        var debouncedIncr = debounce(incr, 32);
        debouncedIncr(); debouncedIncr();
        setTimeout(debouncedIncr, 16);
        setTimeout(function(){
            expect(counter).equal(1)
            done(); 
        }, 96);
    })
    test('debounce cancel', (done) => {
        var counter = 0;
        var incr = function(){ counter++; };
        var debouncedIncr = debounce(incr, 32);
        debouncedIncr();
        debouncedIncr.cancel();
        setTimeout(function(){
            expect(counter).equal(0)
            done(); 
        }, 96);
    })
    test('debounce cancel', (done) => {
        var counter = 0;
        var incr = function(){ counter++; };
        var debouncedIncr = debounce(incr, 32);
        debouncedIncr();
        debouncedIncr.cancel();
        setTimeout(function(){
            expect(counter).equal(0)
            done(); 
        }, 96);
    })
    test('debounce asap', (done) => {
        var counter = 0;
        var incr = function(){ return ++counter; };
        var a, b, c
        var debouncedIncr = debounce(incr, 64, true);
        a = debouncedIncr();
        b = debouncedIncr();
        expect(a).equal(1)
        expect(b).equal(1)
        setTimeout(debouncedIncr, 16);
        setTimeout(debouncedIncr, 32);
        setTimeout(debouncedIncr, 48);
        setTimeout(function(){
            expect(counter).equal(1)
            c = debouncedIncr()
            expect(c).equal(2)
            expect(counter).equal(2)
            done(); 
        }, 128);
    })
    test('debounce asap cancel', (done) => {
        var counter = 0;
        var incr = function(){ return ++counter; };
        var a, b
        var debouncedIncr = debounce(incr, 64, true);
        a = debouncedIncr();
        debouncedIncr.cancel()
        b = debouncedIncr();
        expect(a).equal(1)
        expect(b).equal(2)
        setTimeout(debouncedIncr, 16);
        setTimeout(debouncedIncr, 32);
        setTimeout(debouncedIncr, 48);
        setTimeout(function(){
            expect(counter).equal(2)
            done(); 
        }, 128);
    })
    test('debounce asap recursively', (done) => {
        var counter = 0;
        var debouncedIncr = debounce(function(){
            counter++;
            if(counter < 10) debouncedIncr()
        }, 64, true);
        debouncedIncr();
        expect(counter).equal(1)
        setTimeout(function(){
            expect(counter).equal(1)
            done(); 
        }, 96);
    })
    test('debounce asap recursively', (done) => {
        var counter = 0;
        var debouncedIncr = debounce(function(){
            counter++;
            if(counter < 10) debouncedIncr()
        }, 64, true);
        debouncedIncr();
        expect(counter).equal(1)
        setTimeout(function(){
            expect(counter).equal(1)
            done(); 
        }, 96);
    })
    test('debounce re-entrant', (done) => {
        var sequence = [
            ['b1', 'b2']
        ];
        var value = '';
        var debouncedAppend;
        var append = function(arg){
            value += this + arg;
            var args = sequence.pop();
            if (args) {
                debouncedAppend.call(args[0], args[1]);
            }
        };
        debouncedAppend = debounce(append, 32);
        debouncedAppend.call('a1', 'a2');
        expect(value).equal('')
        setTimeout(function(){
            expect(value).equal('a1a2b1b2')
            done();
        }, 100);
    })
})
