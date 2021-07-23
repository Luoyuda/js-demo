/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 22:37:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 22:51:19
 * @FilePath: /DesignPatterns/Memento.js
 */
const Data = (function () {
    const _cache = {}
    return {
        getData(type, callback=()=>{}){
            if(_cache[type]) return callback(_cache[type])
            const timer = setTimeout(() => {
                const data = Math.random() * 10
                _cache[type] = data
                callback(data)
            }, 1000 * Math.random())
        }
    }
})()

Data.getData('test',(data)=> {
    console.log(data)
    Data.getData('test',console.log)
})