/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 13:41:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 16:46:55
 * @FilePath: /js-demo/refactoring/10.4.js
 */
(() => {
    function plumages(birds){
        return new Map(birds.map(b => [b.name, b.plumage]))
    }
    function speeds(birds){
        return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]))
    }
    function plumage(bird){
        switch (bird.type){
            case 'E': return 'a'
            case 'A': return bird.counts > 2 ? 't' : 'a'
            case 'N': return bird.voltage > 100 ? 's' : 'b'
            default: return 'unknown'
        }
    }
    function airSpeedVelocity(bird){
        switch (bird.type){
            case 'E': return 35
            case 'A': return 40 - bird.counts
            case 'N': return bird.voltage / 10 + 10
            default: return null
        }
    }
    class Bird {
        constructor(name, type, counts, voltage){
            this.name = name
            this.type = type
            this.counts = counts
            this.voltage = voltage
            this.plumage = plumage(this)
        }
    }
    const birds = [new Bird('xx', 'E', 10, 100),new Bird('xy', 'A', 10, 100),new Bird('yx', 'N', 10, 100)]
    console.log(plumages(birds))
    console.log(speeds(birds))
})();
(() => {
    function plumages(birds){
        return new Map(birds.map(b => [b.name, b.plumage]))
    }
    function speeds(birds){
        return new Map(birds.map(b => [b.name, b.airSpeedVelocity]))
    }
    class Bird {
        constructor(name, type, counts, voltage){
            this.name = name
            this.type = type
            this.counts = counts
            this.voltage = voltage
        }
        get plumage(){
            return 'unknown'
        }
        get airSpeedVelocity(){
            return null
        }
    }
    class E extends Bird{
        get plumage(){
            return 'a'
        }
        get airSpeedVelocity(){
            return 35
        }
    }
    class A extends Bird{
        get plumage(){
            return this.counts > 2 ? 't' : 'a'
        }
        get airSpeedVelocity(){
            return 40 - this.counts
        }
    }
    class N extends Bird{
        get plumage(){
            this.voltage > 100 ? 's' : 'b'
        }
        get airSpeedVelocity(){
            return this.voltage / 10 + 10
        }
    }
    function createBird(...arg){
        switch (arg[1]){
            case 'E': return new E(...arg);
            case 'A': return new A(...arg);
            case 'N': return new N(...arg);
            default: return new Bird(...arg);
        }
    }
    const birds = [createBird('xx', 'E', 10, 100),createBird('xy', 'A', 10, 100),createBird('yx', 'N', 10, 100)]
    console.log(plumages(birds))
    console.log(speeds(birds))
})();
(() => {
    function rating(voyage, history){
        const vpf = voyageProfitFactor(voyage, history)
        const vr = voyageRisk(voyage)
        const chr = captainHistoryRisk(voyage, history)
        if(vpf * 3 > (vr + chr * 2)) return 'A'
        return 'B'
    }
    function voyageRisk(voyage){
        let result = 1
        if(voyage.length > 4) result += 2
        if(voyage.length > 8) result += voyage.length - 8
        if(['china', 'east-indies'].includes(voyage.zone)) result += 4
        return Math.max(result, 0)
    }
    function captainHistoryRisk(voyage, history){
        let result = 1
        if(history.length < 5) result += 4
        result += history.filter(v => v.profit < 0).length
        if(voyage.zone === 'china' && hasChina(history)) result -= 2
        return Math.max(result, 0)
    }
    function hasChina(history) {
        return history.some(v => v.zone === 'china')
    }
    function voyageProfitFactor(voyage, history){
        let result = 2
        if(voyage.zone === 'china') result += 1
        if(voyage.zone === 'east-indies') result += 1
        if(voyage.zone === 'china' && hasChina(history)){
            result += 3
            if(history.length > 10) result += 1
            if(voyage.length > 12) result += 1
            if(voyage.length > 18) result -= 1
        }else{
            if(history.length > 8) result += 1
            if(voyage.length > 14) result -= 1
        }
        return result
    }
    const voyage = { zone: 'china', length: 10 }
    const history = [
        { zone: 'east-indies', profit: 5 },
        { zone: 'west-indies', profit: 15 },
        { zone: 'china', profit: -2 },
        { zone: 'west-africa', profit: 7 }
    ]
    console.log(rating(voyage, history))
})();
(() => {
    function rating(voyage, history){
        return createRating(voyage, history).value
    }
    function createRating(voyage, history){
        if(voyage.zone === 'china' && history.some(v => v.zone === 'china')) return new ExperienceChinaRating(voyage, history)
        return new Rating(voyage, history)
    }
    class Rating {
        constructor(voyage, history){
            this.voyage = voyage
            this.history = history
        }
        get value(){
            const vpf = this.voyageProfitFactor
            const vr = this.voyageRisk
            const chr = this.captainHistoryRisk
            if(vpf * 3 > (vr + chr * 2)) return 'A'
            return 'B'
        }
        get voyageProfitFactor(){
            let result = 2
            if(this.voyage.zone === 'china') result += 1
            if(this.voyage.zone === 'east-indies') result += 1
            result += this.historyLengthFactor
            result += this.voyageLengthFactor
            return result
        }
        get voyageLengthFactor(){
            return this.voyage.length > 14 ? 1 : 0
        }
        get historyLengthFactor(){
            return this.history.length > 8 ? 1 : 0
        }
        get voyageRisk(){
            let result = 1
            if(this.voyage.length > 4) result += 2
            if(this.voyage.length > 8) result += this.voyage.length - 8
            if(['china', 'east-indies'].includes(this.voyage.zone)) result += 4
            return Math.max(result, 0)
        }
        get captainHistoryRisk(){
            let result = 1
            if(this.history.length < 5) result += 4
            result += this.history.filter(v => v.profit < 0).length
            return Math.max(result, 0)
        }
    }
    class ExperienceChinaRating extends Rating{
        get captainHistoryRisk(){
            const result = super.captainHistoryRisk - 2
            return result
        }
        get voyageProfitFactor(){
            return super.voyageProfitFactor + 3
        }
        get voyageLengthFactor(){
            let result = 0
            if(this.voyage.length > 12) result += 1
            if(this.voyage.length > 18) result -= 1
            return result
        }
        get historyLengthFactor(){
            return this.history.length > 10 ? 1 : 0
        }
    }
    const voyage = { zone: 'china', length: 10 }
    const history = [
        { zone: 'east-indies', profit: 5 },
        { zone: 'west-indies', profit: 15 },
        { zone: 'china', profit: -2 },
        { zone: 'west-africa', profit: 7 }
    ]
    console.log(rating(voyage, history))
})();