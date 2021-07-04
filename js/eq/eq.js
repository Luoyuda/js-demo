/*
 * @Author: xiaohuolong
 * @Date: 2021-06-01 15:32:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-04 19:59:49
 * @FilePath: /js-demo/js/eq/eq.js
 */
function eq1(a, b, aStack, bStack) {
    // -0 跟 +0
    if(a === b) return a !== 0 || 1 / a === 1 / b
    // 过滤 null
    if(a == null || b == null) return false
    // 过滤 NaN
    if(a !== a) return b !== b
    // 基本类型可以不可能相等了，直接返回false
    var type = typeof a
    if(type !== 'function' && type !== 'object' && typeof b !== 'object') return false

    return deepEqual(a, b, aStack, bStack)
}

function deepEqual(a, b, aStack, bStack) {
    var type = Object.prototype.toString.call(a)
    if(type !== Object.prototype.toString.call(b)) return false
    switch(type) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b
        case '[object Number]':
            if(+a !== +a) return +b !== +b
            return +a === +b && (1 / a === 1 / b)
        case '[object Boolean]':
        case '[object Date]':
            return +a === +b
        case '[object Symbol]':
            return Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b)
        default:
    }
    var isArrays = type === '[object Array]'
    if(!isArrays){
        // 过滤函数
        if(typeof a !== 'object' && typeof b !== 'object') return false
        var aCtor = a.constructor
        var bCtor = b.constructor
        if(aCtor !== bCtor && 
            !(typeof aCtor === 'function' && aCtor instanceof aCtor && 
            typeof bCtor === 'function' && bCtor instanceof bCtor) && 
            ('constructor' in a && 'constructor' in b)
        ) {
            return false
        }
    }
    aStack = aStack || []
    bStack = bStack || []
    // 处理循环引用
    var length = aStack.length
    while (length--){
        if(aStack[length] === a){
            return bStack[length] === b
        }
    }
    aStack.push(a)
    bStack.push(b)
    if(isArrays){
        length = a.length
        if(length !== b.length) return false
        while(length--){
            if(!eq(a[length], b[length], aStack, bStack)) return false
        }
    }else{
        let keys = Object.keys(a)
        length = keys.length
        if(length !== Object.keys(b).length) return false
        while(length--){
            if(!eq(a[keys[length]], b[keys[length]], aStack, bStack)) return false
        }
    }
    aStack.pop()
    bStack.pop()
    return true
}

function eq(a, b, aStack, bStack){
    if(a === b) return a !== 0 || 1 / a === 1 / b
    if(a === null || b === null) return false
    if(a !== a) return b !== b
    var type = typeof a
    if(type !== 'object' && type !== 'function' && typeof b !== 'object') return false
    return deepEq(a, b, aStack, bStack)
}

function deepEq(a, b, aStack, bStack){
    var type = Object.prototype.toString.call(a)
    if(type !== Object.prototype.toString.call(b)) return false
    switch (type) {
        case '[object Number]':
            if(+a !== +a) return +b !== +b
            return +a === +b && 1 / a === 1 / b
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b
        case '[object String]':
        case '[object RexExp]':
            return '' + a === '' + b
        case '[object Symbol]':
            return Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b)
        default:
            break;
    }
    var areArray = type === '[object Array]'
    if(!areArray){
        if(typeof a !== 'object' && typeof b !== 'object') return false
        var aCtor = a.constructor
        var bCtor = b.constructor
        if(
            aCtor !== bCtor
            && !(typeof aCtor === 'function' && typeof bCtor === 'function' && aCtor instanceof aCtor && bCtor instanceof bCtor)
            && ('constructor' in a && 'constructor' in b)
        ) return false
    }
    aStack = aStack || []
    bStack = bStack || []
    var length = aStack.length
    while(length--) if(aStack[length] === a) return bStack[length] === b
    aStack.push(a)
    bStack.push(b)
    if(areArray){
        length = a.length
        if(length !== b.length) return false
        while(length--) if(!eq(a[length], b[length], aStack, bStack)) return false
    }else{
        var keys = Object.keys(a)
        length = keys.length
        if(length !== Object.keys(b).length) return false
        while(length--) if(!eq(a[keys[length]], b[keys[length]], aStack, bStack)) return false
    }
    aStack.pop()
    bStack.pop()
    return true
}

module.exports = {
    eq
}