/**
 * @param {string} s
 * @return {string[]}
    93. 复原IP地址
    给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
    有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
    例如："0.1.2.201" 和 "192.168.1.1" 是 有效的 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效的 IP 地址。
    示例 1：
        输入：s = "25525511135"
        输出：["255.255.11.135","255.255.111.35"]
    示例 2：
        输入：s = "0000"
        输出：["0.0.0.0"]
    示例 3：
        输入：s = "1111"
        输出：["1.1.1.1"]
    示例 4：
        输入：s = "010010"
        输出：["0.10.0.10","0.100.1.0"]
    示例 5：
        输入：s = "101023"
        输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
    提示：
        0 <= s.length <= 3000
        s 仅由数字组成
 */
// var restoreIpAddresses = function(s) {
//     let res = []
//     let dfs = (arr, start) => {
//         if(start >= s.length && arr.length == 4){
//             res.push(arr.join('.'))
//             return
//         }
//         if(arr.length == 4 && start != s.length) return;
//         for (let i = 1; i <= 3; i++) {
//             // 如果取的范围超过了字符串长度，直接剪掉
//             if(start + i - 1 >= s.length) return;
//             let str = s.substring(start, start + i)
//             if(str.length >= 2 && str[0] == 0) return;
//             if(str.length >= 3 && +str > 255) return;
//             arr.push(str)
//             dfs(arr.slice(), start + i)
//             arr.pop()
//         }
//     }
//     dfs([], 0)
//     return res
// };
var restoreIpAddresses = function(s) {
    let res = []
    let dfs = (arr, start) => {
        if(start >= s.length && arr.length == 4){
            res.push(arr.join(','))
            return
        }else if(arr.length > 4){
            return
        }
        for (let i = start; i < s.length; i++) {
            let str = s.slice(start, i + 1)
            if(str.length >= 2 && str[0] == 0) return;
            if(str.length >= 3 && +str > 255) return;
            arr.push(str)
            dfs(arr.slice(), i + 1)
            arr.pop()
        }
    }
    dfs([], 0)
    return res
};

// console.log(restoreIpAddresses('25525511135'))
// console.log(restoreIpAddresses('0000'))
// console.log(restoreIpAddresses('1111'))
console.log(restoreIpAddresses('010010'))
// console.log(restoreIpAddresses('101023'))