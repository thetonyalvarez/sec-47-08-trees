/** TreeNode: node for a general tree. */

class TreeNode {
	constructor(val, children = []) {
		this.val = val;
		this.children = children;
	}
}

class Tree {
	constructor(root = null) {
		this.root = root;
	}

	/** sumValues(): add up all of the values in the tree. */

	sumValues() {
		// the best approach here would be to use BFS
		if (this.root == null) return 0;

		let queue = [this.root];
		let sum = 0;

		while (queue.length) {
			let curr = queue.shift();
			sum += curr.val;

			for (let child of curr.children) {
				queue.push(child);
			}
		}
		return sum;
	}

	/** countEvens(): count all of the nodes in the tree with even values. */

	countEvens() {
		if (this.root == null) return 0;
		let stack = [this.root];
		let counter = 0;

		while (stack.length) {
			let curr = stack.pop();

			if (curr.val % 2 == 0) {
				counter++;
			}
			for (let child of curr.children) {
				stack.push(child);
			}
		}

		return counter;
	}

	/** numGreater(lowerBound): return a count of the number of nodes
	 * whose value is greater than lowerBound. */

	numGreater(lowerBound) {
		if (this.root == null) return 0;

		let stack = [this.root];
		let counter = 0;

		while (stack.length) {
			let curr = stack.pop();

			if (curr.val > lowerBound) {
				counter++;
			}
			for (let child of curr.children) {
				stack.push(child);
			}
		}
		return counter;
	}
}

module.exports = { Tree, TreeNode };
