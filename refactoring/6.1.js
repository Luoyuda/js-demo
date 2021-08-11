/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 10:34:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 14:21:39
 * @FilePath: /js-demo/refactoring/6.1.js
 */
const invoices = [
    {
        customer: 'BigCo',
        outstanding: [
            {
                amount: 10
            },
            {
                amount: 20
            }
        ]
    },
    {
        customer: 'Helle',
        outstanding: [
            {
                amount: 30
            },
            {
                amount: 40
            }
        ]
    }
]
// before
function printOwing(invoice) {
    console.log('--- ---- ---')
    console.log('--- Owes ---')
    console.log('--- ---- ---')
    let amounts = 0
    for(let { amount } of invoice.outstanding) {
        amounts += amount
    }
    console.log(`name: ${invoice.customer}`)
    console.log(`amount: ${amounts}`)
}
// after
function printOwing(invoice) {
    printBanner()
    let outstanding = amountFor(invoice)
    printDetails(invoice, outstanding)
    return
    function printBanner(){
        console.log('--- ---- ---')
        console.log('--- Owes ---')
        console.log('--- ---- ---')
    }
    function amountFor(invoice){
        return invoice.outstanding.reduce((prev, item) => prev + item.amount, 0)
    }
    function printDetails(invoice, outstanding){
        console.log(`name: ${invoice.customer}`)
        console.log(`amount: ${outstanding}`)
    }
}
invoices.forEach(printOwing)