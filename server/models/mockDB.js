// In-memory mock database for testing without MongoDB
// This is for development/testing only

const mockDB = {
  users: [],
  activities: [],
};

// Simple ObjectId mock for compatibility
export class MockObjectId {
  constructor(value) {
    this.value = value || Math.random().toString(36).substr(2, 9);
  }

  toString() {
    return this.value;
  }

  toHexString() {
    return this.value;
  }

  static createFromHexString(hex) {
    return new MockObjectId(hex);
  }

  static isValid(id) {
    return !!id;
  }

  equals(other) {
    return this.value === other?.value || this.value === other?.toString();
  }
}

// Mock collection interface
class MockCollection {
  constructor(data, collectionName) {
    this.data = data;
    this.collectionName = collectionName;
  }

  _isObjectId(val) {
    return val && (typeof val === 'object' && (val.value || val._id));
  }

  _getId(val) {
    if (val instanceof MockObjectId || val.value) {
      return val.value || val.toString?.() || val;
    }
    return val;
  }

  async findOne(query) {
    return this.data.find((item) => {
      return Object.entries(query).every(([key, value]) => {
        const itemValue = key === '_id' ? item[key]?.value || item[key] : item[key];
        const queryValue = this._getId(value);
        return itemValue === queryValue || item[key] === queryValue;
      });
    }) || null;
  }

  async find(query = {}) {
    const results = this.data.filter((item) => {
      return Object.entries(query).every(([key, value]) => {
        const itemValue = key === '_id' ? item[key]?.value || item[key] : item[key];
        const queryValue = this._getId(value);
        return itemValue === queryValue || item[key] === queryValue;
      });
    });
    return {
      sort: (sortObj) => ({
        limit: (limit) => ({
          toArray: () => results.sort((a, b) => {
            for (const [key, direction] of Object.entries(sortObj)) {
              if (a[key] < b[key]) return direction === -1 ? -1 : 1;
              if (a[key] > b[key]) return direction === -1 ? 1 : -1;
            }
            return 0;
          }).slice(0, limit),
        }),
        toArray: () => results,
      }),
      limit: (limit) => ({
        toArray: () => results.slice(0, limit),
      }),
      project: () => ({
        toArray: () => results,
      }),
      toArray: () => results,
    };
  }

  async insertOne(doc) {
    const id = new MockObjectId();
    this.data.push({ _id: id.value, ...doc });
    return { insertedId: id };
  }

  async updateOne(query, update) {
    const item = this.data.find((d) =>
      Object.entries(query).every(([key, value]) => {
        const itemValue = key === '_id' ? d[key]?.value || d[key] : d[key];
        const queryValue = this._getId(value);
        return itemValue === queryValue || d[key] === queryValue;
      })
    );
    if (item) {
      const { $set } = update;
      Object.assign(item, $set);
      return { modifiedCount: 1 };
    }
    return { modifiedCount: 0 };
  }

  async aggregate(pipeline) {
    return {
      toArray: () => this.data,
    };
  }

  async createIndex(keys, options) {
    return `${Object.keys(keys)[0]}_${Object.values(keys)[0]}`;
  }

  async listCollections() {
    return {
      toArray: () => [{ name: 'users' }, { name: 'activities' }],
    };
  }
}

export const useMockDB = () => {
  return {
    db: () => ({
      collection: (name) => new MockCollection(mockDB[name] || [], name),
      listCollections: () => ({
        toArray: () => [{ name: 'users' }, { name: 'activities' }],
      }),
      createCollection: (name) => {
        if (!mockDB[name]) {
          mockDB[name] = [];
        }
      },
    }),
  };
};
