const consumer = require('./kafka').createConsumer();
var smtp = require('./smtp');

const run = module.exports = function (cb) {
  consumer.on('message', function (message) {
    console.log(`New message: ${message}`);
    console.log(message);
    console.log(message.value);
    const payload = message.value;
    smtp.createClient().sendEmail(payload.to, payload.subject, payload.text, (err, info) => {
      if (err) {
        console.log(err);
        cb && cb(err);
      } else {
        console.log('Message was sent');
        cb(null, info);
      }
    })
  });
}

!module.parent ? run() : null;
