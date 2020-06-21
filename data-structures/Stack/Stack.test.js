/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 16:47:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-20 18:31:25
 * @FilePath: /js-demo/data-structures/Stack/Stack.test.js
 */ 
const { Stack } = require('./Stack');
const { expect } = require('chai');

describe('栈', function() {
    it('检查空栈', () => {
        const stack = new Stack();
        expect(stack).to.not.null;
        expect(stack.linkList).to.not.null;
    });

    it('入栈简单类型操作', () => {
        const stack = new Stack();
        stack.push(1);
        stack.push('2');
        stack.push(false);
        stack.push(true);
        stack.push(0.1);
        expect(stack.toString()).to.equal('0.1,true,false,2,1');
        expect(stack.toArray()).to.eql([0.1, true, false, '2', 1]);
    });

    it('获取栈顶操作', () => {
        const stack = new Stack();
        expect(stack.peek()).to.be.null;
        stack.push(1);
        stack.push(2);
        expect(stack.peek()).to.equal(2);
        expect(stack.peek()).to.equal(2);
    });

    it('检查栈是否为空', () => {
        const stack = new Stack();
        expect(stack.isEmpty()).to.equal(true);
        stack.push(1);
        expect(stack.isEmpty()).to.equal(false);
    });

    it('检查清空方法', () => {
        const stack = new Stack();
        expect(stack.isEmpty()).to.equal(true);
        stack.push(1);
        stack.clear();
        expect(stack.isEmpty()).to.equal(true);
    });

    it('出栈操作', () => {
        const stack = new Stack();
        expect(stack.length).to.equal(0)
        stack.push(1);
        stack.push(2);
        expect(stack.length).to.equal(2)
        expect(stack.pop()).to.equal(2);
        expect(stack.pop()).to.equal(1);
        expect(stack.pop()).to.be.null;
        expect(stack.isEmpty()).to.equal(true);
    });

    it('入栈复杂类型', () => {
        const stack = new Stack();
    
        stack.push({ value: 'test1', key: 'key1' });
        stack.push({ value: 'test2', key: 'key2' });
    
        const stringifier = value => `${value.key}:${value.value}`;
    
        expect(stack.toString(stringifier)).to.equal('key2:test2,key1:test1');
        expect(stack.pop().value).to.equal('test2');
        expect(stack.pop().value).to.equal('test1');
    })

    it('输出数组', () => {
        const stack = new Stack();
    
        stack.push(1);
        stack.push(2);
        stack.push(3);
    
        expect(stack.toArray()).to.eql([3, 2, 1]);
    });
});