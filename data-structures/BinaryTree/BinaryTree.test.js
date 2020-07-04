/*
 * @Author: xiaohuolong
 * @Date: 2020-07-01 23:17:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-04 15:37:50
 * @FilePath: /js-demo/data-structures/BinaryTree/BinaryTree.test.js
 */ 

const {
    createBinaryTree,
    preOrderTraversal,
    preOrderTraversalByStack,
    inOrderTraversal,
    inOrderTraversalByStack,
    ThreadedInOrderTraversal,
    postOrderTraversal,
    postOrderTraversalByStack,
    levelOrderTraversal
} = require('./BinaryTree')
const { expect } = require('chai')

describe('BinaryTree', () => {
    const treeNode = createBinaryTree([1,2,4,null,null,5,null,null,3,6,null,null,7,null,null])
    it('preOrderTraversal', () => {
        expect(preOrderTraversal(null)).to.eql([]);
        expect(preOrderTraversal(treeNode)).to.eql([1,2,4,5,3,6,7]);
        expect(preOrderTraversalByStack(null)).to.eql([]);
        expect(preOrderTraversalByStack(treeNode)).to.eql([1,2,4,5,3,6,7]);
    })
    it('inOrderTraversal', () => {
        expect(inOrderTraversal(null)).to.eql([]);
        expect(inOrderTraversal(treeNode)).to.eql([4,2,5,1,6,3,7]);
        expect(inOrderTraversalByStack(null)).to.eql([]);
        expect(inOrderTraversalByStack(treeNode)).to.eql([4,2,5,1,6,3,7]);
    })
    it('postOrderTraversal', () => {
        expect(postOrderTraversal(null)).to.eql([]);
        expect(postOrderTraversal(treeNode)).to.eql([4,5,2,6,7,3,1]);
        expect(postOrderTraversalByStack(null)).to.eql([]);
        expect(postOrderTraversalByStack(treeNode)).to.eql([4,5,2,6,7,3,1]);
    })
    it('levelOrderTraversal', () => {
        expect(levelOrderTraversal(null)).to.eql([]);
        expect(levelOrderTraversal(treeNode)).to.eql([1,2,3,4,5,6,7]);
    })
    it('ThreadedInOrderTraversal', () => {
        ThreadedInOrderTraversal(treeNode)
        expect(treeNode.leftChild.leftChild.rTag).to.eql(1);
        expect(treeNode.leftChild.leftChild.rightChild.data).to.eql(2);
        expect(treeNode.leftChild.leftChild.lTag).to.eql(1);
        expect(treeNode.leftChild.leftChild.leftChild).to.eql(null);

        expect(treeNode.leftChild.rightChild.rTag).to.eql(1);
        expect(treeNode.leftChild.rightChild.rightChild.data).to.eql(1);
        expect(treeNode.leftChild.rightChild.lTag).to.eql(1);
        expect(treeNode.leftChild.rightChild.leftChild.data).to.eql(2);

        expect(treeNode.rightChild.leftChild.rTag).to.eql(1);
        expect(treeNode.rightChild.leftChild.rightChild.data).to.eql(3);
        expect(treeNode.rightChild.leftChild.lTag).to.eql(1);
        expect(treeNode.rightChild.leftChild.leftChild.data).to.eql(1);

        expect(treeNode.rightChild.rightChild.rTag).to.eql(0);
        expect(treeNode.rightChild.rightChild.rightChild).to.eql(null);
        expect(treeNode.rightChild.rightChild.lTag).to.eql(1);
        expect(treeNode.rightChild.rightChild.leftChild.data).to.eql(3);

    })
})