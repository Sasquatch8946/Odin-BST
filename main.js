import driver from './driver.js';
import BST from './bst.js';

const printMsg = function (msg) {
    console.log(msg);
}

const printInAllOrders = function (root) {
    console.log("PREORDER:");
    tree.preOrder(printMsg, root);
    console.log("INORDER:");
    tree.inOrder(printMsg, root);
    console.log("POSTORDER:");
    tree.postOrder(printMsg, root);
}

const d = driver();
const arr = d.createRandomArray();
const bst = BST();
const tree = bst.Tree(arr);
console.log(`Tree is balanced: ${tree.isBalanced(tree.root)}`);
printInAllOrders(tree.root);
console.log("INSERTING RANDOM NUMBERS");
for (let i = 0; i < 3; i++) {
    const rand = parseInt(d.getRandomArbitrary(100, 1000));
    console.log(`inserting ${rand}`);
    tree.insertNode(rand, tree.root);
}
console.log(`Is tree still balanced? ${tree.isBalanced(tree.root)}`);
console.log("rebalancing tree");
tree.rebalance(tree.root);
console.log(`Tree is rebalanced after calling rebalance method: ${tree.isBalanced(tree.root)}`);
printInAllOrders(tree.root);