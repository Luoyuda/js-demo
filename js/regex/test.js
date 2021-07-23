/*
 * @Author: xiaohuolong
 * @Date: 2021-07-20 08:18:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-20 14:36:06
 * @FilePath: /js-demo/js/regex/test.js
 */
function check(tests, regex){
    tests.forEach(([arg, res]) => {
        regex.lastIndex = 0
        if(regex.test(arg) != res){
            regex.lastIndex = 0
            console.log(regex.test(arg))
            console.log(arg, res)
        }
    })
}
function search(tests, regex) {
    tests.forEach(([arg, res]) => {
        let ret = arg.match(regex) || []
        if(ret[0] != res){
            console.log(ret[0], arg, res)
        }
    })
}
function replace(tests, ...args){
    tests.forEach(([arg, res]) => {
        let ret = arg.replace(...args)
        if(ret != res){
            console.log(arg, ret, res)
        }
    })
}
// 匹配 16 进制颜色值要求匹配：#ffbbad #Fc01DF #FFF #ffE
(() => {
    let tests = [
        ['#fffbad', true],
        ['#fff', true],
        ['#dF2', true],
        ['#2Fd', true],
        ['#2F2ff2', true],
        ['#2F2ff22', false],
        ['#22ff22', true],
        ['#22', false],
        ['#2gh', false],
        ['#221dgh', false],
        ['#', false],
        ['', false],
    ]
    // let regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g
    let regex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/g
    check(tests, regex)
});
// 匹配时间以 24 小时制为例。要求匹配：23:59 02:07
(() => {
    let tests = [
        ['23:59', true],
        ['24:00', false],
        ['00:00', true],
        ['12:30', true],
        ['12:60', false],
        ['02:07', true],
        ['12:00:01', false],
        ['1010', false],
        ['5:7', true],
        ['', false],
    ]
    let regex = /^(0?[0-9]|[1][0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])$/g
    check(tests, regex)
});
// 匹配日期比如yyyy-mm-dd格式为例。要求匹配：2017-06-10
(() => {
    let tests = [
        ['2020-11-01', true],
        ['20202-11-01', false],
        ['202-11-01', false],
        ['2022-13-01', false],
        ['2022-00-01', false],
        ['2022-12-12', true],
        ['2022-12-32', false],
        ['2022-122-32', false],
        ['2022-122-30', false],
        ['2022-12-2', false],
        ['2022-12-00', false],
        ['2022-10-00', false],
        ['2022-10-01', true],
        ['2022-10-20', true],
        ['', false],
    ]
    let regex = /^([\d]{4}-([0][1-9]|[1][0-2])-([0][1-9]|[12][0-9]|[3][0-1]))$/g
    check(tests, regex)
});
/*
window 操作系统文件路径要求匹配：
F:\study\javascript\regex\regular expression.pdf
F:\study\javascript\regex\
F:\study\javascript
F:\
*/ 
(() => {
    let tests = [
        ['F:\\study\\javascript\\regex\\regular expression.pdf', true],
        ['F:\\study\\javascript\\regex\\', true],
        ['F:\\study\\javascript', true],
        ['F:\\', true],
    ]
    let regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/g
    check(tests, regex)
});
/*
匹配 id要求从
<div id="container" class="main"></div>
提取出 
id="container"
*/
(() => {
    let tests = [
        [`<div id="container" class="main"></div>`, `id="container"`],
        [`<div id="1" class="main"></div>`, `id="1"`],
        [`<div id="&" class="main"></div>`, `id="&"`],
        [`<div id="" class="main"></div>`, `id=""`],
        [`<div class="main"></div>`],
    ]
    // let regex = /id=".*?"/g
    let regex = /id="[^"]*"/g
    search(tests, regex)
});
/* 
数字的千位分隔符表示法比如把"12345678"，
变成"12,345,678"
*/
(() => {
    let tests = [
        ['12345678', '12,345,678'],
        ['10000', '10,000'],
        ['100000000', '100,000,000'],
        ['1000.00000', '1,000.00,000'],
    ]
    
    let regex = /\B(?=(\d{3})+\b)/g
    replace(tests, regex, ',')
});
/*
验证密码问题密码长度 6-12 位，由数字、小写字符和大写字母组成，但必须至少包括 2 种字符
*/
(() => {
    let tests = [
        ['', false],
        ['1', false],
        ['122222', false],
        ['1222a2', true],
        ['222112020101', false],
        ['2221120201a1', true],
        ['2221120201A1', true],
        ['aaaaaaaaaaAa', true],
    ]
    // (?=.*[0-9])表示该位置后面的字符匹配.*[0-9]，即，有任何多个任意字符，后面再跟个数字。
    // 就是接下来的字符，必须包含个数字
    let regex = /(?=.*[0-9])(?=.*[a-z])|(?=.*[A-Z])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])^[0-9a-zA-Z]{6,12}$/g
    // (?!^[0-9]{6,12}$) 不能全都是数字
    regex = /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/g
    check(tests, regex)
});
// 字符串 trim 方法模拟trim方法是去掉字符串的开头和结尾的空白符。有两种思路去做
(() => {
    let tests = [
        ['', ''],
        [' 1 ', '1'],
        [' 1 2 2 2 2 2 ', '1 2 2 2 2 2'],
        [' 122  2a2 ', '122  2a2'],
    ]
    let regex = /^\s+|\s+$/g
    regex = /^\s*(.*?)\s*$/g
    replace(tests, regex, '$1')
});
// 将每个单词的首字母转换为大写
(() => {
    let tests = [
        ['a b c', 'A B C'],
        ['ab bc ce', 'Ab Bc Ce'],
    ]
    let regex = /(^|\s)\w/g
    replace(tests, regex, function(e=''){
        return e.toLocaleUpperCase()
    })
});
// 驼峰化
(() => {
    let tests = [
        ['abc-dev', 'abcDev'],
        ['abc_dev', 'abcDev'],
        ['_abc_dev', 'AbcDev'],
        ['-abc_dev', 'AbcDev'],
        [' abc dev', 'AbcDev'],
        ['abc dev', 'abcDev'],
    ]
    let regex = /[-_\s]+(.)?/g
    replace(tests, regex, function(match, e=''){
        return e ? e.toLocaleUpperCase() : ''
    })
});
// 划线化
(() => {
    let tests = [
        [['abcDev', '-'], 'abc-dev'],
        [['AbcDev', '-'], '-abc-dev'],
        [['abcDev', '_'], 'abc_dev'],
        [['AbcDev', '_'], '_abc_dev'],
    ]
    let regex1 = /([A-Z])/g
    let regex2 = /[-]+/g
    tests.forEach(([[str, s], res]) => {
        let ret = str.replace(regex1, `-$1`).replace(regex2, s).toLocaleLowerCase()
        if(ret != res){
            console.log(str, ret, res)
        }
    })
});
/* 
匹配成对标签要求匹配：
<title>regular expression</title>
<p>laoyao bye bye</p>
不匹配：
<title>wrong!</p>
*/
(() => {
    let tests = [
        ['<title>regular expression</title>', true],
        ['<p>regular expression</p>', true],
        ['<title>regular expression</p>', false],
    ]
    let regex = /\<([^>]+)(.*)>[\d\D]+<\/\1>/g
    check(tests, regex)
})();