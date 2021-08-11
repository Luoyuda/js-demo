/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 10:13:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 10:34:08
 * @FilePath: /js-demo/refactoring/9.1.js
 */
(() => {
    function distanceTravelled(scenario, time){
        let result
        let acc = scenario.primaryForce / scenario.mass
        let primaryTime = Math.min(time, scenario.delay)
        result = 0.5 * acc * primaryTime * primaryTime
        let secondTime = time - scenario.delay
        if(secondTime > 0){
            let primaryVelocity = acc * scenario.delay
            acc = (scenario.primaryForce + scenario.secondForce) / scenario.mass
            result += primaryVelocity * secondTime + 0.5 * acc * secondTime * secondTime
        }
        return result
    }
    console.log(distanceTravelled({
        primaryForce: 100,
        secondForce: 10,
        mass: 10, 
        delay: 3
    }, 10))
})();
(() => {
    function distanceTravelled(scenario, time){
        let result
        let primaryAcceleration = scenario.primaryForce / scenario.mass
        let primaryTime = Math.min(time, scenario.delay)
        result = 0.5 * primaryAcceleration * primaryTime * primaryTime
        let secondTime = time - scenario.delay
        if(secondTime > 0){
            let primaryVelocity = primaryAcceleration * scenario.delay
            let secondaryAcceleration = (scenario.primaryForce + scenario.secondForce) / scenario.mass
            result += primaryVelocity * secondTime + 0.5 * secondaryAcceleration * secondTime * secondTime
        }
        return result
    }
    console.log(distanceTravelled({
        primaryForce: 100,
        secondForce: 10,
        mass: 10, 
        delay: 3
    }, 10))
})();