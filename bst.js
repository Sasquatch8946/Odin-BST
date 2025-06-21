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



        return {
            root,
            buildTree,
            preOrder,
        }
    }

    return {
        Tree,
    }
});

export default BST;