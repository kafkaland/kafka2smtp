const nodemailer = require('nodemailer');

const config = {
  host: 'localhost',
  port: 1025,
  ignoreTLS: true,
};

const from = 'admin@localhost';

module.exports.createClient = function (options = {}) {
  return new Smtp(options.transporter || nodemailer.createTransport(config));
};

function Smtp(transporter) {
  this.transporter = transporter;
};

Smtp.prototype.sendEmail = function (to, subject, text, cb) {
  this.transporter.sendMail({from, to, subject, text}, cb);
};



