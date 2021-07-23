/*
 * @Author: xiaohuolong
 * @Date: 2020-08-15 15:20:09
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-15 15:53:11
 * @FilePath: /DesignPatterns/Singleton.js
 */
const LazySingle = (function (){
    // 用于缓存对象
    let _instance = null
    function _Single(){
        // 静态变量
        const STATIC_COUNT = 2
        // 单例对象
        return {
            getStaticCount: function (){
                return `静态变量 STATIC_COUNT = ${STATIC_COUNT}`
            },
            publicCount: 3,
            getPublicCount: function (){
                return `公共变量 publicCount = ${this.publicCount}`
            },
        }
    }
    return function (){
        // 惰性返回
        if(!_instance){
            _instance = _Single()
        }
        return _instance
    }
})()

const s1 = LazySingle()
const s2 = LazySingle()
console.log(s1 === s2)
console.log(s1.getPublicCount())
console.log(s1.publicCount = 2)
console.log(s2.getPublicCount())
console.log(s1.getStaticCount())