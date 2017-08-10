const assert = require('chai').assert;
const smtp = require('../src/smtp');
const nodemailerMock = require('nodemailer-mock');

const transporter = nodemailerMock.createTransport({
  host: '127.0.0.1',
  port: -100,
});

describe('SMTP XXX Tests', function () {

  it('should send an email', function (done) {
    smtp
      .createClient({transporter: transporter})
      .sendEmail('a.gritsik@gmail.com', 'hey', 'are you there?', function (err, info) {
        assert.equal(nodemailerMock.mock.sentMail().length, 1);
        done();
      })
  })

});