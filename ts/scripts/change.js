/*
 * @Author: xiaohuolong
 * @Date: 2020-08-26 18:12:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-25 15:51:24
 * @FilePath: /ts-test-demo/scripts/change.js
 */
const { exec } = require('shelljs')
const chalk = require('chalk')
// 获取变更文件夹
const change = process.env.change || '';

console.log(chalk.green('==== 执行change脚本 ===='))
console.log(chalk.red(`==== 变更${change} ====`))
if(change){
    exec(`ts-node ${change}`)
}
console.log(chalk.green('==== 运行结束 ===='))
