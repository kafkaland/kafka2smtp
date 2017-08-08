const consumer = require('./kafka').createConsumer();
var smtp = require('./smtp');

function up() {
  consumer.on('message', function (message) {
    const payload = message.payload;
    smtp.createClient().sendEmail(payload.to, payload.subject, payload.text, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Message was sent');
      }
    })
  });
};

up();