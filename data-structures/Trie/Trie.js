/*
 * @Author: xiaohuolong
 * @Date: 2021-08-11 17:07:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-12 15:37:40
 * @FilePath: /js-demo/data-structures/Trie/Trie.js
 */
/**
 * Initialize your data structure here.
 */
var Trie = function() {
    this.root = {}
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let root = this.root
    for(let x of word){
        if(!root[x]){
            root[x] = {}
        }
        root = root[x]
    }
    root.end = true
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let root = this.find(word)
    return root ? !!root.end : false
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return !!this.find(prefix)
};

Trie.prototype.find = function(word) {
    let root = this.root
    for(let x of word){
        if(!root[x]) return false
        root = root[x]
    }
    return root
};
