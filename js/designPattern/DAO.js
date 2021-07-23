/*
 * @Author: xiaohuolong
 * @Date: 2020-08-17 21:37:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-17 22:06:08
 * @FilePath: /DesignPatterns/DAO.js
 */
const Dao = (function(prefix){
    const _data = {}
    return {
        status: {
            SUCCESS: 0,
            FAILURE: 1,
            OVERFLOW: 2,
            TIMEOUT: 3
        },
        prefix,
        getKey(key){
            return this.prefix + key
        },
        set(key, value, callback){
            const realKey = this.getKey(key)
            const { SUCCESS, FAILURE, OVERFLOW, TIMEOUT } = this.status
            let status = SUCCESS
            try {
                if(Math.random() > 0.5){
                    throw new Error('假装报错')
                }
                _data[realKey] = value
            } catch (error) {
                let random = Math.random()
                if(random < 0.3){
                    status = FAILURE
                }else if(random < 0.6){
                    status = OVERFLOW
                }else{
                    status = TIMEOUT
                }
            }
            callback(status, _data[realKey], realKey)
        },
        get(key, callback){
            const realKey = this.getKey(key)
            const { SUCCESS, FAILURE, OVERFLOW, TIMEOUT } = this.status
            let status = SUCCESS
            let data = null
            try {
                if(Math.random() > 0.5){
                    throw new Error('假装报错')
                }
                data = _data[realKey]
            } catch (error) {
                let random = Math.random()
                if(random < 0.3){
                    status = FAILURE
                }else if(random < 0.6){
                    status = OVERFLOW
                }else{
                    status = TIMEOUT
                }
            }
            callback(status, data, realKey)
        },
        remove(key, callback){
            const realKey = this.getKey(key)
            const { SUCCESS, FAILURE, OVERFLOW, TIMEOUT } = this.status
            let status = SUCCESS
            let data = _data[realKey]
            try {
                if(Math.random() > 0.5){
                    throw new Error('假装报错')
                }
                delete _data[realKey] 
            } catch (error) {
                let random = Math.random()
                if(random < 0.3){
                    status = FAILURE
                }else if(random < 0.6){
                    status = OVERFLOW
                }else{
                    status = TIMEOUT
                }
            }
            callback(status, data, realKey)
        }
    }
})('xy')

Dao.set('test', 1, (status, value, key) => {
    console.log(status)
    console.log(value)
    console.log(key)
    if(status === 0){
        Dao.get('test', (status, value, key) => {
            console.log(status)
            console.log(value)
            console.log(key)
        })
        Dao.remove('test', (status, value, key) => {
            console.log(status)
            console.log(value)
            console.log(key)
        })
    }
})