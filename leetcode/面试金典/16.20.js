/*
 * @Author: xiaohuolong
 * @Date: 2021-04-02 20:08:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 07:42:45
 * @FilePath: /js-demo/leetcode/面试金典/16.20.js
 */
/**
 * @param {string} num
 * @param {string[]} words
 * @return {string[]}
面试题 16.20. T9键盘
在老式手机上，用户通过数字键盘输入，手机将提供与这些数字相匹配的单词列表。
每个数字映射到0至4个字母。
给定一个数字序列，实现一个算法来返回匹配单词的列表。你会得到一张含有有效单词的列表。映射如下图所示：
示例 1:
    输入: num = "8733", words = ["tree", "used"]
    输出: ["tree", "used"]
示例 2:
    输入: num = "2", words = ["a", "b", "c", "d"]
    输出: ["a", "b", "c"]
 */
let phone = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
}
let iphoneMap = {
    a: '2',
    b: '2',
    c: '2',
    d: '3',
    e: '3',
    f: '3',
    g: '4',
    h: '4',
    i: '4',
    j: '5',
    k: '5',
    l: '5',
    m: '6',
    n: '6',
    o: '6',
    p: '7',
    q: '7',
    r: '7',
    s: '7',
    t: '8',
    u: '8',
    v: '8',
    w: '9',
    x: '9',
    y: '9',
    z: '9'
}
var getValidT9Words = function(num, words) {
    let res = []
    let hash = {}
    let chHash = {}
    let phoneMap = {}
    words.forEach(item => {
        if(item.length == num.length){
            hash[item] = true
            for (let i = 0; i < item.length; i++) {
                const element = item[i];
                const number = iphoneMap[element]
                console.log(element,number, chHash[element])
                if(!chHash[element]){
                    if(!phoneMap[number]){
                        phoneMap[number] = []
                    }
                    phoneMap[number].push(element)
                    chHash[element] = true
                }
            }
        }
    })
    console.log(phoneMap)
    let dfs = (str, start) => {
        if(str.length >= num.length){
            console.log(str)
            if(hash[str]){
                res.push(str)
            }
            return 
        }
        for (let i = start; i < num.length; i++) {
            const chs = phone[num[i]];
            for (let j = 0; j < chs.length; j++) {
                const ch = chs[j];
                if(!chHash[ch]) continue
                dfs(str + ch, i + 1)
            }
        }
    }
    dfs('', 0)
    console.log(chHash)
    console.log(hash)
    return res
};
var getValidT9Words = function (num, words) {
    num = num + '';
    let data = {
        2: 'abc', 3: 'def',
        4: 'ghi', 5: 'jkl', 6: 'mno',
        7: 'pqrs', 8: 'tuv', 9: 'wxyz'
    };
    let arr = [];
    for (let k = 0; k < words.length; k++) {
        let s = 0;
        for (let i = 0; i < num.length; i++) {
            if (data[num[i]].indexOf(words[k][i]) > -1) {
                s++;
            }
        }
        if (s === words[k].length) arr.push(words[k])
    }
    return arr;

};
console.log(getValidT9Words('8733', ['tree', 'used']))
console.log(getValidT9Words('2', ['a', 'b', 'c', 'd']))
console.log(getValidT9Words('73328962353432379245754568346322723396359744563667', ["iujxuizfnulgrdnowzxndjakvhsqguxvnytgjujnnktmokawdp", "rfebuxncdleidbepwaijskgjotdinebaqceezoejyrhgjofnmr", "qddatwmceldhfafqxcikpkijovfgofabradfznejxshikneonp", "rysuauovdqmwdyorrlpjzuechbjknndfpfcwgjnptmxnixtuqm", "qeeauwnbdkeiecdpzbijslhjmudgmeacqcddzmdkyshikmdmns", "vqqcntpgqgxyqshdtnyyxbytzwllhxrnaqwzfsswgqnabdxawf"]))
