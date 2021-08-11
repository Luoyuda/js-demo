/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 19:22:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 19:45:59
 * @FilePath: /js-demo/refactoring/8.1.js
 */
(() => {
    function trackSummary(points){
        const totalTime = calculateTime()
        const totalDistance = calculateDistance()
        const pace = totalTime / 60 / totalDistance
        return {
            time: totalTime,
            distance: totalDistance,
            pace
        }
        function calculateDistance(){
            let result = 0
            for(let i = 1; i < points.length; i++){
                result += distance(points[i - 1], points[i])
            }
            return result
        }
        function distance(p1, p2){
            const EARTH_RADIUS = 3959
            const dLat = radians(p2.lat) - radians(p1.lat)
            const dLon = radians(p2.lon) - radians(p1.lon)
            const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(radians(p2.lat)) * Math.cos(radians(p1.lat)) * Math.pow(Math.sin(dLon / 2), 2)
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            return EARTH_RADIUS * c
        }
        function radians(degrees){
            return degrees * Math.PI / 180
        }
        function calculateTime(){
            return 6
        }
    }
    const points = [
        {
            lat: 10,
            lon: 20
        },
        {
            lat: 30,
            lon: 40
        },
        {
            lat: 50,
            lon: 600
        },
        {
            lat: 500,
            lon: 800
        }
    ]
    console.log(trackSummary(points))
})();
(() => {
    function trackSummary(points){
        const totalTime = calculateTime()
        const distance = totalDistance(points)
        const pace = totalTime / 60 / distance
        return {
            time: totalTime,
            distance,
            pace
        }
        function calculateTime(){
            return 6
        }
    }
    function totalDistance(points){
        let result = 0
        for(let i = 1; i < points.length; i++){
            result += distance(points[i - 1], points[i])
        }
        return result
    }
    function distance(p1, p2){
        const EARTH_RADIUS = 3959
        const dLat = radians(p2.lat) - radians(p1.lat)
        const dLon = radians(p2.lon) - radians(p1.lon)
        const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(radians(p2.lat)) * Math.cos(radians(p1.lat)) * Math.pow(Math.sin(dLon / 2), 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return EARTH_RADIUS * c
    }
    function radians(degrees){
        return degrees * Math.PI / 180
    }
    const points = [
        {
            lat: 10,
            lon: 20
        },
        {
            lat: 30,
            lon: 40
        },
        {
            lat: 50,
            lon: 600
        },
        {
            lat: 500,
            lon: 800
        }
    ]
    console.log(trackSummary(points))
})();