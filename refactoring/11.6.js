/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 22:04:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 22:14:19
 * @FilePath: /js-demo/refactoring/11.6.js
 */
(() => {
    const thermostat = {
        selectTemperature: 20
    }
    function setToHeat(){
        thermostat.selectTemperature += 10
    }
    function setToCool(){
        thermostat.selectTemperature -= 10
    }
    class HeatingPlan {
        constructor(max, min){
            this.max = max;
            this.min = min;
        }
        get targetTemperature(){
            if(thermostat.selectTemperature > this.max) return this.max
            else if(thermostat.selectTemperature < this.min) return this.min
            return thermostat.selectTemperature
        }
    }
    const heatingPlan = new HeatingPlan(30, 10);
    console.log(heatingPlan.targetTemperature)
    setToHeat()
    console.log(heatingPlan.targetTemperature)
    setToCool()
    console.log(heatingPlan.targetTemperature)
    setToCool()
    console.log(heatingPlan.targetTemperature)
    setToCool()
    console.log(heatingPlan.targetTemperature)
})();
(() => {
    const thermostat = {
        selectTemperature: 20
    }
    function setToHeat(){
        thermostat.selectTemperature += 10
    }
    function setToCool(){
        thermostat.selectTemperature -= 10
    }
    class HeatingPlan {
        constructor(max, min){
            this.max = max;
            this.min = min;
        }
        targetTemperature(selectTemperature){
            if(selectTemperature > this.max) return this.max
            else if(selectTemperature < this.min) return this.min
            return selectTemperature
        }
    }
    const heatingPlan = new HeatingPlan(30, 10);
    console.log(heatingPlan.targetTemperature(thermostat.selectTemperature));
    setToHeat()
    console.log(heatingPlan.targetTemperature(thermostat.selectTemperature));
    setToCool()
    console.log(heatingPlan.targetTemperature(thermostat.selectTemperature));
    setToCool()
    console.log(heatingPlan.targetTemperature(thermostat.selectTemperature));
    setToCool()
    console.log(heatingPlan.targetTemperature(thermostat.selectTemperature));
})();