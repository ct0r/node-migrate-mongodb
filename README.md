# node-migrate-mongodb

[![Version](https://img.shields.io/npm/v/node-migrate-mongodb.svg?style=flat-square)](https://www.npmjs.com/package/node-migrate-mongodb)
[![Build](https://img.shields.io/circleci/project/github/ct0r/node-migrate-mongodb/master.svg?style=flat-square)](https://circleci.com/gh/ct0r/node-migrate-mongodb)
[![Coverage](https://img.shields.io/codeclimate/coverage/ct0r/node-migrate-mongodb.svg?style=flat-square)](https://codeclimate.com/github/ct0r/node-migrate-mongodb)
[![License](https://img.shields.io/github/license/ct0r/node-migrate-mongodb.svg?style=flat-square)](https://github.com/ct0r/node-migrate-mongodb/blob/master/LICENSE)

Mongo store for [node-migrate](https://github.com/ct0r/node-migrate).

## Installation

```
npm install node-migrate-mongodb
```

## Options

| Command line         | Programmatic | Description                                     |
| -------------------- | ------------ | ----------------------------------------------- |
| `--store-url`        | url          | Mongo url. Default `mongodb://localhost:27017`. |
| `--store-collection` | collection   | Collection name. Default `_migrations`.         |

## Usage

### Command line

```
node-migrate --store node-migrate-mongodb --store-url mongodb://my-server/my-db --store-collection my_migrations
```

### Programatic use

```js
const migrate = require('node-migrate');
const mongoStore = require('node-migrate-mongodb');

const store = mongoStore({
  url: 'mongodb://my-server/my-db',
  collection: 'my_migrations'
});

migrate({ store });
```
