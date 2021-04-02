/*
 * @Author: xiaohuolong
 * @Date: 2020-07-12 16:01:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-02 19:00:10
 * @FilePath: /js-demo/leetcode/面试金典/17.14.js
 */ 

const { Heap } = require('../../data-structures/Heap/Heap.js')

class MaxHeap extends Heap {
    constructor(list, max){
        super(list, max, 'max')
    }
    max(a, b){
        return a > b
    }
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
    const heap = new MaxHeap(arr, k)
    console.log(heap)
    const res = []
    while (heap.heapList.length){
        res.push(heap.heapPop())
    }
    return res
};

console.log(smallestK([1,3,5,7,2,4,6,8], 4))

let partition = (arr, p, q) => {
    let x = arr[p]
    let i = p
    let j = p + 1
    for (j; j <= q; j++) {
        if(arr[j] < x){
            let temp = arr[++i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    let temp = arr[i]
    arr[i] = x
    arr[p] = temp
    return i
}

let helper = (nums, p, q, k) => {
    if(p < q){
        const pos = partition(nums, p, q)
        let num = pos - p + 1;
        console.log(nums)
        if(k == num){
            return
        }else if(k < num){
            helper(nums, p, pos - 1, k)
        }else{
            helper(nums, pos + 1, q, k - num)
        }
    }
}

var kthLargest = function(nums, k){
    helper(nums, 0, nums.length - 1, k)
    return nums.slice(0, k)
}
let a = [1,3,5,7,2,4,6,8]
// [1,2,3,4,5,6,7,8,9]
console.log(kthLargest(a, 2, 0, a.length - 1))
// 1,2,3,4



// class Solution {
//     int partition(vector<int>& nums, int l, int r) {
//         int pivot = nums[r];
//         int i = l - 1;
//         for (int j = l; j <= r - 1; ++j) {
//             if (nums[j] <= pivot) {
//                 i = i + 1;
//                 swap(nums[i], nums[j]);
//             }
//         }
//         swap(nums[i + 1], nums[r]);
//         return i + 1;
//     }

//     // 基于随机的划分
//     int randomized_partition(vector<int>& nums, int l, int r) {
//         int i = rand() % (r - l + 1) + l;
//         swap(nums[r], nums[i]);
//         return partition(nums, l, r);
//     }

//     void randomized_selected(vector<int>& arr, int l, int r, int k) {
//         if (l >= r) {
//             return;
//         }
//         int pos = randomized_partition(arr, l, r);
//         int num = pos - l + 1;
//         if (k == num) {
//             return;
//         } else if (k < num) {
//             randomized_selected(arr, l, pos - 1, k);
//         } else {
//             randomized_selected(arr, pos + 1, r, k - num);
//         }
//     }

// public:
//     vector<int> smallestK(vector<int>& arr, int k) {
//         srand((unsigned)time(NULL));
//         randomized_selected(arr, 0, (int)arr.size() - 1, k);
//         vector<int> vec;
//         for (int i = 0; i < k; ++i) {
//             vec.push_back(arr[i]);
//         }
//         return vec;
//     }
// };