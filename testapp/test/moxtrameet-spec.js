process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../config/security-config')
const dbConfig = require('../config/database-config')
const HELPER = require('./common-functions')
const knex = require('knex')(dbConfig)
const responseMessages=require('../config/testmessage')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
let should = chai.should()
let expect = chai.expect
// let OrgAddress = require('../../../models/admin/orgConfig/orgAddress')
// let BankInfo = require('../../../models/admin/orgConfig/bankInfo')
// let GovtAccInfo = require('../../../models/admin/orgConfig/govtAccounts')
// let GovtDocInfo = require('../../../models/admin/orgConfig/govtDocs')
const async = require('async')
const path = require('path')

chai.use(chaiHttp)

let ServerAddr = 'http://localhost:4000'
const mockData = require('./data')
const SEND_MEET = '/meet/sendMeetInvite'
const CANCEL_MEET = '/meet/cancelMeetSchedule'


describe('Header Information', function () {
  before(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('predefined_themes').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {})
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert([mockData.user1, mockData.user2]).into('users').then(function (id) {})
    knex.insert([mockData.employee1, mockData.employee2]).into('employees').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
      console.log('Permissions data inserted')
    })
    knex.insert(mockData.predefinedThemes).into('predefined_themes').then(function (id) {
      console.log('Predefined themes data inserted')
    })
    knex.insert(mockData.organization1).into('organizations').then(function (id) {
      console.log('Organization data inserted')
      knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    }).finally(function () {
      console.log('ThemeSettings data inserted')
      done()
    })
  })

  after(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('predefined_themes').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {})
    done()
  })
  it(responseMessages.moxtra.checkMeet, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      console.log(token)
      chai.request(ServerAddr)
        .post(SEND_MEET)
        .set('Authorization', token)
        .send({
          "sendTo": [],
          "sentFrom": "shivashankar@celestialsys.com",
          "subject": "Meet Invite",
          "inviteeName": "shiva",
          "meetTitle": "Test",
          "noOfMembers":1,
          "isScheduleMeet": false,
          "scheduleMeet": { "date": "24 Jun Wed ,2018 4:00 PM IST,", "meetID": "4234234" }
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4004)
            res.body.message.should.equal(responseMessages.moxtra.noMailSend)
            done()
          }
        })
    })
  }).timeout(50000)
  it(responseMessages.moxtra.sendMoxtra, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      console.log(token)
      chai.request(ServerAddr)
        .post(SEND_MEET)
        .set('Authorization', token)
        .send({
          "sendTo": ["shivashankar@celestialsys.com"],
          "sentFrom": "shivashankar@celestialsys.com",
          "subject": "Meet Invite",
          "inviteeName": "shiva",
          "meetTitle": "Test",
          "noOfMembers":1,
          "isScheduleMeet": false,
          "scheduleMeet": { "date": "24 Jun Wed ,2018 4:00 PM IST,", "meetID": "4234234" }
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.moxtra.invitationSend)
            done()
          }
        })
    })
  }).timeout(50000)
  it(responseMessages.moxtra.cancelMeetInvt, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(CANCEL_MEET)
        .set('Authorization', token)
        .send({
          "sendTo": ["shivashankar@celestialsys.com"],
          "sentFrom": "shivashankar@celestialsys.com",
          "subject": "Cancel meet",
          "inviteeName": "shiva",
          "meetTitle": "cancel Test",
          "date": "24 Jun Wed ,2018 4:00 PM IST"
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.moxtra.cancelMeet)
            done()
          }
        })
    })
  }).timeout(50000)
  it(responseMessages.moxtra.checkMail, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(CANCEL_MEET)
        .set('Authorization', token)
        .send({
          "sendTo": [],
          "sentFrom": "shivashankar@celestialsys.com",
          "subject": "Cancel meet",
          "inviteeName": "shiva",
          "meetTitle": "cancel Test",
          "date": "24 Jun Wed ,2018 4:00 PM IST"
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4007)
            res.body.message.should.equal(responseMessages.moxtra.noMail)
            done()
          }
        })
    })
  }).timeout(50000)
})