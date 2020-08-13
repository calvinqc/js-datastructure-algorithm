import LinkedListNode from '../LinkedListNode';
import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  it('should create empty linked list', () => {
    const linkedList = new LinkedList();
    expect(linkedList.toString()).toBe('');
  });

  it('should insert node to linked list', () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.insert(1);
    linkedList.insert(2);

    expect(linkedList.toString()).toBe('1,2');
    expect(linkedList.tail.next).toBeNull();
  });

  it('should preInsert node to linked list', () => {
    const linkedList = new LinkedList();

    linkedList.preInsert(2);
    expect(linkedList.head.toString()).toBe('2');
    expect(linkedList.tail.toString()).toBe('2');

    linkedList.insert(1);
    linkedList.preInsert(3);

    expect(linkedList.toString()).toBe('3,2,1');
  });

  it('should delete node by value from linked list', () => {
    const linkedList = new LinkedList();

    expect(linkedList.deleteByValue(5)).toBeNull();

    linkedList.insert(1);
    linkedList.insert(1);
    linkedList.insert(2);
    linkedList.insert(3);
    linkedList.insert(3);
    linkedList.insert(3);
    linkedList.insert(4);
    linkedList.insert(5);

    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('5');

    const deletedNode = linkedList.deleteByValue(3);
    expect(deletedNode.value).toBe(3);
    expect(linkedList.toString()).toBe('1,1,2,4,5');

    linkedList.deleteByValue(3);
    expect(linkedList.toString()).toBe('1,1,2,4,5');

    linkedList.deleteByValue(1);
    expect(linkedList.toString()).toBe('2,4,5');

    expect(linkedList.head.toString()).toBe('2');
    expect(linkedList.tail.toString()).toBe('5');

    linkedList.deleteByValue(5);
    expect(linkedList.toString()).toBe('2,4');

    expect(linkedList.head.toString()).toBe('2');
    expect(linkedList.tail.toString()).toBe('4');

    linkedList.deleteByValue(4);
    expect(linkedList.toString()).toBe('2');

    expect(linkedList.head.toString()).toBe('2');
    expect(linkedList.tail.toString()).toBe('2');

    linkedList.deleteByValue(2);
    expect(linkedList.toString()).toBe('');
  });

  it('should delete linked list tail', () => {
    const linkedList = new LinkedList();

    linkedList.insert(1);
    linkedList.insert(2);
    linkedList.insert(3);

    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('3');

    const deletedNode1 = linkedList.deleteLast();

    expect(deletedNode1.value).toBe(3);
    expect(linkedList.toString()).toBe('1,2');
    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('2');

    const deletedNode2 = linkedList.deleteLast();

    expect(deletedNode2.value).toBe(2);
    expect(linkedList.toString()).toBe('1');
    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('1');

    const deletedNode3 = linkedList.deleteLast();

    expect(deletedNode3.value).toBe(1);
    expect(linkedList.toString()).toBe('');
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it('should delete linked list head', () => {
    const linkedList = new LinkedList();

    expect(linkedList.deleteFirst()).toBeNull();

    linkedList.insert(1);
    linkedList.insert(2);

    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('2');

    const deletedNode1 = linkedList.deleteFirst();

    expect(deletedNode1.value).toBe(1);
    expect(linkedList.toString()).toBe('2');
    expect(linkedList.head.toString()).toBe('2');
    expect(linkedList.tail.toString()).toBe('2');

    const deletedNode2 = linkedList.deleteFirst();

    expect(deletedNode2.value).toBe(2);
    expect(linkedList.toString()).toBe('');
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  // it('should be possible to store objects in the list and to print them out', () => {
  //   const linkedList = new LinkedList();

  //   const nodeValue1 = { value: 1, key: 'key1' };
  //   const nodeValue2 = { value: 2, key: 'key2' };

  //   linkedList
  //     .insert(nodeValue1)
  //     .preInsert(nodeValue2);

  //   const nodeStringifier = (value) => `${value.key}:${value.value}`;

  //   expect(linkedList.toString(nodeStringifier)).toBe('key2:2,key1:1');
  // });

  it('should search node by value', () => {
    const linkedList = new LinkedList();

    expect(linkedList.searchByValue(5)).toBeNull();

    linkedList.insert(1);
    expect(linkedList.searchByValue(1)).toBeDefined();

    linkedList.insert(2).insert(3);

    const node = linkedList.searchByValue(2);

    expect(node.value).toBe(2);
    expect(linkedList.searchByValue(5)).toBeNull();
  });

  // it('should search node by callback', () => {
  //   const linkedList = new LinkedList();

  //   linkedList
  //     .insert({ value: 1, key: 'test1' })
  //     .insert({ value: 2, key: 'test2' })
  //     .insert({ value: 3, key: 'test3' });

  //   const node = linkedList.search({ callback: (value) => value.key === 'test2' });

  //   expect(node).toBeDefined();
  //   expect(node.value.value).toBe(2);
  //   expect(node.value.key).toBe('test2');
  //   expect(linkedList.search({ callback: (value) => value.key === 'test5' })).toBeNull();
  // });

  // it('should create linked list from array', () => {
  //   const linkedList = new LinkedList();
  //   linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

  //   expect(linkedList.toString()).toBe('1,1,2,3,3,3,4,5');
  // });

  // it('should search node by means of custom compare function', () => {
  //   const comparatorFunction = (a, b) => {
  //     if (a.customValue === b.customValue) {
  //       return 0;
  //     }

  //     return a.customValue < b.customValue ? -1 : 1;
  //   };

  //   const linkedList = new LinkedList(comparatorFunction);

  //   linkedList
  //     .insert({ value: 1, customValue: 'test1' })
  //     .insert({ value: 2, customValue: 'test2' })
  //     .insert({ value: 3, customValue: 'test3' });

  //   const node = linkedList.search({
  //     value: { value: 2, customValue: 'test2' },
  //   });

  //   expect(node).toBeDefined();
  //   expect(node.value.value).toBe(2);
  //   expect(node.value.customValue).toBe('test2');
  //   expect(linkedList.search({ value: 2, customValue: 'test5' })).toBeNull();
  // });

  it('should reverse linked list', () => {
    const linkedList = new LinkedList();

    // Add test values to linked list.
    linkedList.insert(1).insert(2).insert(3);

    expect(linkedList.toString()).toBe('1,2,3');
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.tail.value).toBe(3);

    // Reverse linked list.
    linkedList.reverse();
    expect(linkedList.toString()).toBe('3,2,1');
    expect(linkedList.head.value).toBe(3);
    expect(linkedList.tail.value).toBe(1);

    // Reverse linked list back to initial state.
    linkedList.reverse();
    expect(linkedList.toString()).toBe('1,2,3');
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.tail.value).toBe(3);
  });
});

/**
 * !LINKED LIST NODE
 */
describe('LinkedListNode', () => {
  it('should create list node with value', () => {
    const node = new LinkedListNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });

  it('should create list node with object as a value', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedListNode(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe('test');
    expect(node.next).toBeNull();
  });

  it('should link nodes together', () => {
    const node2 = new LinkedListNode(2);
    const node1 = new LinkedListNode(1, node2);

    expect(node1.next).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node1.value).toBe(1);
    expect(node1.next.value).toBe(2);
  });

  it('should convert node to string', () => {
    const node = new LinkedListNode(1);

    expect(node.toString()).toBe('1');

    node.value = 'string value';
    expect(node.toString()).toBe('string value');
  });

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedListNode(nodeValue);
    const toStringCallback = (value) =>
      `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe('value: 1, key: test');
  });
});
