/*
 * @Author: xiaohuolong
 * @Date: 2021-03-15 23:40:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-15 23:55:15
 * @FilePath: /js-demo/leetcode/1185.js
 */
/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 * 1185. 一周中的第几天
        给你一个日期，请你设计一个算法来判断它是对应一周中的哪一天。
        输入为三个整数：day、month 和 year，分别表示日、月、年。
        您返回的结果必须是这几个值中的一个 {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}。
    示例 1：
        输入：day = 31, month = 8, year = 2019
        输出："Saturday"
    示例 2：
        输入：day = 18, month = 7, year = 1999
        输出："Sunday"
    示例 3：
        输入：day = 15, month = 8, year = 1993
        输出："Sunday"
    提示：
        给出的日期一定是在 1971 到 2100 年之间的有效日期。
 */
var dayOfTheWeek = function (day, month, year) {
    const Month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const Week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // 1970年12月31日为星期四，即初始值为4
    let count = 4;
    // 算上此年前每年的日期，都先当365天算
    count += (year - 1970 - 1) * 365;
    // 算上此月前每个月的日期
    for (let i = 1; i < month; i++) {
        count += Month[i - 1];
    }
    // 算上此月的日期
    count += day;
    // 加上今年之前的闰年天数 今年是超过2月的也要计入
    for (let y = 1972; y <= (month > 2 ? year : year - 1); y+=4) {
        if(y % 100 == 0 && y % 400 != 0) continue;
        count++;
    }
    return Week[count % 7];
};
console.log(dayOfTheWeek(15,3,2020))
console.log(dayOfTheWeek(31,8,2019))
console.log(dayOfTheWeek(18,7,1999))
console.log(dayOfTheWeek(15,8,1993))