/*
 * @Author: xiaohuolong
 * @Date: 2020-08-15 15:53:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-15 16:11:33
 * @FilePath: /DesignPatterns/Facade.js
 */
const Facade = function () {
    // 模拟一个存在差异性的对象
    const obj = {
        value: Math.random() * 2 > 1 ? 0 : 1,
        otherValue: Math.random() * 2 > 1 ? 0 : 1
    }
    return {
        getValue: function(){
            return obj.value || obj.otherValue
        },
        getObj: function(){
            return obj
        }
    }
}

const f1 = Facade()
console.log(f1.getObj())
console.log(f1.getValue())