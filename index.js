const kafkaNode = require('kafka-node');
const nodemailer = require('nodemailer');

const TOPIC = 'email';
const HOST = 'localhost';
const PORT = 1025;
const FROM = 'admin@localhost';

/**
 * IN: kafka consumer
 */

const consumer = new kafkaNode.Consumer(
  new kafkaNode.Client(),
  [{topic: TOPIC}],
  {autoCommit: true}
);

/**
 * OUT: SMTP client
 */

const smtp = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  ignoreTLS: true,
});

/**
 * I'm in Position
 */

consumer.on('message', function (message) {

  const payload = JSON.parse(message.value);
  const email = {
    from: payload.from || FROM,
    to: payload.to,
    subject: payload.subject,
    text: payload.text
  };

  smtp.sendMail(email, (err) => {
    if (err) {
      console.log(err);
    }
  })
});
