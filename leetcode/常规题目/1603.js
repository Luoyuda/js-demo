/*
 * @Author: xiaohuolong
 * @Date: 2021-03-19 18:10:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-19 18:18:32
 * @FilePath: /js-demo/leetcode/常规题目/1603.js
 */
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
1603. 设计停车系统
    请你给一个停车场设计一个停车系统。停车场总共有三种不同大小的车位：大，中和小，每种尺寸分别有固定数目的车位。
    请你实现 ParkingSystem 类：
    ParkingSystem(int big, int medium, int small) 初始化 ParkingSystem 类，三个参数分别对应每种停车位的数目。
    bool addCar(int carType) 检查是否有 carType 对应的停车位。 carType 有三种类型：大，中，小，分别用数字 1， 2 和 3 表示。一辆车只能停在  carType 对应尺寸的停车位中。如果没有空车位，请返回 false ，否则将该车停入车位并返回 true 。
示例 1：
    输入：
    ["ParkingSystem", "addCar", "addCar", "addCar", "addCar"]
    [[1, 1, 0], [1], [2], [3], [1]]
    输出：
    [null, true, true, false, false]
解释：
    ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
    parkingSystem.addCar(1); // 返回 true ，因为有 1 个空的大车位
    parkingSystem.addCar(2); // 返回 true ，因为有 1 个空的中车位
    parkingSystem.addCar(3); // 返回 false ，因为没有空的小车位
    parkingSystem.addCar(1); // 返回 false ，因为没有空的大车位，唯一一个大车位已经被占据了
提示：
    0 <= big, medium, small <= 1000
    carType 取值为 1， 2 或 3
    最多会调用 addCar 函数 1000 次
 */
var ParkingSystem = function(big, medium, small) {
    this.use = {
        1: {
            max: big,
            use: 0
        },
        2: {
            max: medium,
            use: 0
        },
        3: {
            max: small,
            use: 0
        }
    }
};

/** 
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function(carType) {
    let type = this.use[carType]
    if(!type) return false
    if(type.max <= type.use) return false
    type.use += 1
    return true
};

let funcs = ["addCar", "addCar", "addCar", "addCar"]
let params = [[1], [2], [3], [1]]
let result = [true, true, false, false]

const p = new ParkingSystem(1, 1, 0);
for (let i = 0; i < funcs.length; i++) {
    const func = funcs[i];
    // console.log('func ->', func)
    // console.log('params ->', ...params[i])
    // console.log('result ->', result[i])
    let res = p[func](...params[i])
    console.log(res == result[i])
    // console.log(res)
}

