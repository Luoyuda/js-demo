/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 20:21:09
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 20:22:38
 * @FilePath: /js-demo/refactoring/12.4.js
 */
(() => {
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        annualCost(){ return this.monthlyCost * 12 }
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
    }
    class Employee extends Party {
        annualCost(){ return this.monthlyCost * 12 }
        get cost(){
            return this.annualCost() * 10
        }
    }
    class Department extends Party {
    }
})();