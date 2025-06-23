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

        const preOrder = function (callback, root) {
            if (root == null) {
                return null;
            }

            if (!callback) {
                throw new Error("need to supply callback");
            }

            callback(root.data);
            preOrder(callback, root.left);
            preOrder(callback, root.right);
        }

        const inOrder = function (callback, root, arr=[]) {
            if (root === null) {
                return null;
            }

            if (!callback) {
                throw new Error("need to supply callback");
            }

            inOrder(callback, root.left, arr);
            callback(root.data, arr);
            inOrder(callback, root.right, arr);

            if (arr.length > 0) {
                return arr;
            } else {
                return null;
            }
        }

        const collectNodes = function (data, arr) {
            return arr.push(data);
        }

        const findHeight = function (root, steps = 0) {
            if (root === null) {
                return null;
            }

            if (root.left === null && root.right === null) {
                return steps;
            }

            steps = steps + 1;
            const stepsLeft = findHeight(root.left, steps);
            const stepsRight = findHeight(root.right, steps);
            if (stepsLeft !== undefined && stepsLeft > stepsRight) {
                return stepsLeft;
            } else if (stepsRight !== undefined && stepsRight > stepsLeft) {
                return stepsRight;
            } else if (stepsLeft !== undefined) {
                return stepsLeft;
            }
        }

        const height = function (key, root) {
            const newRoot = find(key, root);
            const height = findHeight(newRoot);
            return height;
        }

        const postOrder = function (callback, root) {
            if (root === null) {
                return null;
            }

            if (!callback) {
                throw new Error("need to supply callback");
            }

            postOrder(callback, root.left);
            postOrder(callback, root.right);
            callback(root.data);
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

        const find = function (key, root, searchResult=null) {

            if (root === null) {
                return null;
            }

            if (key < root.data) {
                const foundInLeft = find(key, root.left, searchResult);
                if (foundInLeft !== null) {
                    return foundInLeft;
                }
            } else if (key > root.data) {
                const foundInRight = find(key, root.right, searchResult);
                if (foundInRight !== null) {
                    return foundInRight;
                }
            } else {
                searchResult = root;
            }

            return searchResult;


        }

        const depth = function (key, root, searchResult=null, steps=0) {

            if (root === null) {
                return null;
            }


            if (key < root.data) {
                steps = steps + 1;
                const foundInLeft = depth(key, root.left, searchResult, steps);
                if (foundInLeft !== null) {
                    return foundInLeft;
                }
            } else if (key > root.data) {
                steps = steps + 1;
                const foundInRight = depth(key, root.right, searchResult, steps);
                if (foundInRight !== null) {
                    return foundInRight;
                }
            } else {
                return steps;
            }

            return null;
        }


        const levelOrder = function (callback, root) {
            if (root === null) {
                return null;
            }

            if (!callback) {
                throw new Error("need to supply callback");
            }

            let q = [root];
            let cur;

            while (q.length > 0) {
                cur = q[0];
                callback(cur);
                if (cur.left !== null) {
                    q.push(cur.left);
                }

                if (cur.right !== null) {
                    q.push(cur.right);
                }                

                q.shift();

            }
        }

        //TODO: test this
        const levelOrderRecurs = function (callback, root, queue=[]) {
            if (root == null) {
                return;
            }

            if (!callback) {
                throw new Error("need to supply callback");
            }

            let q = queue.length > 0 ? queue : [root];

            let cur;

            if (q.length <= 0) {
                return;
            } else {
                cur = q[0];
                callback(cur);
                if (cur.left !== null) {
                    q.push(cur.left);
                }

                if (cur.right !== null) {
                    q.push(cur.right);
                }                

                q.shift();

                levelOrderRecurs(callback, q[0], q);

            }

        }

        const isDifferenceInRange = function (diff) {
            if (diff >= 0 && diff <= 1) {
                return true;
            } else {
                return false;
            }

        }

        const isSubTreeBalanced = function (subtree) {
            // if subtree left or right is null, then?
            // consider null to be 0 height?
            let heightLeftSubTree;
            let heightRightSubTree;

            if (subtree === null) {
                return true;
            }

            if (subtree.left === null) {
                heightLeftSubTree = 0;
            } else {
                heightLeftSubTree = height(subtree.left.data, subtree.left);
            }
            
            if (subtree.right === null) {
                heightRightSubTree = 0;
            } else {
                heightRightSubTree = height(subtree.right.data, subtree.right);
            }

            if (heightLeftSubTree >= heightRightSubTree) {
                const diff = heightLeftSubTree - heightRightSubTree;
                return isDifferenceInRange(diff);
            } else {
                const diff = heightRightSubTree - heightLeftSubTree;
                return isDifferenceInRange(diff);
            }
        }

       
        const isBalanced = function (root) {
            if (root === null) {
                return;
            }             
            isBalanced(root.left);
            isBalanced(root.right);
            const l = isSubTreeBalanced(root.left);
            const r = isSubTreeBalanced(root.right);
            if (l === true && r === true) {
                return true;
            } else {
                return false;
            }
            

        }

        const rebalance = function (root) {
            const sortedArr = inOrder(collectNodes, root);
            const newTree = buildTree(sortedArr);
            this.root = newTree;
            return this.root;
        }


        return {
            root,
            buildTree,
            preOrder,
            prettyPrint,
            insertNode,
            delNode,
            find,
            levelOrder,
            levelOrderRecurs,
            inOrder,
            postOrder,
            height,
            depth,
            isBalanced,
            rebalance,

        }
    }

    return {
        Tree,
    }
});

export default BST;