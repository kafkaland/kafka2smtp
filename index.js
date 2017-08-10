const kafkaNode = require('kafka-node');
const nodemailer = require('nodemailer');

/**
 * init kafka consumer
 */

const consumer = new kafkaNode.Consumer(
  new kafkaNode.Client(),
  [{topic: 'test'}],
  {autoCommit: true}
);

/**
 * init smtp client
 */

const FROM = 'admin@localhost';
const smtp = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true,
});

/**
 * Flow
 */

consumer.on('message', function (message) {
  console.log(message.value);

  const payload = JSON.parse(message.value);
  const email = {
    from: FROM,
    to: payload.to,
    subject: payload.subject,
    text: payload.text
  };

  smtp.sendMail(email, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })
});
