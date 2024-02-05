export const DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'people',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'schedule', keypath: 'schedule', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'category', keypath: 'category', options: { unique: false } },
      ],
    },
  ],
}
