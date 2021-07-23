/*
 * @Author: xiaohuolong
 * @Date: 2020-08-17 21:21:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-17 21:26:39
 * @FilePath: /DesignPatterns/Entrust.js
 */
const Deal = {
    A(){
        console.log('A')
    },
    B(){
        console.log('B')
    },
    C(){
        console.log('C')
    }
}
var data = []
for (let index = 0; index < 10; index++) {
    let random = Math.random() * 10
    data.push(random < 3 ? 'A' : random < 6 ? 'B' : 'C')
}
console.log(data)
data.forEach(item => {
    Deal[item] && Deal[item](item)
})