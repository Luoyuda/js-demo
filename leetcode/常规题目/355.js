/*
 * @Author: xiaohuolong
 * @Date: 2020-07-09 22:21:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-10 13:07:47
 * @FilePath: /js-demo/leetcode/355.js
 */ 

const { Heap } = require('../data-structures/Heap/Heap.js')

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
    min(a={}, b={}){
        return a.createTime <= b.createTime
    }
}

const node = (data, next=null) => {
    return {
        data,
        next
    }
}

class Twitter {
    constructor(){
        this.user = {}
        this.createTime = 10
    }
    // 创建用户
    createUser(userId){
        return {
            userId,
            twitter: null,
            follow: []
        }
    }
    // 获取用户
    getUser(userId){
        let user = this.user[userId]
        if(!user) {
            user = this.createUser(userId)
            this.user[userId] = user
        }
        return user
    }
    /**
     * Follower unfollows a followee. If the operation is invalid, it should be a no-op. 
     * @param {number} followerId 
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId){
        const follower = this.getUser(followerId)
        const followee = this.getUser(followeeId)
        follower.follow = follower.follow.filter(item => item != followeeId)
    }
    /**
     * Follower follows a followee. If the operation is invalid, it should be a no-op. 
     * @param {number} followerId 
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId){
        const follower = this.getUser(followerId)
        const followee = this.getUser(followeeId)
        if(followerId == followeeId) return
        if(follower.follow.indexOf(followeeId) > -1) return
        follower.follow.push(followeeId)
    }
    /**
     * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. 
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId){
        const user = this.getUser(userId)
        const { follow, twitter } = user
        const res = []
        const heap = new MinHeap([], 10)
        let curr = twitter
        while(curr != null){
            heap.heapPush(curr.data)
            curr = curr.next
        }
        for (let index = 0; index < follow.length; index++) {
            const user = this.getUser(follow[index]);
            let curr = user.twitter
            while(curr != null){
                heap.heapPush(curr.data)
                curr = curr.next
            }
        }
        while(heap.heapList.length){
            res.push(heap.heapPop().tweetId)
        }
        return res.reverse()
    }
    /**
     * Compose a new tweet. 
     * @param {number} userId 
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId){
        const user = this.getUser(userId)
        const data = {
            tweetId,
            createTime: ++this.createTime
        }
        user.twitter = node(data, user.twitter)
    }
}

const twitter = new Twitter()
const u1 = 1;
const u2 = 2;
// twitter.postTweet(u1,1)
// twitter.postTweet(u1,3)
// console.log(twitter.getNewsFeed(u1))
// twitter.postTweet(u2,2)
// setTimeout(() => {
//     twitter.postTweet(u1,3)
//     console.log(twitter.getNewsFeed(u1))
//     twitter.postTweet(u2,4)
//     twitter.follow(u1,u2)
//     console.log(twitter.getNewsFeed(u1))
//     twitter.unfollow(u1,u2)
//     console.log(twitter.user['1'].twitter)
// },1000)

let test = ["postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","getNewsFeed"]
let testArg = [[1,5],[1,3],[1,101],[1,13],[1,10],[1,2],[1,94],[1,505],[1,333],[1,22],[1,11],[1]]

test.map((item, index) => {
    console.log(twitter[item](...testArg[index]))
})

console.log(twitter)