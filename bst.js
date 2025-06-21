import Merge from './merge.js';

const BST = (function () {

    class Node {
        constructor (data, left=null, right=null) {
            this.data = data;
            this.left = left;
            this.right = right;
        }
    }

    const Tree = function (arr) {

        const prettyPrint = (node, prefix = '', isLeft = true) => {

            if (node === null) {
                return;
            }

            if (node.right !== null) {
                prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }

            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

            if (node.left !== null) {
                prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
        };


        const createTree = function (sortedArr, start, end) {

            if (start > end) {
                return null;
            }

            const mid = start + Math.floor((end - start) / 2);
            const root = new Node(sortedArr[mid]);
            root.left = createTree(sortedArr, start, mid - 1);
            root.right = createTree(sortedArr, mid + 1, end);
            return root;
        }

        const buildTree = function (arr) {
            // sort function
            const sortedArr = Merge.mergesort(arr);
            // pass sorted array to helper function
            // that constructs BST
            const root = createTree(sortedArr, 0, sortedArr.length - 1);
            return root;
        }


        let root = buildTree(arr);

        const preOrder = function (littleRoot=root) {
            if (littleRoot == null) {
                return null;
            }

            console.log(littleRoot.data);
            preOrder(littleRoot.left);
            preOrder(littleRoot.right);
        }

        const insertNode = function (key, root) {
            if (root === null) {
                return new Node(key);
            }

            if (key === root.data) {
                return root;
            }

            if (key <= root.data) {
                root.left = insertNode(key, root.left);
            } else if (key > root.data) {
                root.right = insertNode(key, root.right);
            }

            return root;


        }

        const goLeft = function (root) {
            if (root.left.left === null) {
                const successor = root.left;
                root.left = root.left.right;
                return successor;
            } else {
                return goLeft(root.left);
            }


        }

        const getInOrderSuccessor = function (root) {
            if (root.right.left !== null) {
                const inOrderSuccessor = goLeft(root.right);
                return inOrderSuccessor;
            } else {
                const newRoot = root.right;
                root.right = root.right.right;
                return newRoot;
            }

        }


        const hasNoChild = function (root) {
            return root.left === null && root.right === null ?
                true : false;
        }

        const hasSingleChild = function (root) {
            return root.right ? root.right : root.left;
        }

        const hasBothChildren = function (root) {
            return root.left !== null && root.right !== null;
        }

        const restructure = function (root) {
            if (hasNoChild(root)) {
                return { node: null, flag: false};
            } else if (hasBothChildren(root)) {
                return { node: getInOrderSuccessor(root), flag: true };
            } else {
                return { node: hasSingleChild(root), flag: false};
            }

        }


        const delNode = function (key, root) {

            if (root === null) {
                console.log("node doesn't exist?")
                return null;
            }

            if (key < root.data) {
                root.left = delNode(key, root.left);          
            } else if (key > root.data) {
                root.right = delNode(key, root.right);
            } else if (key === root.data) {
                // determine whether the node has no children,
                // 1 child, or both children
                // execute special function that restructures
                // nodes accordingly
                const result = restructure(root);

                if (result.flag === false) {
                    root = result.node;
                } else {
                    root.data = result.node.data;
                }
            }

            return root;


        }



        return {
            root,
            buildTree,
            preOrder,
            prettyPrint,
            insertNode,
            delNode,
        }
    }

    return {
        Tree,
    }
});

export default BST;