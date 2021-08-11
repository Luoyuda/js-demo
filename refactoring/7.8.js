/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 16:18:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 16:21:54
 * @FilePath: /js-demo/refactoring/7.8.js
 */
function findPerson(people){
    for(let i = 0; i < people.length; i++){
        if(people[i] === 'Don') return 'Don'
        if(people[i] === 'Join') return 'Join'
        if(people[i] === 'Kent') return 'Kent'
    }
    return ''
}
function findPerson(people) {
    const candidates = ['Don', 'Join', 'Kent']
    return people.find(p => candidates.includes(p)) || ''
}
console.log(findPerson(['Join']))
console.log(findPerson(['Joins']))