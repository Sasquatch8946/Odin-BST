import BST from './bst.js';

const test = BST();
const t = test.Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
t.insertNode(17, t.root);
t.insertNode(16, t.root);
// t.insertNode(16, t.root);
const printData = function (msg) {
    console.log(msg.data);
}

const printMsg = function (msg) {
    console.log(msg);
}

const collectNodes = function (data, arr) {
    return arr.push(data);
}

t.prettyPrint(t.root);
t.rebalance(t.root);
console.log("RESULT");
t.prettyPrint(t.root);