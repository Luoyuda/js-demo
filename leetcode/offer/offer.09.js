var CQueue = function() {
    this.in = []
    this.out = []
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.in.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(!this.out.length){
        while(this.in.length){
            this.out.push(this.in.pop())
        }
    }
    return this.out.length ? this.out.pop() : -1
};