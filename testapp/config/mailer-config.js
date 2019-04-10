'use strict'

const nodemailer = require('nodemailer')
const log4js = require('log4js')
const logger = log4js.getLogger('info_log')
const constantConfig = require('../config/constant-config')

module.exports = {
  send_mail: function (toAddress, subject, text, req, html) {
    var transporter = nodemailer.createTransport({
      host: 'celsysemail.celsyswtc.in',
      port: 465,
      secure: true,
      auth: {
        user: 'ewa.support@celsysemail.celsyswtc.in',
        pass: 'Cel@123'
      }
    })
    var mailOptions = ''
    if (html === constantConfig.mailType) {
      mailOptions = {
        from: 'ewa.support@celsysemail.celsyswtc.in',
        to: toAddress,
        subject: subject,
        text: '',
        req: req,
        html:text
      }
    } else {
      mailOptions = {
        from: 'ewa.support@celsysemail.celsyswtc.in',
        to: toAddress,
        subject: subject,
        text: text,
        req: req,
        html
      }
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.info('Sending mail failed since ' + error)
      } else {
        logger.info('Mail Sent to ' + toAddress)
      }
    })
  }
}
