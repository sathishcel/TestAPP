/* Below is Test DB configuration
export DATABASE_URL='pg://postgres:postgres@localhost:5432/ewa_test'
./node_modules/db-migrate/bin/db-migrate up
process.exit(); //add it in the last test case of test folder */

process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../../config/security-config')
const dbConfig = require('../../config/database-config')
const responseMessages=require('../../config/testmessage')
const knex = require('knex')(dbConfig)
const Usertable = require('../../models/user')
const Jwt = require('../common-functions')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../app')
let should = chai.should()
let expect = chai.expect
let serverAddress = 'http://localhost:4000'
const USERNAME = 'ewaadmin@celsysemail.celsyswtc.in'
const PASSWORD = 'Cel@123'
const HELPER = require('../common-functions')
const mockData = require('../data')

chai.use(chaiHttp)
let today = new Date(new Date().setHours(0, 0, 0, 0))
let todayString = today.toLocaleString()
let user1 = { email: 'ewaemployee1@celsysemail.celsyswtc.in', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 2, firstname: 'Celestial', lastname: 'User', status: 2, permissions: [1, 2, 3, 4, 21] }
let user2 = { email: 'ewaadmin@celsysemail.celsyswtc.in', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 1, firstname: 'Celestial', lastname: 'Admin', status: 2, permissions: [1, 2, 3, 4, 21] }
let user3 = { email: 'ewaemployee2@celsysemail.celsyswtc.in', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 2, firstname: 'Celestial', lastname: 'User 2', permissions: [1, 2, 3, 4, 21] }
let user4 = {
  email: 'ewaemployee4@celsysemail.celsyswtc.in',
  password: bcrypt.hashSync('Cel@123',
    securityConfig.saltRounds),
  role_id: 2,
  firstname: 'Celestial',
  lastname: 'User 3',
  status: 2,
  resend_otc_count: 3,
  resend_otc_at: todayString,
  forgot_otc_count: 3,
  forgot_otc_at: todayString,
  permissions: [1, 2, 3, 4, 21]
}
let user5 = { email: 'ewaemployee5@celsysemail.celsyswtc.in', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 2, firstname: 'Celestial', lastname: 'User 5', status: 1, otc: 'A1b2c3', permissions: [1, 2, 3, 4, 21] }
let user6 = {
  email: 'ewaemployee6@celsysemail.celsyswtc.in',
  password: bcrypt.hashSync('Cel@123',
    securityConfig.saltRounds),
  role_id: 2,
  firstname: 'Celestial',
  lastname: 'User 3',
  status: 2,
  resend_otc_count: 1,
  resend_otc_at: todayString,
  forgot_otc_count: 1,
  forgot_otc_at: todayString,
  permissions: [1, 2, 3, 4, 21]
}


