export const DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'schedule',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'schedule', keypath: 'schedule', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'category', keypath: 'category', options: { unique: false } },
        { name: 'order', keypath: 'order', options: { unique: false } },
        { name: 'completed', keypath: 'completed', options: { unique: false } }
      ],
    },
  ],
}
