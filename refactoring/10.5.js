/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 16:53:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 18:54:28
 * @FilePath: /js-demo/refactoring/10.5.js
 */
(() => {
    function customerName(aCustomer){
        if(aCustomer.toString() === 'unknown') return 'occupant'
        return aCustomer.name
    }
    function customerPlan(aCustomer){
        if(aCustomer.toString() === 'unknown') return 'basic plan'
        return aCustomer.plan
    }
    class Customer {
        constructor(name, plan) {
            this.name = name
            this.plan = plan
        }
        toString() {
            return this.name || 'unknown'
        }
    }
    const customer = new Customer()
    console.log(customerName(customer))
    console.log(customerPlan(customer))
})();
(() => {
    function customerName(aCustomer){
        return aCustomer.name
    }
    function customerPlan(aCustomer){
        return aCustomer.plan
    }
    class Customer {
        constructor(name, plan) {
            this.name = name
            this.plan = plan
        }
        toString() {
            return this.name || 'unknown'
        }
    }
    const customer = enrichCustomer(new Customer())
    function enrichCustomer(aCustomer){
        const unknownCustomer = {
            name: 'occupant',
            plan: 'basic plan'
        }
        if(aCustomer.toString() === 'unknown') return unknownCustomer
        return aCustomer
    }
    console.log(customerName(customer))
    console.log(customerPlan(customer))
})();