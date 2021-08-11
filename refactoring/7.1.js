/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 11:00:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 13:11:03
 * @FilePath: /js-demo/refactoring/7.1.js
 */
(() => {
    const organization = { name:'Acme', country: "GB" }
    let result = ''
    result += `<h1>${organization.name} : ${organization.country}</h1>\n`
    organization.name = '121'
    organization.country = '121'
    result += `<h1>${organization.name} : ${organization.country}</h1>`
    console.log(result)
})();
(() => {
    class Organization {
        constructor(data){
            this._name = data.name
            this._country = data.country
        }
        get name(){ return this._name }
        get country(){ return this._country }
        set name(name){ this._name = name }
        set country(country){ this._country = country }
    }
    const organization = new Organization({ name:'Acme', country: "GB" })
    let result = ''
    result += `<h1>${organization.name} : ${organization.country}</h1>\n`
    organization.name = '121'
    organization.country = '121'
    result += `<h1>${organization.name} : ${organization.country}</h1>`
    console.log(result)
})();