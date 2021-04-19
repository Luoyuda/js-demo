/*
 * @Author: xiaohuolong
 * @Date: 2021-04-17 12:42:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-17 12:48:52
 * @FilePath: /js-demo/leetcode/常规题目/278.js
 */
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */


/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let low = 0;
        let high = n
        while (low < high){
            let mid = low + Math.floor((high - low) / 2)
            if(isBadVersion(mid)){
                high = mid
            }else{
                low = mid + 1
            }
        }
        return low
    };
};