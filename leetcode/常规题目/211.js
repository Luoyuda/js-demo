/*
 * @Author: xiaohuolong
 * @Date: 2021-08-12 15:00:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-12 15:01:28
 * @FilePath: /js-demo/leetcode/常规题目/211.js
 */
/*
211. 添加与搜索单词 - 数据结构设计
    请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。
实现词典类 WordDictionary ：
    WordDictionary() 初始化词典对象
    void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
    bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。
示例：
    输入：
        ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
        [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
    输出：
        [null,null,null,null,false,true,true,true]
    解释：
        WordDictionary wordDictionary = new WordDictionary();
        wordDictionary.addWord("bad");
        wordDictionary.addWord("dad");
        wordDictionary.addWord("mad");
        wordDictionary.search("pad"); // return False
        wordDictionary.search("bad"); // return True
        wordDictionary.search(".ad"); // return True
        wordDictionary.search("b.."); // return True
提示：
    1 <= word.length <= 500
    addWord 中的 word 由小写英文字母组成
    search 中的 word 由 '.' 或小写英文字母组成
    最多调用 50000 次 addWord 和 search
*/
/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.root = {}
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let node = this.root
    for(let x of word){
        if(!node[x]) node[x] = {}
        node = node[x]
    }
    node.end = true
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    if(!word) return false
    return this.dfs(word, 0, this.root)
};

WordDictionary.prototype.dfs = function(word, i, node){
    if(!node) return false
    let x = word[i]
    let j = i + 1
    if(x !== '.') return j === word.length ? !!(node[x] && node[x].end) 
    : this.dfs(word, j, node[x])

    let keys = Object.keys(node).filter(key => key !== 'end')
    let cb = j === word.length ? key => node[key].end
    : key => this.dfs(word, j, node[key])

    return keys.some(cb)
}
/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */