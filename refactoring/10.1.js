/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 12:46:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 12:57:59
 * @FilePath: /js-demo/refactoring/10.1.js
 */
(() => {
    function price(aDate, aPlan){
        let charge
        let quantity = 100
        if(aDate.isSummer || aDate.isSpring){
            charge = quantity * aPlan.summerRate
        }else{
            charge = quantity * aPlan.rate
        }
        return charge
    }
    console.log(price({
        isSummer: true,
    }, {
        summerRate: 0.8,
        rate: 1.1
    }))
})();
(() => {
    function price(aDate, aPlan){
        let quantity = 100
        return summerOrSpring() ? summerCharge() : orderCharge()
        function summerOrSpring(){
            return aDate.isSummer || aDate.isSpring
        }
        function summerCharge(){
            return quantity * aPlan.summerRate
        }
        function orderCharge(){
            return quantity * aPlan.rate
        }
    }
    console.log(price({
        isSummer: true,
    }, {
        summerRate: 0.8,
        rate: 1.1
    }))
})();