let organization1 = { name: 'Celestial' }
let employee1 = { emp_id: 1, org_id: 1, user_id: 1, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User' }
let employee2 = { emp_id: 2, org_id: 1, user_id: 2, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User' }
let employee3 = { emp_id: 3, org_id: 1, user_id: 3, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User 2' }
let employee4 = { emp_id: 4, org_id: 1, user_id: 4, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User 3' }
let employee5 = { emp_id: 5, org_id: 1, user_id: 5, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User 5' }
let employee6 = { emp_id: 6, org_id: 1, user_id: 6, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User 6' }

let themeData = [{
  org_id: 1,
  settingPageData: [{
    type: 'radioButton',
    fieldName: '',
    key: 'isImage',
    value: true
  }, {
    type: 'radioButton',
    fieldName: '',
    key: 'isLight',
    value: false
  }, {
    type: 'selectBox',
    fieldName: 'Font Family',
    key: 'fontFamily',
    value: 'Arial'
  }, {
    type: 'image',
    fieldName: 'Organization Logo',
    key: 'organizationLogo',
    value: 'samplImage.jpg'
  }, {
    type: 'image',
    fieldName: 'Background Image',
    key: 'backgroundImage',
    value: 'samplImage.jpg'
  }, {
    type: 'image',
    fieldName: 'Header Image',
    key: 'headerImage',
    value: 'samplImage.jpg'
  }, {
    type: 'image',
    fieldName: 'User Panel Image',
    key: 'userPanelImage',
    value: 'samplImage.jpg'
  }, {
    type: 'colorPicker',
    fieldName: 'Background Color',
    key: 'backgroundColor',
    value: '#fffff'
  }, {
    type: 'colorPicker',
    fieldName: 'Header Color',
    key: 'headerColor',
    value: '#00000'
  }, {
    type: 'colorPicker',
    fieldName: 'User Panel Color',
    key: 'userPanelColor',
    value: '#fffddd'
  }]
}]
let forgotApi = '/forgot'
let verifyemailApi = '/verifyEmail'
let verifyuserApi = '/verifyUser'
let resetPasswordApi = '/resetPassword'
let resendCodeApi = '/resendCode'
let registerApi = '/register'
let moxtraLogin = '/moxtraAccessToken'

describe(responseMessages.password.name, function () {
  before(function (done) {
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert([user1, user2, user3, user4, user5, user6]).into('users').then(function (id) {})
    knex.insert(organization1).into('organizations').then(function (id) {})
    knex.insert(mockData.permissions).into('permissions').then(function (id) {})
    knex.insert(themeData).into('theme_settings').then(function (id) {})
    knex.insert([employee1, employee2, employee3, employee4, employee5, employee6]).into('employees').then(function (id) {
      done()
    })
  })

  after(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {
      done()
    })
  })

  describe(responseMessages.password.emailVerify, function () {
    it(responseMessages.password.invalidEmail, function (done) {
      chai.request(serverAddress)
        .post(verifyemailApi).send({
          email: 'ewa@google.com'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2105)
          res.body.message.should.equal(responseMessages.password.EmailAddress)
          done()
        })
    })
    it(responseMessages.password.validOrganization, function (done) {
      chai.request(serverAddress)
        .post(verifyemailApi).send({
          email: 'ewa@celestial.com'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2106)
          res.body.message.should.equal(responseMessages.password.emailIsNotRegistered)
          done()
        })
    })
    it(responseMessages.password.validEmail, function (done) {
      chai.request(serverAddress)
        .post(verifyemailApi).send({
          email: user3.email
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.password.emailVerified)
          done()
        })
    })
  })

  describe(responseMessages.password.verifyApi, function () {
    it(responseMessages.password.invalidOtc, function (done) {
      chai.request(serverAddress)
        .post(verifyuserApi).send({
          email: user1.email,
          otc: '123abc'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2108)
          res.body.message.should.equal(responseMessages.password.invalidOtc)
          done()
        })
    })
  })

  describe(responseMessages.password.resetApi, function () {
    it(responseMessages.password.resetPassword, function (done) {
      chai.request(serverAddress)
        .post(resetPasswordApi).send({
          email: user1.email,
          password: 'a1b2c3'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.password.passwordChangeSuccess)
          done()
        })
    })
    it(responseMessages.password.invalidEmailResetPassword, function (done) {
      chai.request(serverAddress)
        .post(resetPasswordApi).send({
          email: "nouser@emaill.com",
          password: 'a1b2c3'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2105)
          res.body.message.should.equal(responseMessages.password.EmailAddress)
          done()
        })
    })
  })

  describe(responseMessages.password.resendCode, function () {
    it(responseMessages.password.resendOtc, function (done) {
      chai.request(serverAddress)
        .post(resendCodeApi).send({
          email: user1.email
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.password.otcResendToEmail)
          done()
        })
    })

    it(responseMessages.password.resendOtcLessTime, function (done) {
      chai.request(serverAddress)
        .post(resendCodeApi).send({
          email: user6.email
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.password.otcResendToEmail)
          done()
        })
    })

    it(responseMessages.password.resendOtcMax, function (done) {
      chai.request(serverAddress)
        .post(resendCodeApi).send({
          email: user4.email
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2020)
          res.body.message.should.equal(responseMessages.password.pleaseTryAfterHour)
          done()
        })
    })

    it(responseMessages.password.resendCode, function (done) {
      chai.request(serverAddress)
        .post(resendCodeApi).send({
          email: 'user1@celsys.com'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2105)
          res.body.message.should.equal(responseMessages.password.EmailAddress)
          done()
        })
    })
  })

  describe(responseMessages.password.registerApi, function () {
    it(responseMessages.password.setPassword, function (done) {
      chai.request(serverAddress)
        .post(registerApi).send({
          email: user3.email,
          password: 'ewa642'
        })
        .end((err, res) => {
          console.log(res.body.responseCode)
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.password.registerSucccess)
          done()
        })
    })
    it(responseMessages.password.enterInvalidEmail, function (done) {
      chai.request(serverAddress)
        .post(registerApi).send({
          email: "nouser@emaill.com",
          password: 'a1b2c3'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2105)
          res.body.message.should.equal(responseMessages.password.EmailAddress)
          done()
        })
    })
    it(responseMessages.password.restrictMultiple, function (done) {
      chai.request(serverAddress)
        .post(registerApi).send({
          email: user1.email,
          password: 'ewa642'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2107)
          res.body.message.should.equal(responseMessages.password.emailAlreadyExit)
          done()
        })
    })

    it(responseMessages.password.emailVerify, function (done) {
      chai.request(serverAddress)
        .post(verifyemailApi).send({
          email: user1.email
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2107)
          res.body.message.should.equal(responseMessages.password.emailAlreadyExit)
          done()
        })
    })

    it(responseMessages.password.validOtc, function (done) {
      Usertable.where('email', user1.email).fetch().then(function (user) {
        chai.request(serverAddress)
          .post(verifyuserApi).send({
            email: user1.email,
            otc: user.attributes.otc
          })
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.password.matchOtc)
            done()
          })
      })
    })

    it(responseMessages.password.validOtcMultipleTime, function (done) {
      Usertable.where('email', user5.email).fetch().then(function (user) {
        chai.request(serverAddress)
          .post(verifyuserApi).send({
            email: user5.email,
            otc: user5.otc
          })
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.password.matchOtc)
            done()
          })
      })
    })
    it(responseMessages.password.sendChartInvit, function (done) {
      HELPER.get_token(USERNAME, PASSWORD).then((token) => {
        chai.request(server)
          .post('/sendChatInvite')
          .send({
            "sendTo":["shivashankar@celestialsys.com"],
            "sentFrom":"shivashankar@celestialsys.com",
            "subject":"Moxtra Chat Invitation",
            "inviteeName":"shiva",
            "isGroupChat":false,
            "groupChatBinder":{"binderName": "Binder1", "noOfMembers": 2, "noOfPage": 1, "noOfToDo": 1, "inderImage": "http://urlofImageBinder"},
            "joinURL":'https://www.moxtra.com',
            "inviteeImage":"http://pixsector.com/cache/50fcb576/av0cc3f7b41cb8510e35c.png"
          })
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.password.chartInviteSend)
            done()
          })
      }).catch(function (err) {
        console.log(err)
        done()
      })
    })

    it(responseMessages.password.chartInviteSendGroup, function (done) {
      HELPER.get_token(USERNAME, PASSWORD).then((token) => {
        chai.request(server)
          .post('/sendChatInvite')
          .send({
            "sendTo":["shivashankar@celestialsys.com", "karthikl@celestialsys.com"],
            "sentFrom":"shivashankar@celestialsys.com",
            "subject":"Moxtra Chat Invitation",
            "inviteeName":"shiva",
            "isGroupChat":true,
            "groupChatBinder":{"binderName": "Binder1", "noOfMembers": 2, "noOfPage": 1, "noOfToDo": 1, "inderImage": "http://urlofImageBinder"},
            "joinURL":"https://www.moxtra.com",
            "inviteeImage":"http://pixsector.com/cache/50fcb576/av0cc3f7b41cb8510e35c.png"
          })
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            expect(res).to.be.status(200)
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.password.chartInviteSend)
            done()
          })
      }).catch(function (err) {
        console.log(err)
        done()
      })
    })

    it(responseMessages.password.sendProperResponces, function (done) {
      HELPER.get_token(USERNAME, PASSWORD).then((token) => {
        chai.request(server)
          .post('/sendChatInvite')
          .send({
            "sendTo":[],
            "sentFrom":"shivashankar@celestialsys.com",
            "subject":"Moxtra Chat Invitation",
            "inviteeName":"shiva",
            "isGroupChat":true,
            "groupChatBinder":{"binderName": "Binder1", "noOfMembers": 2, "noOfPage": 1, "noOfToDo": 1, "inderImage": "http://urlofImageBinder"},
            "joinURL":"https://www.moxtra.com",
            "inviteeImage":"http://pixsector.com/cache/50fcb576/av0cc3f7b41cb8510e35c.png"
          })
          .set('Authorization', token)
          .end((err, res) => {
            expect(res).to.be.status(200)
            res.body.responseCode.should.equal(4004)
            res.body.message.should.equal(responseMessages.password.noMail)
            done()
          })
      }).catch(function (err) {
        console.log(err)
        done()
      })
    })

    it(responseMessages.password.verifyOtc, function (done) {
      Usertable.where('email', user1.email).fetch().then(function (user) {
        chai.request(serverAddress)
          .post(verifyuserApi).send({
            email: 'unknown@abc.com',
            otc: user.attributes.otc
          })
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(2105)
            res.body.message.should.equal(responseMessages.password.EmailAddress)
            done()
          })
      })
    })
  })

  describe(responseMessages.password.moxtraApi, function () {
    it(responseMessages.password.moxtraAuthentication, function (done) {
      this.timeout(5000)
      Jwt.get_token(user4.email, 'Cel@123').then((token) => {
        chai.request(serverAddress)
          .post(moxtraLogin)
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            console.log(res.body)
            res.body.message.should.equal(responseMessages.password.authenticationSuccessful)
            res.body.responseCode.should.equal(2000)
            res.body.data.should.have.property('accessToken')
            res.body.data.should.have.property('clientId')
            res.body.data.should.have.property('firstName')
            res.body.data.should.have.property('lastName')
            res.body.data.should.have.property('orgId')
            done()
          })
      })
    })
  })

  describe(responseMessages.password.forgetApi, function () {
    it(responseMessages.password.EmailAddress, function (done) {
      chai.request(serverAddress)
        .post(forgotApi).send({
          email: 'ewa@celestialsys.com'
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2106)
          res.body.message.should.equal(responseMessages.password.emailNotRegistered)
          done()
        })
    })
    it(responseMessages.password.registeredEmail, function (done) {
      chai.request(serverAddress)
        .post(forgotApi).send({
          email: user1.email
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.password.emailIsVerified)
          done()
        })
    })
    it(responseMessages.password.forgetApiLessTime, function (done) {
      chai.request(serverAddress)
        .post(forgotApi).send({
          email: user6.email
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.password.otcIsSendToEmail)
          done()
        })
    })
    it(responseMessages.password.maxLimitReach, function (done) {
      chai.request(serverAddress)
        .post(forgotApi).send({
          email: user4.email
        })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2020)
          res.body.message.should.equal(responseMessages.password.pleaseTryAfterHour)
          done()
        })
    })
  })

  describe(responseMessages.password.checkInut, function () {
    it(responseMessages.password.apiValidation, function (done) {
      chai.request(serverAddress)
        .post(forgotApi).send({})
        .end((err, res) => {
          console.log(err)
          expect(res.body.data.message).to.eql(responseMessages.password.apiInputMissing)
          done()
        })
    })
    it(responseMessages.password.verifyEmailValidation, function (done) {
      chai.request(serverAddress)
        .post(verifyemailApi).send({})
        .end((err, res) => {
          console.log(err)
          expect(res.body.data.message).to.eql(responseMessages.password.apiInputMissing)
          done()
        })
    })
    it(responseMessages.password.apiValidation, function (done) {
      chai.request(serverAddress)
        .post(verifyuserApi).send({})
        .end((err, res) => {
          console.log(err)
          expect(res.body.data.message).to.eql(responseMessages.password.apiInputMissing)
          done()
        })
    })
    it(responseMessages.password.resetPassword, function (done) {
      chai.request(serverAddress)
        .post(resetPasswordApi).send({})
        .end((err, res) => {
          console.log(err)
          expect(res.body.data.message).to.eql(responseMessages.password.apiInputMissing)
          done()
        })
    })
    it(responseMessages.password.resendCode, function (done) {
      chai.request(serverAddress)
        .post(resendCodeApi).send({})
        .end((err, res) => {
          console.log(err)
          expect(res.body.data.message).to.eql(responseMessages.password.apiInputMissing)
          done()
        })
    })
    it(responseMessages.password.registerApi, function (done) {
      chai.request(serverAddress)
        .post(registerApi).send({})
        .end((err, res) => {
          console.log(err)
          expect(res.body.data.message).to.eql(responseMessages.password.apiInputMissing)
          done()
        })
    })
  })
})
