const assert = require('chai').assert;
const kafkaNode = require('kafka-node');
const MailDev = require('maildev');

const TOPIC = 'email';
const producer = new kafkaNode.Producer(new kafkaNode.Client());
const maildev = new MailDev();

describe('Component Tests', function () {

  before(function (done) {
    maildev.listen(done);
  });

  before(function (done) {
    producer.on('ready', () => {
      producer.createTopics([TOPIC], () => {
        require('./index'); // start the flow when a topic is created
        done();
      });
    })
  });

  after(function (done) {
    producer.close(done);
  });

  it('should work like a boss', function (done) {

    // arrange & assert
    maildev.on('new', function (email) {
      assert.equal(email.subject, 'Hello Test');
      assert.equal(email.text, 'How are you?\n');
      done();
    });

    // act
    const m = {to: 'test@local.com', text: 'How are you?', subject: 'Hello Test'};
    const message = [{topic: TOPIC, messages: [JSON.stringify(m)]}];
    producer.send(message, ()=> {});

  });
});

