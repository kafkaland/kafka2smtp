const kafkaConsumer = require('./kafka').createConsumer();
var smtpClient = require('./smtp').createClient();

kafkaConsumer.on('message', function (message) {
  console.log(message.value);

  const payload = JSON.parse(message.value);

  smtpClient.sendEmail(payload.to, payload.subject, payload.text, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })
});
