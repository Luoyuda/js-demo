/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 21:38:00
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 21:47:21
 * @FilePath: /js-demo/refactoring/12.7.js
 */
(() => {
    class Person{
        constructor(name){
            this.name = name
        }
        get genderCode(){ return 'X' }
    }
    class Male extends Person{
        get genderCode(){ return 'X' }
    }
    class Female extends Person{
        get genderCode(){ return 'F' }
    }
    function isMale(aPerson){ return aPerson instanceof Male}
})();
(() => {
    class Person{
        constructor(name, genderCode){
            this.name = name
            this.genderCode = genderCode || 'X'
        }
        get isMale(){ return this.genderCode === 'X' }
    }
})();