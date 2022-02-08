# 前缀树

是N叉树的一种特殊形式，用来存储字符串的，每一个节点代表一个字符串。每个节点会有多个子节点，通往不同子节点的路径上有着不同的字符。子节点代表的字符串是由节点本身的原始字符串，以及通往该子节点路径上所有的字符组成的。

## 实现

1. 数组
    每个节点都是大小为26数组，通过计算字符与'a'的偏移量定位 `[[[[]...]],...,[]]`

2. 哈希表
    每个节点都是个hashmap，`{ a: { b ....} }`

## 插入操作

从根节点开始，根据字符串中的字符找到目标节点，没有则创建一个新的hashmap，直到最后一个节点

## 搜索操作

从根结点开始，根据字符串字符查找子节点，如果没有找到子节点则不存在与trie树中，找到最后一个节点，且此节点为终止节点

## 代码实现

```js
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
```

## 例题

208. 实现 Trie (前缀树)
211. 添加与搜索单词
212. 单词搜索 II
213. 单词的唯一缩写 
214. 设计搜索自动补全系统
215. 单词替换
216. 键值映射
217. 数组中两个数的最大异或值