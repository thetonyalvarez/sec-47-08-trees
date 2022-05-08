/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinaryTree {
	constructor(root = null) {
		this.root = root;
	}

	/** minDepth(): return the minimum depth of the tree -- that is,
	 * the length of the shortest path from the root to a leaf. */

	minDepth() {
		if (this.root == null) return 0;

		function _minDepth(curr) {
			if (curr.left == null && curr.right == null) return 1;
			if (curr.left == null) return _minDepth(curr.right) + 1;
			if (curr.right == null) return _minDepth(curr.left) + 1;
			return Math.min(_minDepth(curr.left), _minDepth(curr.right)) + 1;
		}

		return _minDepth(this.root);
	}

	/** maxDepth(): return the maximum depth of the tree -- that is,
	 * the length of the longest path from the root to a leaf. */

	maxDepth() {
		if (this.root == null) return 0;

		function _maxDepth(curr) {
			if (curr.left == null && curr.right == null) return 1;
			if (curr.left == null) return _maxDepth(curr.right) + 1;
			if (curr.right == null) return _maxDepth(curr.left) + 1;
			return Math.max(_maxDepth(curr.left), _maxDepth(curr.right)) + 1;
		}

		return _maxDepth(this.root);
	}

	/** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
	 * The path doesn't need to start at the root, but you can't visit a node more than once. */

	maxSum() {
		if (this.root == null) return 0;
		let result = 0;

		function _maxSum(curr) {
			// if curr node is null, return 0 because we are recursing for int
			if (curr == null) return 0;

			// traverse down left side per node
			let left = _maxSum(curr.left);
			// traverse down right side per node
			let right = _maxSum(curr.right);

			// sum the result of the node + its max branches
			let subTreeSum = curr.val + left + right;

			// update the global result var with max value
			result = Math.max(result, subTreeSum);

			// return the higher value of the children to the parent function
			return Math.max(0, curr.val + left, curr.val + right);
		}

		_maxSum(this.root);
		return result;
	}

	/** nextLarger(lowerBound): return the smallest value in the tree
	 * which is larger than lowerBound. Return null if no such value exists. */

	nextLarger(lowerBound) {
		let result = null;
		let queue = [this.root];

		while (queue.length) {
			let curr = queue.shift();
			if (curr == null) return null;

			if (
				(result == null && curr.val > lowerBound) ||
				(curr.val > lowerBound && curr.val < result)
			) {
				result = curr.val;
			}

			if (curr.left != null) {
				queue.push(curr.left);
			}

			if (curr.right != null) {
				queue.push(curr.right);
			}
		}

		return result;
	}

	/** Further study!
	 * areCousins(node1, node2): determine whether two nodes are cousins
	 * (i.e. are at the same level but have different parents. ) */

	areCousins(node1, node2) {
		let nodeList = [this.root];

		function _findParent(node) {
			let queue = [...nodeList];

			// start at top level and DFS
			while (queue.length) {
				let curr = queue.shift();
				if (curr == null) return;

				if (curr.left == node || curr.right == node) {
					return curr;
				}

				queue.push(curr.left);
				queue.push(curr.right);
			}
		}

		function _findLevel(node, currNode = nodeList, levelCounter = 1) {
			// start at top level

			if (currNode == node) {
				return levelCounter;
			}

			if (currNode == null) return;

			if (currNode.left == null || currNode.right == null) {
				levelCounter--;
				return;
			}
			if (currNode.right) {
				currNode = currNode.right;
				levelCounter++;
				_findLevel(node, currNode);
			}
			if (currNode.left) {
				currNode = currNode.left;
				levelCounter++;
				_findLevel(node, currNode);
			}
			return levelCounter;
		}

		// mst evaluate to true
		let sameLevel = _findLevel(node1) === _findLevel(node2);
		// must evaluate to true
		let diffParents = _findParent(node1) !== _findParent(node2);

		if (sameLevel && diffParents) {
			return true;
		}
		return false;
	}

	/** Further study!
	 * serialize(tree): serialize the BinaryTree object tree into a string. */

	static serialize() {}

	/** Further study!
	 * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

	static deserialize() {}

	/** Further study!
	 * lowestCommonAncestor(node1, node2): find the lowest common ancestor
	 * of two nodes in a binary tree. */

	lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
