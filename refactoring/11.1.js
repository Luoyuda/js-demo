/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 19:03:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 19:18:34
 * @FilePath: /js-demo/refactoring/11.1.js
 */
const people = ['xx', 'yy', 'zz', 'oo', 'zzz', 'cc']
function setOffAlarms(){
    setTimeout(() => {
        console.log('!!!')
    }, 100)
}

function alertForMiscreant(people) {
    for (const p of people) {
        if(p === 'oo'){
            setOffAlarms()
            return p
        }
        if(p === 'cc'){
            setOffAlarms()
            return p
        }
    }
    return ''
}

function alertForMiscreant(people) {
    if(findMiscreant(people) !== '') setOffAlarms()
}

function findMiscreant(people) {
    for (const p of people) {
        if(p === 'oo' || p === 'cc'){
            return p
        }
    }
    return ''
}
const found = findMiscreant(people)
alertForMiscreant(people)