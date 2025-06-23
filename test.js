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
t.prettyPrint(t.root);
console.log(t.isBalanced(t.root));