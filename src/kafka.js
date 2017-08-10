const kafkaNode = require('kafka-node');
const Consumer = kafkaNode.Consumer;
const client = new kafkaNode.Client();

const DEFAULT = 'test';

module.exports.createConsumer = function (options={}) {
  const topic = options.topic || DEFAULT;
  return new Consumer(client, [{topic: topic}], {autoCommit: true});
};
