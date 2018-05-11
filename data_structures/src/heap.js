const heapsort = (arr) => {
  /* Your code here */
  function heapify(array, index, heapSize, cmp) {
    var left = 2 * index + 1;
    var right = 2 * index + 2;
    var largest = index;
    if (left < heapSize && cmp(array[left], array[index]) > 0) {
      largest = left;
    }
    if (right < heapSize && cmp(array[right], array[largest]) > 0) {
      largest = right;
    }
    if (largest !== index) {
      var temp = array[index];
      array[index] = array[largest];
      array[largest] = temp;
      heapify(array, largest, heapSize, cmp);
    }
  }
  
  function buildMaxHeap(array, cmp) {
    for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
      heapify(array, i, array.length, cmp);
    }
    return array;
  }
  return function (array, cmp) {
    cmp = cmp || comparator;
    var size = array.length;
    var temp;
    buildMaxHeap(array, cmp);
    for (var i = array.length - 1; i > 0; i -= 1) {
      temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      size -= 1;
      heapify(array, 0, size, cmp);
    }
    return array;
  };
};

class Heap {
  constructor() {
    this.storage = [null];
    this.size = 0;
  }

  insert(val) {
    const index = this.storage.push(val) - 1;
    this.size++;
    this.bubbleUp(index);
  }

  delete() {
    if (this.storage.length === 2) {
      this.size--;
      return this.storage.pop();
    } else if (this.storage.length === 1) {
      return this.storage[0];
    }
    this.size--;
    const max = this.storage[1];
    this.storage[1] = this.storage.pop();
    this.siftDown(1);
    return max;
  }

  getMax() {
    return this.storage[1];
  }

  getSize() {
    return this.size;
  }

  bubbleUp(index) {
    const parent = Math.floor(index / 2);
    if (parent > 0 && this.storage[parent] < this.storage[index]) {
      [this.storage[parent], this.storage[index]] = [this.storage[index], this.storage[parent]];
      this.bubbleUp(parent);
    }
  }

  siftDown(index) {
    const child1 = index * 2;
    const child2 = index * 2 + 1;
    let maxChild;

    if (this.storage[child1] !== undefined) {
      if (this.storage[child2] === undefined) {
        maxChild = child1;
      } else if (this.storage[child2] !== undefined) {
        maxChild = this.storage[child1] > this.storage[child2] ? child1 : child2;
      }

      if (this.storage[index] < this.storage[maxChild]) {
        [this.storage[maxChild], this.storage[index]] = [this.storage[index], this.storage[maxChild]];
        this.siftDown(maxChild);
      }
    }
  }
}

module.exports = {
  Heap,
  heapsort,
};
