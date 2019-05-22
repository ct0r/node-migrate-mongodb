const crypto = require('crypto');

const arg = require('arg');
const test = require('ava');
const { MongoClient } = require('mongodb');

const mongoStore = require('.');

const getUrl = () =>
  `mongodb://localhost/test-${crypto.randomBytes(5).toString('hex')}`;

test('set saves files to db', async t => {
  const url = getUrl();
  const store = mongoStore({ url });

  await store.set(['migration-1', 'migration-2']);

  const client = await new MongoClient(url).connect();
  const data = await client
    .db()
    .collection('_migrations')
    .find()
    .toArray();

  t.deepEqual(data, [{ _id: 'migration-1' }, { _id: 'migration-2' }]);
});

test('get returns files from db', async t => {
  const url = getUrl();
  const store = mongoStore({ url });

  const client = await new MongoClient(url).connect();
  await client
    .db()
    .collection('_migrations')
    .insertMany([{ _id: 'migration-1' }, { _id: 'migration-2' }]);

  const state = await store.get();

  t.deepEqual(state, ['migration-1', 'migration-2']);
});

test('getOptions returns options', t => {
  const { spec, getOptions } = mongoStore.cli;

  const args = arg(spec, {
    argv: ['--store-url', 'test-url', '--store-collection', 'test-collection']
  });

  const options = getOptions(args);

  t.deepEqual(options, {
    url: 'test-url',
    collection: 'test-collection'
  });
});
