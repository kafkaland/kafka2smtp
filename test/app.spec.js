const assert = require('chai').assert;
const app = require('../src/app');

// create producer
const kafkaNode = require('kafka-node');
const Producer = kafkaNode.Producer;
const client = new kafkaNode.Client();
const producer = new Producer(client, [{topic: 'test'}]);


describe('Component Tests', function () {

  before(function (done) {
    producer.on('ready', () => {
      producer.createTopics(['test'], true, done);
    })
  });

  it('should get a message and send to smtp', function (done) {
    app(function (err, info) {
      console.log("=======");
      console.log(err);
      console.log(info);
      done();
    });

    var m = {to:'asd', text:'asd', subject:'123'};
    var message = [{topic: 'test', messages: [JSON.stringify(m)]}];
    producer.send(message, noop);
  });
});
const noop = (err, data) => {
};
