/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 20:24:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 20:25:16
 * @FilePath: /js-demo/refactoring/12.5.js
 */
(() => {
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party {
        get cost(){
            return this.annualCost() * 10
        }
    }
    class Department extends Party {
    }
})();
(() => {
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party {
        get cost(){
            return this.annualCost * 10
        }
    }
    class Department extends Party {
    }
})();