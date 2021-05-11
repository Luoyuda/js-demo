/*
 * @Author: xiaohuolong
 * @Date: 2021-05-06 11:33:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-09 17:30:01
 * @FilePath: /js-demo/algorithm/BinarySearch/tpl.js
 */
/* 
模板 #1 
    是二分查找的最基础和最基本的形式。这是一个标准的二分查找模板，
    大多数高中或大学会在他们第一次教学生计算机科学时使用。
    用于查找可以通过访问数组中的单个索引来确定的元素或条件。
关键属性
    二分查找的最基础和最基本的形式。
    查找条件可以在不与元素的两侧进行比较的情况下确定（或使用它周围的特定元素）。
    不需要后处理，因为每一步中，你都在检查是否找到了元素。如果到达末尾，则知道未找到该元素。
区分语法
    初始条件：left = 0, right = length-1
    终止：left > right
    向左查找：right = mid-1
    向右查找：left = mid+1
*/
/**
 * 模版1
 * @param {[]number} nums 
 * @param {number} target 
 * @returns 
 */
var binarySearch = (nums, target) => {
    if(!nums || !nums.length) return -1
    let left = 0
    let right = nums.length - 1
    while(left <= right){
      // Prevent (left + right) overflow
        let mid = left + Math.floor((right - left) / 2)
        if(nums[mid] == target) return mid
        else if(nums[mid] < target) left = mid + 1
        else right = mid - 1
    }
    // End Condition: left > right
    return -1
}
/*
模板 #2 
    是二分查找的高级模板。它用于查找需要访问数组中当前索引及其直接右邻居索引的元素或条件。
关键属性
    一种实现二分查找的高级方法。
    查找条件需要访问元素的直接右邻居。
    使用元素的右邻居来确定是否满足条件，并决定是向左还是向右。
    保证查找空间在每一步中至少有 2 个元素。
    需要进行后处理。 当你剩下 1 个元素时，循环 / 递归结束。 需要评估剩余元素是否符合条件。
区分语法
    初始条件：left = 0, right = length
    终止：left == right
    向左查找：right = mid
    向右查找：left = mid+1
*/
/**
 * 模版2
 * @param {[]number} nums 
 * @param {number} target 
 * @returns 
 */
var binarySearch = (nums, target) => {
    if(!nums || !nums.length) return -1
    let left = 0
    let right = nums.length
    while(left < right){
      // Prevent (left + right) overflow
        let mid = left + Math.floor((right - left) / 2)
        if(nums[mid] == target) return mid
        else if(nums[mid] < target) left = mid + 1
        else right = mid
    }
    // Post-processing:
    // End Condition: left == right
    if(left != nums.length && nums[left] == target) return left
    return -1
}
/*
模板 #3 
    是二分查找的另一种独特形式。 它用于搜索需要访问当前索引及其在数组中的直接左右邻居索引的元素或条件。
关键属性
    实现二分查找的另一种方法。
    搜索条件需要访问元素的直接左右邻居。
    使用元素的邻居来确定它是向右还是向左。
    保证查找空间在每个步骤中至少有 3 个元素。
    需要进行后处理。 当剩下 2 个元素时，循环 / 递归结束。 需要评估其余元素是否符合条件。
区分语法
    初始条件：left = 0, right = length-1
    终止：left + 1 == right
    向左查找：right = mid
    向右查找：left = mid
*/
/**
 * 模版3
 * @param {[]number} nums 
 * @param {number} target 
 * @returns 
 */
var binarySearch = (nums, target) => {
    if(!nums || !nums.length) return -1
    let left = 0
    let right = nums.length
    while(left + 1 < right){
      // Prevent (left + right) overflow
        let mid = left + Math.floor((right - left) / 2)
        if(nums[mid] == target) return mid
        else if(nums[mid] < target) left = mid + 1
        else right = mid
    }
    // Post-processing:
    // End Condition: left == right
    if(nums[left] == target) return left
    if(nums[right] == target) return right
    return -1
}

/*
二分解题步骤
1. 二分边界
2. 使用哪个模板
3. 判断条件
4. 返回边界
*/

/**
 * yxc模版1
 * @param {[]number} nums 
 * @param {number} target 
 * @returns 
 */
var binarySearch = (nums, target) => {
    let l = 0
    let r = nums.length - 1
    while(l < r){
        let m = l + Math.floor((r - l) / 2)
        if(nums[m] >= target) r = m
        else l = m + 1
    }
    return nums[l] == target ? l : -1
}

/**
 * yxc模版2
 * @param {[]number} nums 
 * @param {number} target 
 * @returns 
 */
var binarySearch = (nums, target) => {
    let l = 0
    let r = nums.length - 1
    while(l < r){
        // 需要向上取整
        let m = l + Math.floor((r - l + 1) / 2)
        if(nums[m] <= target) l = m
        else r = m - 1
    }
    return nums[l] == target ? l : -1
}


console.log(binarySearch([0,1,2,3,4,5,6,7,8,9,10], 11))