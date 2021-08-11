/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 11:34:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 11:45:38
 * @FilePath: /js-demo/refactoring/9.3.js
 */
(() => {
    const adjustments = [{amount: 1}, {amount: 2}, {amount: 3}, {amount: 4}]
    class ProductionPlan {
        constructor(adjustments){
            this._adjustments = adjustments
            this._production = this._adjustments.reduce((prev, item) => prev + item.amount, 0)
        }
        get production(){return this._production}
        applyAdjustment(anAdjustment){
            this._adjustments.push(anAdjustment)
            this._production += anAdjustment.amount
        }
    }
    const productionPlan = new ProductionPlan(adjustments)
    console.log(productionPlan.production)
    productionPlan.applyAdjustment({amount: 5})
    console.log(productionPlan.production)
})();
(() => {
    const adjustments = [{amount: 1}, {amount: 2}, {amount: 3}, {amount: 4}]
    class ProductionPlan {
        constructor(adjustments){
            this._adjustments = adjustments
        }
        get production(){return this._adjustments.reduce((prev, item) => prev + item.amount, 0)}
        applyAdjustment(anAdjustment){
            this._adjustments.push(anAdjustment)
        }
    }
    const productionPlan = new ProductionPlan(adjustments)
    console.log(productionPlan.production)
    productionPlan.applyAdjustment({amount: 5})
    console.log(productionPlan.production)
})();