/*
 * @Author: xiaohuolong
 * @Date: 2020-08-26 18:12:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-31 15:26:07
 * @FilePath: /js-demo/scripts/change.js
 */
const { exec } = require('shelljs')
const fs = require('fs')
const chalk = require('chalk')
// // 获取变更文件夹
const change = process.env.change || '';

console.log(chalk.green('==== 执行change脚本 ===='))
console.log(chalk.red(`==== 变更${change} ====`))
if(change && change != 'scripts/change.js'){
    if(change.includes('.test.')){
        console.log(chalk.red(`==== 执行 jest ${change} ====`))
        exec(`jest ${change}`)
    }
    else {
        try {
            let path = `${change.replace('.js', '.test.js')}`
            let stat = fs.statSync(path)
            console.log(chalk.red(`==== 执行 jest ${path} ====`))
            exec(`jest ${path}`)
        } catch (error) {
            console.log(chalk.red(`==== 执行 node ${change} ====`))
            exec(`node ${change}`)
        }
    }
}
console.log(chalk.green(`==== 执行结束 ====`))
