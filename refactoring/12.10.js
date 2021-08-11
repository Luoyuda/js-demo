/*
 * @Author: xiaohuolong
 * @Date: 2021-08-10 22:07:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-11 08:27:53
 * @FilePath: /js-demo/refactoring/12.10.js
 */
(() => {
    class Booking{
        constructor(show, date){
            this.show = show
            this.date = date
        }
        get hasTalkBack(){
            return this.show.talkBack && !this.isPeakDay
        }
        get basePrice(){
            let result = this.show.price
            if(this.isPeakDay) result *= 1.15
            return result
        }
    }
    class PremiumBooking extends Booking{
        constructor(show, date, extra){
            super(show, date)
            this.extra = extra
        }
        get hasTalkBack(){
            return this.show.talkBack
        }
        get basePrice(){
            return super.basePrice * this.extra.fee
        }
        get hasDinner(){
            return this.extra.dinner && !this.isPeakDay
        }
    }
})();
(() => {
    class Booking{
        constructor(show, date){
            this.show = show
            this.date = date
        }
        get hasTalkBack(){
            return this._premiumDelegate ? this._premiumDelegate.hasTalkBack : this.show.talkBack && !this.isPeakDay
        }
        get basePrice(){
            let result = this.show.price
            if(this.isPeakDay) result *= 1.15
            return this._premiumDelegate ? this._premiumDelegate.extendBasePrice(result) : result
        }
        get hasDinner(){
            return this._premiumDelegate ? this._premiumDelegate.hasDinner : false
        }
        _bePremium(extra){
            this._premiumDelegate = new PremiumBookingDelegate(this, extra)
        }
    }
    class PremiumBookingDelegate{
        constructor(hostBooking, extra){
            this.host = hostBooking
            this.extra = extra
        }
        get hasTalkBack(){
            return this.host.show.talkBack
        }
        get hasDinner(){
            return this.extra.dinner && !this.host.isPeakDay
        }
        extendBasePrice(base){
            return base * this.extra.fee
        }
    }
    function createBooking(show, date){
        return new Booking(show, date)
    }
    function createPremiumBooking(show, date, extra){
        let result = new Booking(show, date)
        result._bePremium(extra)
        return result
    }
})();
(() => {
    function createBird(data){
        switch(data.type){
            case 'EuropeanSwallow': return new EuropeanSwallow(data)
            case 'AfricanSwallow': return new AfricanSwallow(data)
            case 'NorwegianBlueSwallow': return new NorwegianBlueSwallow(data)
            default: return new Bird(data)
        }
    }
    class Bird {
        constructor(data){
            this.name = data.name
            this.plumage = data.plumage || 'average'
        }
        get airSpeedVelocity(){return null}
    }
    class EuropeanSwallow extends Bird {
        get airSpeedVelocity(){return 35}
    }
    class AfricanSwallow extends Bird {
        constructor(data){
            super(data)
            this.numberOfCoconuts = data.numberOfCoconuts || 0
        }
        get airSpeedVelocity(){return 40 - 2 * this.numberOfCoconuts}
    }
    class NorwegianBlueSwallow extends Bird {
        constructor(data){
            super(data)
            this.voyage = data.voyage
            this.isNailed = data.isNailed
        }
        get plumage(){
            if(this.voyage > 100) return 'scorched'
            else return this.plumage || 'beautiful'
        }
        get airSpeedVelocity(){
            return this.isNailed ? 0 : 10 + this.voyage / 10
        }
    }
})();
(() => {
    function createBird(data){
        return new Bird(data)
    }
    class Bird {
        constructor(data){
            this.name = data.name
            this.plumage = data.plumage
            this.speciesDelegate = this.selectSpeciesDelegate(data)
        }
        get airSpeedVelocity(){return this.speciesDelegate.airSpeedVelocity }
        get plumage(){return this.speciesDelegate.plumage }
        selectSpeciesDelegate(data){
            switch(data.type){
                case 'EuropeanSwallow': return new EuropeanSwallowDelegate(data, this)
                case 'AfricanSwallow': return new AfricanSwallowDelegate(data, this)
                case 'NorwegianBlueSwallow': return new NorwegianBlueSwallowDelegate(data, this)
                default: return new SpeciesDelegate(data, this)
            }
        }
    }
    class SpeciesDelegate{
        constructor(data, bird){
            this._bird = bird
        }
        get plumage(){
            return this._bird.plumage || 'average'
        }
        get airSpeedVelocity(){
            return null
        }
    }
    class EuropeanSwallowDelegate extends SpeciesDelegate {
        constructor(data){
            super(data, this)
        }
        get airSpeedVelocity(){return 35}
    }
    class AfricanSwallowDelegate extends SpeciesDelegate {
        constructor(data){
            super(data, this)
            this.numberOfCoconuts = data.numberOfCoconuts || 0
        }
        get airSpeedVelocity(){return 40 - 2 * this.numberOfCoconuts}
    }
    class NorwegianBlueSwallowDelegate extends SpeciesDelegate {
        constructor(data){
            super(data, this)
            this.voyage = data.voyage
            this.isNailed = data.isNailed
        }
        get plumage(){
            if(this.voyage > 100) return 'scorched'
            else return this.plumage || 'beautiful'
        }
        get airSpeedVelocity(){
            return this.isNailed ? 0 : 10 + this.voyage / 10
        }
    }
})();