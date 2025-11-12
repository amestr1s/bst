import { tree } from "./bst.js";

function createRandomArray(size, max) {
    let array = [];

    while (array.length < size) {
        let num = Math.floor(Math.random() * max);
        array.push(num);
    }
    return array;
}

const array = createRandomArray(15, 100);

const testTree = new tree(array);

console.log(`Is the tree balanced?: ${testTree.isBalanced()}`)

let levelOrderArray = [];

testTree.levelOrderForEach(node => levelOrderArray.push(node.value));

console.log(`Level Order: ${levelOrderArray}`);

let inOrderArray = [];

testTree.inOrderForEach(node => inOrderArray.push(node.value));

console.log(`In Order: ${inOrderArray}`);

let preOrderArray = [];

testTree.preOrderForEach(node => preOrderArray.push(node.value));

console.log(`Pre Order: ${preOrderArray}`);

let postOrderArray = [];

testTree.postOrderForEach(node => postOrderArray.push(node.value));

console.log(`Post Order: ${postOrderArray}`);

function unbalance(size, max) {
    let i = 0;
    while (i < size) {
        let num = 100 + (Math.random() * max);
        testTree.insert(num);
        i++;
    }
}

unbalance(5, 5);

console.log(`Is the tree balanced?: ${testTree.isBalanced()}`)

testTree.rebalance();

console.log(`Is the tree balanced?: ${testTree.isBalanced()}`)

levelOrderArray = [];

testTree.levelOrderForEach(node => levelOrderArray.push(node.value));

console.log(`Level Order: ${levelOrderArray}`);

inOrderArray = [];

testTree.inOrderForEach(node => inOrderArray.push(node.value));

console.log(`In Order: ${inOrderArray}`);

preOrderArray = [];

testTree.preOrderForEach(node => preOrderArray.push(node.value));

console.log(`Pre Order: ${preOrderArray}`);

postOrderArray = [];

testTree.postOrderForEach(node => postOrderArray.push(node.value));

console.log(`Post Order: ${postOrderArray}`);