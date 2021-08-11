/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 21:51:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 22:04:52
 * @FilePath: /js-demo/refactoring/12.8.js
 */
(() => {
    class Employee {
        constructor(name, id, monthlyCost){
            this.name = name
            this.id = id
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Department {
        constructor(name, staff){
            this.name = name
            this.staff = staff
        }
        get totalMonthlyCost(){
            return this.staff.map(e => e.monthlyCost).reduce((prev, cur) => prev + cur, 0)
        }
        get totalAnnualCost(){
            return this.totalMonthlyCost * 12
        }
    }
    let x = new Employee('x', 1, 1000)
    let y = new Employee('y', 1, 1000)
    let z = new Employee('z', 1, 1000)
    let d = new Department('ww', [x, y, z])
    console.log(x.annualCost, y.annualCost, z.annualCost)
    console.log(d.totalMonthlyCost, d.totalAnnualCost)
})();
(() => {
    class Party{
        constructor(name){
            this.name = name
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party{
        constructor(name, id, monthlyCost){
            super(name)
            this.id = id
            this.monthlyCost = monthlyCost
        }
    }
    class Department extends Party{
        constructor(name, staff){
            super(name)
            this.staff = staff
        }
        get monthlyCost(){
            return this.staff.map(e => e.monthlyCost).reduce((prev, cur) => prev + cur, 0)
        }
    }
    let x = new Employee('x', 1, 1000)
    let y = new Employee('y', 1, 1000)
    let z = new Employee('z', 1, 1000)
    let d = new Department('ww', [x, y, z])
    console.log(x.annualCost, y.annualCost, z.annualCost)
    console.log(d.monthlyCost, d.annualCost)
})();