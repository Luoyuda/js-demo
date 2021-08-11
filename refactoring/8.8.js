/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 09:35:09
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 09:54:07
 * @FilePath: /js-demo/refactoring/8.8.js
 */
const input = `office, country, telephone

Chicago, USA, +1 312 373 1000
Beijing, China, +86 4000 900 505
Chicago, USA, +1 312 373 1000
Beijing, China, +86 4000 900 505
Chicago, USA, +1 312 373 1000
Beijing, China, +86 4000 900 505`;
(() => {
    function acquireData(input) {
        const lines = input.split('\n')
        let firstLine = true
        const result = []
        for (const line of lines) {
            if(firstLine) {
                firstLine = false
                continue
            }
            if(line.trim() === '') continue
            const record = line.split(',')
            if(record[1].trim() === 'China'){
                result.push({
                    city: record[0].trim(),
                    phone: record[2].trim(),
                })
            }
        }
        return result
    }
    console.time('1')
    console.log(acquireData(input));
    console.timeEnd('1')
})();
(() => {
    function acquireData(input) {
        const lines = input.split('\n')
        return lines
                .slice(1)
                .filter(line => line.trim() !== '')
                .map(line => line.split(','))
                .filter(record => record[1].trim() === 'China')
                .map(record => ({
                    city: record[0].trim(),
                    phone: record[2].trim(),
                }))
    }
    console.time('1')
    console.log(acquireData(input));
    console.timeEnd('1')
})();