const kafkaNode = require('kafka-node');
const Consumer = kafkaNode.Consumer;
const client = new kafkaNode.Client();

module.exports.createConsumer = function () {
  return new Consumer(client, [{topic: 'test'}], {autoCommit: true});
};
