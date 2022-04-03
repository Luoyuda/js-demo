/*
 * @Author: xiaohuolong
 * @Date: 2020-08-26 18:12:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-31 15:26:07
 * @FilePath: /js-demo/scripts/change.js
 */
const { exec } = require('shelljs')
const { join } = require('path')
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
      // 基于window的改动
      let path = `${join(__dirname.replace('scripts', ''), change.replace('.js', '.test.js'))}`
      path = path.replace(/\\/ig, '/')
      let stat = fs.statSync(path)
      console.log(chalk.red(`==== 执行 jest ${path} ====`))
      exec(`jest ${path}`)
    } catch (error) {
      console.log(error)
      console.log(chalk.red(`==== 执行 node ${change} ====`))
      exec(`node ${change}`)
    }
  }
}
console.log(chalk.green(`==== 执行结束 ====`))
