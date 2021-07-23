/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 21:56:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 22:07:17
 * @FilePath: /DesignPatterns/Visitor.js
 */
const ArrayVisitor = (function(){
    return {
        splice(){
            var args = Array.prototype.splice.call(arguments, 1)
            return Array.prototype.splice.apply(arguments[0], args)
        }
    }
})()

console.log(ArrayVisitor.splice({'0':1, '1': '2', '2': '3', length: '3'},1))
console.log(ArrayVisitor.splice([1,2,3],1))