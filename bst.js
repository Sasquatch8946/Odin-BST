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


        const preOrder = function (root) {
            if (root == null) {
                return null;
            }

            console.log(root.data);
            preOrder(root.left);
            preOrder(root.right);
        }

        const createTree = function (sortedArr, start, end) {

            if (start > end) {
                return null;
            }

            const mid = Math.floor((end - start) / 2);
            const root = new Node(arr[mid]);
            root.left = createTree(sortedArr, 0, mid - 1);
            root.right = createTree(sortedArr, mid + 1, end);
            return root;
        }

        const buildTree = function (arr) {
            // sort function
            const sortedArr = Merge.mergesort(arr);
            // pass sorted array to helper function
            // that constructs BST
            const root = createTree(sortedArr, 0, sortedArr.length - 1);
            preOrder(root);
        }


        this.root = buildTree(arr);

        return {
            root,
            buildTree,
        }
    }

    return {
        Tree,
    }
});

export default BST;