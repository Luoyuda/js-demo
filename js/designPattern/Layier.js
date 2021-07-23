/*
 * @Author: xiaohuolong
 * @Date: 2020-08-17 22:59:01
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-17 23:15:46
 * @FilePath: /DesignPatterns/Layier.js
 */
let random = Math.random()
let getData = function(){
    if(random < 0.3){
        console.log('check')
        getData = function(){
            console.log('prod')
            return 1
        }
    }else if(random < 0.6){
        console.log('check')
        getData = function(){
            console.log('dev')
            return 1
        }
    }else{
        console.log('check')
        getData = function(){
            console.log('local')
            return 1
        }
    }
    return getData()
}
console.log(getData())
console.log(getData())
console.log(getData())
console.log(getData())