/* global localStorage */

import uuid from 'node-uuid'

export default {
  uuid() {
    return uuid.v1()
  },
  pluralize(count, word) {
    return count === 1 ? word : `${word}s`;
  },
  store(namespace, data) {
    if (typeof window !== 'undefined') {
      if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
      }
      const store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || null;
    }
    return null;
  },
};
