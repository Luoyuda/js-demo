/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 08:04:00
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 08:19:49
 * @FilePath: /js-demo/leetcode/面试金典/17.11.js
 */
/**
面试题 17.11. 单词距离
    有个内含单词的超大文本文件，给定任意两个单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。如果寻找过程在这个文件中会重复多次，而每次寻找的单词不同，你能对此优化吗?
示例：
    输入：words = ["I","am","a","student","from","a","university","in","a","city"], word1 = "a", word2 = "student"
    输出：1
提示：
words.length <= 100000
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var findClosest = function(words, word1, word2) {
    let word1Arr = []
    let word2Arr = []
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if(word == word1){
            word1Arr.push(i)
        }else if(word == word2){
            word2Arr.push(i)
        }
    }
    // console.log(word1Arr, word2Arr)
    let a = 0
    let b = 0
    let ans = Infinity
    while (a < word1Arr.length || b < word2Arr.length){
        ans = Math.min(ans, Math.abs(word1Arr[a] - word2Arr[b]))
        if(a + 1 < word1Arr.length && b + 1 < word2Arr.length){
            let x = Math.abs(word1Arr[a + 1] - word2Arr[b])
            let y = Math.abs(word1Arr[a] - word2Arr[b + 1])
            // console.log(x, y)
            if(x < y){
                a++
            }else if(x == y){
                a++
                b++
            }else{
                b++
            }
        }else if(a + 1 < word1Arr.length){
            a++
        }else if(b + 1 < word2Arr.length){
            b++
        }else{
            break
        }
    }
    return ans
};

console.log(findClosest( ["I","am","a","student","from","a","university","in","a","city","213","student"], "a", "student"))