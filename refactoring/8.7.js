/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 09:25:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 09:29:55
 * @FilePath: /js-demo/refactoring/8.7.js
 */
(() => {
    const people = [
        { age: 20, salary: 10000 },
        { age: 30, salary: 10000 },
        { age: 25, salary: 20000 },
        { age: 22, salary: 50000 },
        { age: 26, salary: 60000 },
    ]
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0
    for (const p of people) {
        if(p.age < youngest) youngest = p.age
        totalSalary += p.salary
    }
    console.log(`youngest: ${youngest} totalSalary: ${totalSalary}`)
})();
(() => {
    const people = [
        { age: 20, salary: 10000 },
        { age: 30, salary: 10000 },
        { age: 25, salary: 20000 },
        { age: 22, salary: 50000 },
        { age: 26, salary: 60000 },
    ]
    let youngest = Math.min(...people.map(p => p.age))
    let totalSalary = people.reduce((prev, item) => prev + item.salary, 0)
    console.log(`youngest: ${youngest} totalSalary: ${totalSalary}`)
})();