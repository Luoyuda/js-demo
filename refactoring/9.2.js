/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 11:02:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 11:23:35
 * @FilePath: /js-demo/refactoring/9.2.js
 */
(() => {
    const organization = { name: 'Acme', country: 'GB' }
    console.log(`title = ${organization.name} country = ${organization.country}`)    
})();
(() => {
    class Organization {
        constructor(data){
            this._title = data.title || data.name
            this._country = data.country
        }
        get title() {return this._title }
        set title(title) {this._title = title}
        get country() {return this._country}
        set country(country) {this._country = country}
    }
    const organization =  new Organization({ name: 'Acme', country: 'GB' })
    console.log(`title = ${organization.title} country = ${organization.country}`)    
})();