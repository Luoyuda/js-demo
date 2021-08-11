/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 20:12:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 20:14:24
 * @FilePath: /js-demo/refactoring/12.3.js
 */
(() => {
    class Party {
    }
    class Employee extends Party {
        constructor(name, id, monthlyCost){
            super()
            this.name = name
            this.id = id
            this.monthlyCost = monthlyCost
        }
    }
    class Department extends Party {
        constructor(name, staff){
            super()
            this.name = name
            this.staff = staff
        }
    }
    const e = new Employee('xy', 1, 100);
    const d = new Department('xy', 1, 100);
    console.log(e)
    console.log(d)
})();
(() => {
    class Party {
        constructor(name){
            this.name = name
        }
    }
    class Employee extends Party {
        constructor(name, id, monthlyCost){
            super(name)
            this.id = id
            this.monthlyCost = monthlyCost
        }
    }
    class Department extends Party {
        constructor(name, staff){
            super(name)
            this.staff = staff
        }
    }
    const e = new Employee('xy', 1, 100);
    const d = new Department('xy', 1, 100);
    console.log(e)
    console.log(d)
})();