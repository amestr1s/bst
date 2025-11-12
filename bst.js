class node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class tree {
    constructor(array = []) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        array.sort((a, b) => a - b);
        let uniq = a => [...new Set(a)];
        let cleanArray = uniq(array);

        if (cleanArray.length === 0) {
            return null;
        }

        let mid = Math.floor((cleanArray.length - 1) / 2);
        let root = new node(cleanArray[mid]);

        let leftHalf = cleanArray.slice(0, mid);
        let rightHalf = cleanArray.slice((mid + 1), cleanArray.length);

        root.left = this.buildTree(leftHalf);
        root.right = this.buildTree(rightHalf);

        return root;

    }

    insert(value) {
        let newNode = new node(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        } else {
            let current = this.root;

            while (true) {
                if (value < current.value) {
                    if (current.left === null) {
                        current.left = newNode;
                        return;
                    } else {
                        current = current.left;
                    }
                } else if (value > current.value) {
                    if (current.right === null) {
                        current.right = newNode;
                        return;
                    } else {
                        current = current.right;
                    }
                } else {
                    return;
                }
            }
        }
    }

    deleteItem(value) {
        let current = this.root;
        let parent = null;

        while (current !== null){
            if (value < current.value) {
                parent = current;
                current = current.left;
            } else if (value > current.value) {
                parent = current;
                current = current.right;
            } else {
                break;
            }
        }
        if (current === null) {
            return;
        }
        if (current.left === null && current.right === null) {
            if (parent === null) {
                this.root = null;
            } else {
                if (current === parent.left) {
                    parent.left = null;
                } else {
                    parent.right = null;
                }
            }
            return;
        } else if (current.left === null) {
            if (parent === null) {
                this.root = current.right;
            } else {
                if (current === parent.left) {
                    parent.left = current.right;
                } else {
                    parent.right = current.right;
                }
            }
            return;
        } else if (current.right === null) {
            if (parent === null) {
                this.root = current.left;
            } else {
                if (current === parent.right) {
                    parent.right = current.left;
                } else {
                    parent.left = current.left;
                }
            }
            return;
        } else {
            let rightCurrent = current.right;
            while (rightCurrent.left !== null) {
                rightCurrent = rightCurrent.left;
            }
            current.value = rightCurrent.value;
            this.deleteItem(rightCurrent.value);
        }
    }

    find(value) {
        if (this.root === null) {
            return null;
        } else {
            let current = this.root;

            while (current !== null){
                if (value < current.value) {
                current = current.left;
                } else if (value > current.value) {
                current = current.right;
                } else {
                break;
                }
            }
            return current;
        }
    }

    levelOrderForEach(callback) {
        if (!callback) {
            throw new Error("You must use a callback function");
        }

        if (this.root === null) {
            return null;
        }

        let queue = [];
        queue.push(this.root);

        while (queue.length !== 0) {
            let currentNode = queue.shift();
            callback(currentNode);
            if (currentNode.left) {
                queue.push(currentNode.left);
            } 
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    }

    _inOrderTraversal(node, callback) {
        if (node === null) {
            return;
        }

        this._inOrderTraversal(node.left, callback);
        callback(node);
        this._inOrderTraversal(node.right, callback);

    }

    inOrderForEach(callback) {
        if (!callback) {
            throw new Error("You must use a callback function");
        }

        if (this.root === null) {
            return null;
        }

        this._inOrderTraversal(this.root, callback);
    }

    _preOrderTraversal(node, callback) {
        if (node === null) {
            return;
        }

        callback(node);
        this._preOrderTraversal(node.left, callback);
        this._preOrderTraversal(node.right, callback);

    }

    preOrderForEach(callback) {
        if (!callback) {
            throw new Error("You must use a callback function");
        }

        if (this.root === null) {
            return null;
        }

        this._preOrderTraversal(this.root, callback);
    }

    _postOrderTraversal(node, callback) {
        if (node === null) {
            return;
        }

        this._postOrderTraversal(node.left, callback);
        this._postOrderTraversal(node.right, callback);
        callback(node);

    }

    postOrderForEach(callback) {
        if (!callback) {
            throw new Error("You must use a callback function");
        }

        if (this.root === null) {
            return null;
        }

        this._postOrderTraversal(this.root, callback);
    }

    depth(value) {
        if (this.root === null) {
            return null;
        } else {
            let current = this.root;
            let depth = 0;

            while (current !== null){
                if (value < current.value) {
                depth++;
                current = current.left;
                } else if (value > current.value) {
                depth++;
                current = current.right;
                } else {
                break;
                }
            }
            if (current === null) {
                return null;
            } else {
                return depth;
            }
        }
    }

    _getHeight(node) {
        if (node === null) {
            return -1;
        }
        let leftHeight = this._getHeight(node.left);
        let rightHeight = this._getHeight(node.right);
        let taller = Math.max(leftHeight, rightHeight);
        return 1 + taller;
    }

    height(value) {
        let startingNode = this.find(value);

        if (startingNode === null) {
            return null;
        } else {
            return this._getHeight(startingNode);
        }
    }

    _checkBalance(node) {
        if (node === null) {
            return true;
        }
        let leftHeight = this._getHeight(node.left);
        let rightHeight = this._getHeight(node.right);
        let balance = Math.abs(leftHeight - rightHeight);
        if (balance > 1) {
            return false;
        } else {
            if ((this._checkBalance(node.left) === true) && (this._checkBalance(node.right) === true)) {
                return true;
            } else {
                return false;
            }
        }
    }

    isBalanced() {
        if (this.root === null) {
            return true;
        } else {
            return this._checkBalance(this.root);
        }
    }

    rebalance() {
        
        let sortedValues = [];
        this.inOrderForEach(node => sortedValues.push(node.value));
        this.root = this.buildTree(sortedValues);
    }
}