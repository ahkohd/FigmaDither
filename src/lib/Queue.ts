export class Queue<T> {
  _store: T[] = [];
  enqueue(val: T) {
    this._store.push(val);
  }
  dequeue(): T | undefined {
    return this._store.shift();
  }
  toArray(): T[] {
    return this._store;
  }
}
