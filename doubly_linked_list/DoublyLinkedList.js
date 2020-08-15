import DoublyLinkedListNode from './DoublyLinkedListNode';

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  /**
   * Search
   */

  /**
   * Insert to the end of the list
   */
  insert(value) {
    const newNode = new DoublyLinkedListNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      // this.head.next = this.tail;
      // this.tail.prev = this.head;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
    return this;
  }

  insertAtIndex(index, value) {
    let curr = this.head;
    let count = 1;

    while (curr && count < index) {
      curr = curr.next;
      count += 1;
    }
    const newNode = new DoublyLinkedListNode(value, curr, curr.next);
    curr.next = newNode;
    newNode.next.prev = newNode;

    return this;
  }

  /**
   * Insert to the first of the list
   * @param {*} value
   */
  insertFirst(value) {
    const newNode = new DoublyLinkedListNode(value, null, this.head);
    if (!this.head) return this.insert(value);
    this.head.prev = newNode;
    this.head = newNode;
    this.length += 1;
    return this;
  }

  searchByValue(value) {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return curr;
      curr = curr.next;
    }
    return null;
  }

  /**
   *
   * @param {*} index
   */
  searchByIndex(index) {
    if (index > this.length) return null;
    if (index === 1) return this.head;
    if (index === this.length) return this.tail;

    const halfLeft = index <= Math.floor(this.length / 2);
    let count = halfLeft ? 1 : Math.floor(this.length / 2);
    let curr = halfLeft ? this.head : this.tail;

    while (count < index && curr) {
      count += 1;
      curr = halfLeft ? curr.next : curr.prev;
    }
    return curr;
  }

  /**
   *
   * @param {*} value
   */
  delete(value) {
    let curr = this.head;
    let nodeToDel = null;
    while (curr) {
      if (curr.value === value) {
        nodeToDel = curr;
        // Head
        if (curr === this.head) this.deleteFirst();
        else if (curr === this.tail) this.deleteLast();
        else {
          curr.next.prev = curr.prev;
          curr.prev.next = curr.next;
          this.length -= 1;
        }
      }
      curr = curr.next;
    }
    return nodeToDel;
  }

  /**
   * Delete the node at an index
   * @param {*} index
   */
  deleteAtIndex(index) {
    let count = 1;
    let curr = this.head;

    while (count < index) {
      curr = curr.next;
      count += 1;
    }

    curr.prev.next = curr.next;
    curr.next.prev = curr.prev;

    return curr;
  }

  /**
   * Delete
   */
  deleteFirst() {
    const nodeToDel = this.head;
    if (nodeToDel === this.tail) this.head = this.tail = null;
    else if (this.head) {
      this.head = this.head.next;
      this.head.prev = null;
      this.length -= 1;
    }

    return nodeToDel;
  }

  deleteLast() {
    const nodeToDel = this.tail;
    if (nodeToDel === this.head) {
      this.head = this.tail = null;
    } else if (this.head) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length -= 1;
    return nodeToDel;
  }

  reverse() {
    let curr = this.tail;
    let prev = null;
    this.head = curr;

    while (curr) {
      prev = curr.prev;
      // If curr is head, make head become tail
      if (!prev) this.tail = curr;
      curr.prev = curr.next;
      curr.next = prev;
      curr = prev;
    }

    return this.head;
  }

  /**
   * @return {DoublyLinkedListNode[]}
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

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {DoublyLinkedList}
   */
  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this;
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
}
