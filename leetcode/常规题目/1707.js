/*
 * @Author: xiaohuolong
 * @Date: 2021-05-23 16:05:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-23 17:05:02
 * @FilePath: /js-demo/leetcode/常规题目/1707.js
 */
/*
1707. 与数组中元素的最大异或值
    给你一个由非负整数组成的数组 nums 。另有一个查询数组 queries ，
    其中 queries[i] = [xi, mi] 。
    第 i 个查询的答案是 xi 和任何 nums 数组中不超过 mi 的元素按位异或（XOR）得到的最大值。
    换句话说，答案是 max(nums[j] XOR xi) ，其中所有 j 均满足 nums[j] <= mi 。
    如果 nums 中的所有元素都大于 mi，最终答案就是 -1 。
    返回一个整数数组 answer 作为查询的答案，
    其中 answer.length == queries.length 且 answer[i] 是第 i 个查询的答案。
示例 1：
    输入：nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
    输出：[3,3,7]
    解释：
    1) 0 和 1 是仅有的两个不超过 1 的整数。0 XOR 3 = 3 而 1 XOR 3 = 2 。二者中的更大值是 3 。
    2) 1 XOR 2 = 3.
    3) 5 XOR 2 = 7.
示例 2：
    输入：nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
    输出：[15,-1,5]
提示：
    1 <= nums.length, queries.length <= 105
    queries[i].length == 2
    0 <= nums[j], xi, mi <= 109
*/
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
function PrefixTree(val){
    // 使用对象作为存储结构内存会溢出
    return [val,null,null]
}
PrefixTree.prototype = Object.create(null);
function getMax(val,maxDigit,node){
    let ans = 0;
    for( let j = maxDigit - 1 ; j >= 0; j--){
        let key = ((val >> j) & 1) + 1;
        // key = 2 期望 1 1期望2  尽量获取当前路径的最大值
        if( node[3-key] ){
            ans = 2* ans + 1;
            node = node[3-key]
        }else{
            ans = 2* ans;
            node = node[key]
        }
    }
    // 右移超过当前nums中的最大位的位数后还有剩余 说明val也就是xi的值要比nums[i]中的最大值大
    // 最后的结果需要加上 
    
    if( (val >> (maxDigit - 1)) > 1 ){
        ans += (val >> maxDigit) * (2 << (maxDigit - 1))
    }
    return ans;
}
var maximizeXor = function(nums, queries) {

    var max = 0;
    var numsL = nums.length;
    var queriesL = queries.length;

    nums.sort( (a,b) => {
        max = Math.max(max,a,b)
        return  ( a - b)
    })

    if( numsL === 1 ){
        max = nums[0]
    }

    var maxBinDigit = 0;
    while(max){
        maxBinDigit++;
        max >>= 1;
    };

    for( let i = 0 ; i < queriesL; i++ ){
        queries[i].push(i)
    }

    queries.sort((a,b) => {
        return a[1] - b[1]
    })

    var ans = new Array( queriesL );
    var root =  PrefixTree(-1);
    let i = 0 ;
    for( var k = 0; k < queriesL; k++ ){
        for(; i < numsL && nums[i] <= queries[k][1]; i++ ){
            var node = root;
            if( nums[i] === nums[i-1] ){
                continue;
            }
            for( var j = maxBinDigit - 1 ; j >= 0; j--){
                var key = ((nums[i] >> j) & 1) + 1; // 使用1 2 作为存储子树的key
                if(!node[key]){
                    node[key] = PrefixTree(key)
                }
                node = node[key];
            }
        }
        if( !i ){
            ans[queries[k][2]] = -1;
        }else{
            ans[queries[k][2]] = getMax(queries[k][0],maxBinDigit,root);
        }
    }
    return ans;
};