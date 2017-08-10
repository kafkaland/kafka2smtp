const assert = require('chai').assert;
const kafka = require('./../src/kafka');

const TOPIC = 'integration-test';

// create producer
const kafkaNode = require('kafka-node');
const Producer = kafkaNode.Producer;
const client = new kafkaNode.Client();
const producer = new Producer(client, [{topic: TOPIC}]);

const noop = (err, data) => {
};

describe('Kafka integration test', function () {

  before(function (done) {
    producer.on('ready', () => {
      producer.createTopics([TOPIC], true, done);
    })
  });

  after(function (done) {
    producer.close(done);
  });

  it('should get a message', function (done) {
    // arrange & assert
    kafka.createConsumer({topic: TOPIC}).once('message', (message) => {
      assert.equal(message.value, 'hi');
      done();
    });

    // act
    var message = [{topic: TOPIC, messages: ['hi']}];
    producer.send(message, noop);
  })

});