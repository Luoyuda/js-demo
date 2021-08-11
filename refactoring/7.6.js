/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 15:45:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 15:57:48
 * @FilePath: /js-demo/refactoring/7.6.js
 */
(() => {
    class TrackingInformation {
        constructor(company, number){
            this._shippingCompany = company
            this._trackingNumber = number
        }
        get shippingCompany(){return this._shippingCompany}
        set shippingCompany(arg) {this._shippingCompany = arg}
        get trackingNumber(){return this._trackingNumber}
        set trackingNumber(arg) {this._trackingNumber = arg}
        get display(){ return `${this.shippingCompany} ${this.trackingNumber}` }
    }
    class Shipment {
        constructor(name, company, number){
            this._name = name
            this._trackingInformation = new TrackingInformation(company, number)
        }
        get trackingInfo(){return this._trackingInformation.display}
        get trackingInformation(){return this._trackingInformation}
    }
    const s = new Shipment('xy', 'xxx', '12345678910')
    console.log(s.trackingInfo)
})();
(() => {
    class Shipment {
        constructor(name, company, number){
            this._name = name
            this._shippingCompany = company
            this._trackingNumber = number
        }
        get shippingCompany(){return this._shippingCompany}
        set shippingCompany(arg) {this._shippingCompany = arg}
        get trackingNumber(){return this._trackingNumber}
        set trackingNumber(arg) {this._trackingNumber = arg}
        get trackingInfo(){ return `${this.shippingCompany} ${this.trackingNumber}` }
        get trackingInformation(){return { _shippingCompany: this.shippingCompany, _trackingNumber: this._trackingNumber}}
    }
    const s = new Shipment('xy', 'xxx', '12345678910')
    console.log(s.trackingInfo)
    console.log(s.trackingInformation)
})();
