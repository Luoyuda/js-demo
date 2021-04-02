/*
 * @Author: xiaohuolong
 * @Date: 2021-04-02 08:39:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-02 08:42:41
 * @FilePath: /js-demo/leetcode/面试金典/16.02.js
 */
/**
面试题 16.02. 单词频率
    设计一个方法，找出任意指定单词在一本书中的出现频率。
    你的实现应该支持如下操作：
    WordsFrequency(book)构造函数，参数为字符串数组构成的一本书
    get(word)查询指定单词在书中出现的频率
示例：
    WordsFrequency wordsFrequency = new WordsFrequency({"i", "have", "an", "apple", "he", "have", "a", "pen"});
    wordsFrequency.get("you"); //返回0，"you"没有出现过
    wordsFrequency.get("have"); //返回2，"have"出现2次
    wordsFrequency.get("an"); //返回1
    wordsFrequency.get("apple"); //返回1
    wordsFrequency.get("pen"); //返回1
提示：
    book[i]中只包含小写字母
    1 <= book.length <= 100000
    1 <= book[i].length <= 10
 * @param {string[]} book
 */
var WordsFrequency = function(book) {
    this.hash = {}
    for (let i = 0; i < book.length; i++) {
        const word = book[i];
        if(this.hash[word]){
            this.hash[word] += 1
        }else{
            this.hash[word] = 1
        }
    }
};

/** 
 * @param {string} word
 * @return {number}
 */
WordsFrequency.prototype.get = function(word) {
    return this.hash[word] || 0
};

/**
 * Your WordsFrequency object will be instantiated and called as such:
 * var obj = new WordsFrequency(book)
 * var param_1 = obj.get(word)
 */

let wordsFrequency = new WordsFrequency(["i", "have", "an", "apple", "he", "have", "a", "pen"]);
console.log(wordsFrequency.get("you")); //返回0，"you"没有出现过
console.log(wordsFrequency.get("have")); //返回2，"have"出现2次
console.log(wordsFrequency.get("an")); //返回1
console.log(wordsFrequency.get("apple")); //返回1
console.log(wordsFrequency.get("pen")); //返回1