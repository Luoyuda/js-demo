/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 08:42:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-10 08:46:19
 * @FilePath: /js-demo/refactoring/11.10.js
 */
(() => {
    class ChargeCalculator{
        constructor(customer, usage, provider){
            this.customer = customer
            this.usage = usage
            this.provider = provider
        }
        get basePrice(){
            return this.customer.baseRate * this.usage
        }
        get charge(){
            return this.basePrice + this.provider.connectionCharge
        }
    }
    function charge(customer, usage, provider){
        return new ChargeCalculator(customer, usage, provider).charge
    }
})();
(() => {
    function charge(customer, usage, provider){
        const basePrice = customer.baseRate * usage
        return basePrice + provider.connectionCharge
    }
})();