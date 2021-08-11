/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 22:17:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 22:18:27
 * @FilePath: /js-demo/refactoring/11.7.js
 */
(() => {
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
        set name(arg){ return this._name = arg }
    }
})();
(() => {
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
    }
})();