const assert = require('chai').assert;
const app = require('../src/app');

// create producer
const kafkaNode = require('kafka-node');
const Producer = kafkaNode.Producer;
const client = new kafkaNode.Client();
const producer = new Producer(client, [{topic: 'test'}]);


// describe('Component Tests', function () {
//
//   before(function (done) {
//     producer.on('ready', () => {
//       producer.createTopics(['test'], true, done);
//     })
//   });
//
//   if ('should get a message and send to smtp', function (done) {
//       producer.send(message, noop);
//
//     });
// });