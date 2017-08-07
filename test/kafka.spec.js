const assert = require('chai').assert;
const kafka = require('./../src/kafka');

// create producer
const kafkaNode = require('kafka-node');
const Producer = kafkaNode.Producer;
const client = new kafkaNode.Client();
const producer = new Producer(client, [{topic: 'test'}]);

const noop = (err, data) => {
};

describe('Kafka integration test', function () {

  before(function (done) {
    producer.on('ready', () => {
      producer.createTopics(['test'], true, done);
    })
  });

  it('should get a message', function (done) {
    // arrange & assert
    var message = [{topic: 'test', messages: ['hi']}];
    kafka.createConsumer().on('message', (message) => {
      assert.equal(message.value, 'hi');
      done();
    });

    // act
    producer.send(message, noop);
  })

});