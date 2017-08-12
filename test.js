const assert = require('chai').assert;
const kafkaNode = require('kafka-node');
const MailDev = require('maildev');

// create producer
const Producer = kafkaNode.Producer;
const client = new kafkaNode.Client();
const producer = new Producer(client);

// create mail server
const maildev = new MailDev();

describe('Component Tests', function () {

  before(function (done) {
    maildev.listen(done);
  });

  before(function (done) {
    producer.on('ready', () => {
      producer.createTopics(['test'], () => {
        require('./index'); // start flow when topic is created
        done();
      });
    })
  });

  after(function (done) {
    producer.close(done);
  });

  it('should get a message and send to smtp', function (done) {

    // arrange & assert
    maildev.on('new', function (email) {
      assert.equal(email.subject, 'Hello Test');
      assert.equal(email.text, 'How are you?\n');
      done();
    });

    // act
    var m = {to: 'test@local.com', text: 'How are you?', subject: 'Hello Test'};
    var message = [{topic: 'test', messages: [JSON.stringify(m)]}];
    producer.send(message, noop);
  });
});

const noop = (err, data) => {
  console.log(err);
};
