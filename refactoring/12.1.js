/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 19:52:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 19:58:06
 * @FilePath: /js-demo/refactoring/12.1.js
 */
(() => {
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
    }
    class Employee extends Party {
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Department extends Party {
        get totalAnnualCost(){ return this.monthlyCost * 12 }
    }
    const e = new Employee(100);
    const d = new Department(100);
    console.log(e.annualCost)
    console.log(d.totalAnnualCost)
})();
(() => {
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party {
    }
    class Department extends Party {
    }
    const e = new Employee(100);
    const d = new Department(100);
    console.log(e.annualCost)
    console.log(d.annualCost)
})();