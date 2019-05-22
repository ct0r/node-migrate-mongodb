const { MongoClient } = require('mongodb');

module.exports = ({
  url = 'mongodb://localhost:27017',
  collection = '_migrations'
}) => {
  const get = async () => {
    const client = await MongoClient.connect(url);
    const migrations = client.db().collection(collection);

    try {
      const files = await migrations.find().toArray();

      return files.map(file => file._id);
    } finally {
      await client.close();
    }
  };

  const set = async state => {
    const client = await MongoClient.connect(url);
    const migrations = client.db().collection(collection);

    try {
      const files = state.map(_id => ({ _id }));

      await migrations.deleteMany();
      await migrations.insertMany(files);
    } finally {
      await client.close();
    }
  };

  return { get, set };
};

module.exports.cli = {
  spec: {
    '--store-url': String,
    '--store-collection': String
  },
  getOptions: args => ({
    url: args['--store-url'],
    collection: args['--store-collection']
  })
};
