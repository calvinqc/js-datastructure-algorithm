import LinkedListNode from './LinkedListNode';

// * Runtime:  Access	   Search	  Insertion	  Deletion
// *            O(n)	    O(n)	    O(1)	      O(n)
export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Add a node to the end of the list
   * @param {*} value
   */
  insert(value) {
    const newNode = new LinkedListNode(value);

    // If list is empty, init the first Node
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;

    return this;
  }

  /**
   * Add a node to the beginning of a list
   * @param {*} value
   */
  preInsert(value) {
    const newNode = new LinkedListNode(value, this.head);

    this.head = newNode;
    this.tail = !this.tail && newNode;
    this.length += 1;

    return this;
  }

  /**
   * Add a node to the index of a list
   * @param {*} value
   * @param {*} index
   */
  insertAtIndex(value, index) {
    const nodeAtIndex = this.searchByIndex(index);
    const newNode = new LinkedListNode(value, nodeAtIndex.next);
    nodeAtIndex.next = newNode;
    return this;
  }

  /**
   * Remove the Node at the end
   */
  deleteLast() {
    // If list is only 1 node
    const nodeToDelete = this.tail;

    if (this.length <= 1) {
      this.head = this.tail = null;
    } else {
      let curr = this.head;
      while (curr.next) {
        if (!curr.next.next) {
          curr.next = null;
          this.tail = curr;
          this.length -= 1;
          break;
        }
        curr = curr.next;
      }
    }

    return nodeToDelete;
  }

  /**
   * Remove the first Node
   */
  deleteFirst() {
    if (!this.head) return null;

    const nodeToDelete = this.head;

    // If list is only 1 node
    if (this.length <= 1) this.head = this.tail = null;
    else this.head = this.head.next;
    this.length -= 1;

    return nodeToDelete;
  }

  // Remove the first value that it found
  deleteByValue(value) {
    if (!this.head) return null;

    let curr = this.head;
    let nodeToDelete = null;

    if (curr.value === value && curr === this.tail) {
      this.head = this.tail = null;
      return curr;
    }

    while (curr && curr.next) {
      if (curr.value === value) {
        nodeToDelete = curr;
        curr = this.head = curr.next;
      } else if (curr.next.value === value) {
        nodeToDelete = curr.next;
        if (curr.next === this.tail) this.tail = curr;
        curr.next = nodeToDelete.next;

        this.length -= 1;
      } else curr = curr.next;
    }

    return nodeToDelete;
  }

  /**
   * deleteNodeAtIndex
   * Asusme index >= 1
   * @param {*} index
   */
  deleteNodeAtIndex(index) {
    // Case: index is the last | index is in the middle
    const nodeToDelete = this.searchByIndex(index);

    // Redirect pointer
    if (nodeToDelete) {
      const nodeBefore = this.searchByIndex(index - 1);
      nodeBefore.next = nodeToDelete.next;
    }
    this.length -= 1;

    return nodeToDelete;
  }

  /**
   * Reverse
   */
  reverse() {
    // 1 -> 2 -> 3 -> 4
    // prev: 1 -> null
    // currNode: 1 -> null
    // next: 2
    let nextNode = this.head;
    let currNode = null;
    let prevNode = null;

    while (nextNode) {
      currNode = new LinkedListNode(nextNode.value, prevNode);
      prevNode = currNode;
      nextNode = nextNode.next;
    }

    this.tail = this.head;
    this.head = currNode;

    return this.head;
  }

  /**
   * Search the value and return the node
   * @param {*} value
   */
  searchByValue(value) {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return curr;
      curr = curr.next;
    }

    return null;
  }

  searchByIndex(index) {
    if (index < 1) return null;

    let count = 1;
    for (let curr = this.head; !curr; curr = curr.next) {
      if (count === index) return curr;
      count += 1;
    }

    return null;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  /**
   * @return {LinkedListNode[]}
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }
}
