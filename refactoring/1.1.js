/*
 * @Author: xiaohuolong
 * @Date: 2021-08-06 09:12:00
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-06 13:10:09
 * @FilePath: /js-demo/refactoring/1.1.js
 */
// plays.json
const plays = {
    "hamlet": { "name": 'Hamlet', "type": "tragedy" },
    "as-like": { "name": 'As You Like It', "type": "comedy" },
    "othello": { "name": 'Othello', "type": "tragedy" },
}
// invoices.json
const invoices = [
    {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55
            },
            {
                'playID': 'as-like',
                'audience': 35
            },
            {
                'playID': 'othello',
                'audience': 40
            },
        ]
    }
]
/**
 * 发票：代码结构不清晰
 * @param {object} invoice 
 * @param {object} plays 
 */
function statement(invoice, plays){
    let totalAmount = 0
    let volumeCredits = 0
    let result = `Statement for ${invoice.customer} \n`
    const format = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format
    for(let pref of invoice.performances){
        const play = plays[pref.playID]
        let thisAmount = 0
        switch(play.type){
            case 'tragedy':
                thisAmount = 40000
                if(pref.audience > 30){
                    thisAmount += 1000 * (pref.audience - 30)
                }
                break
            case 'comedy':
                thisAmount = 30000
                if(pref.audience > 20){
                    thisAmount += 10000 + 500 * (pref.audience - 20)
                }
                thisAmount += 300 * (pref.audience)
                break
            default:
                throw new Error(`unknown type: ${play.type}`)
        }
        volumeCredits += Math.max(pref.audience - 30, 0)
        if(play.type === 'comedy') volumeCredits += Math.floor(pref.audience / 5)
        result += `${play.name}: ${format(thisAmount / 100)} (${pref.audience} seats)\n`
        totalAmount += thisAmount
    }
    result += `Amount owned is ${format(totalAmount / 100)}\n`
    result += `You earned ${volumeCredits} credits \n`
    return result
}
// 重构的第一步：确保重构代码有一组可靠的测试
// 1. 分解 statement 函数
function statement(invoice, plays){
    return renderPlainText(createStatement(invoice, plays))
}
function createStatement(invoice, plays){
    const statementData = {}
    statementData.customer = invoice.customer
    statementData.performances = invoice.performances.map(enrichPerformance)
    statementData.totalVolumeCredits = totalVolumeCredits(statementData)
    statementData.totalAmount = totalAmount(statementData)
    return statementData
    function enrichPerformance(aPerformance){
        const calculator = createPreferenceCalculator(aPerformance, playFor(aPerformance))
        const result = Object.assign({}, aPerformance)
        result.play = calculator.play
        result.amount = calculator.amount
        result.volumeCredits = calculator.volumeCredits
        return result
        function playFor(aPerformance){
            return plays[aPerformance.playID]
        }
        function createPreferenceCalculator(aPerformance, aPlay){
            switch(aPlay.type){
                case 'tragedy': return new TragedyPerformance(aPerformance, aPlay)
                case 'comedy': return new ComedyPerformance(aPerformance, aPlay)
                default: throw new Error(`unknown type: ${this.play.type}`)
            }
        }
    }
    function totalVolumeCredits(data){
        return data.performances.reduce((prev, item) => prev + item.volumeCredits, 0)
    }
    function totalAmount(data){
        return data.performances.reduce((prev, item) => prev + item.amount, 0)
    }
}
class PerformanceCalculator {
    constructor(aPerformance, aPlay){
        this.performance = aPerformance
        this.play = aPlay
    }
    get amount() {
        throw new Error('111')
    }
    get volumeCredits(){
        return Math.max(this.performance.audience - 30, 0)
    }
}
class TragedyPerformance extends PerformanceCalculator{
    get amount() {
        // 2.改变量名，更加易读
        let result = 40000
        if(this.performance.audience > 30){
            result += 1000 * (this.performance.audience - 30)
        }
        return result
    }
}
class ComedyPerformance extends PerformanceCalculator{
    get amount() {
        // 2.改变量名，更加易读
        let result = 30000
        if(this.performance.audience > 20){
            result += 10000 + 500 * (this.performance.audience - 20)
        }
        result += 300 * (this.performance.audience)
        return result
    }
    get volumeCredits(){
        return super.volumeCredits + Math.floor(this.performance.audience / 5)
    }
}
/**
 * 重构版本
 * 1 提炼函数
 * 2 移除局部变量
 * @param {object} invoice 
 */
function renderPlainText(data){
    let result = `Statement for ${data.customer} \n`
    for(let pref of data.performances){
        result += `${pref.play.name}: ${usd(pref.amount / 100)} (${pref.audience} seats)\n`
    }
    result += `Amount owned is ${usd(data.totalAmount / 100)}\n`
    result += `You earned ${data.totalVolumeCredits} credits \n`
    return result
    function usd(aNumber){
        return new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(aNumber)
    }
    
}
invoices.forEach(invoice => {
    console.log(statement(invoice, plays))
})