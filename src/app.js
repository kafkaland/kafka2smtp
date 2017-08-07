const consumer = require('./kafka').createConsumer();
const mapper = require('./mapper');

consumer.on('message', function (message) {
  const output = mapper(message.value);
});
